module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const [rawMapCellList, rawUserMapDataList, playersList] = await Promise.all([
      models.mapCell.findAll({
        order: [['cellName']],
        attributes: ['cellName', 'dataJson']
      }),
      models.userMapData.findAll({
        attributes: ['userId', 'score', 'selectedCellId']
      }),
      models.user.findAll({
        attributes: ['id'],
        where: {isPlayer: true}
      })
    ])

    const { playersData, cellsData } = getData(rawMapCellList, rawUserMapDataList, playersList)
    await models.mapLog.create({
      playersJson: JSON.stringify(playersData),
      cellsJson: JSON.stringify(cellsData)
    })

    const [mapLog] = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = mapLog.turn

    createBattleTables({models, mapData: cellsData, turnNumber})
    updateCellsData({models, cellsData, cellsFromDB: rawMapCellList})
    updatePlayersData({models, playersData, playersFromDB: rawUserMapDataList})

    res.send({
      status: 'success',
      message: `Начат ход №${turnNumber + 1}`
    })
  })
}

function createBattleTables({models, mapData, turnNumber}) {
  mapData.forEach((cell) => {
    if (cell.players.length < 2) return

    const dataJson = JSON.stringify({
      screenshots: {
        finalist1: "",
        finalist2: "",
        winner: ""
      },
      pair1: [cell.players[0], cell.players[1]],
      pair2: [cell.players[2], cell.players[3]],
      finalPair: [],
      winner: ""
    })

    models.battleTable.create({
      turnNumber,
      cellId: cell.cellName,
      dataJson
    })
  })
}

function updateCellsData({models, cellsData, cellsFromDB}) {
  cellsData.filter((cell) => cell.players.length).forEach((cell) => {
    const currentCell = cellsFromDB.find(oldCell => oldCell.cellName === cell.cellName)
    models.mapCell.update({
      dataJson: JSON.stringify({
        ...JSON.parse(currentCell.dataJson),
        players: cell.players
      })
    }, {where: {cellName: cell.cellName}})
  })
}

function updatePlayersData({models, playersData}) {
  playersData.forEach(async (player) => {
    const playerData = await models.userMapData.findOne({where: {userId: player.userId}})
    if (playerData) {
      models.userMapData.update({selectedCellId: ''}, {where: {userId: player.userId}})
    } else {
      models.userMapData.create(player)
    }
  })
}

function getData(mapData, usersData, players) {
  const parcedMapData = mapData.map((cell) => ({
    cellName: cell.cellName,
    ...JSON.parse(cell.dataJson)
  }))

  const parcedUsersData = players.map(player => {
    let changedUser = usersData.find(user => user.userId === player.id)
    changedUser = changedUser || {
      userId: player.id,
      score: 0,
      selectedCellId: ''
    }

    smartSectorChoose(changedUser, parcedMapData)
    changedUser.selectedCellId = ''
    return changedUser
  })

  return {
    playersData: parcedUsersData,
    cellsData: parcedMapData
  }
}

function smartSectorChoose(player, mapData) {
  if (player.selectedCellId) {
    mapData.some((cell) => {
      if (cell.cellName === player.selectedCellId) {
        cell.players.push(player.userId)
        return true
      }
      return false
    })
  } else {
    const startedSectors = mapData.filter((cell) => cell.isStarted)
    const cellWithPlayer = mapData.find((cell) => cell.players.includes(player.userId))
    if (!cellWithPlayer) {
      const randomSector = startedSectors[Math.floor(Math.random() * startedSectors.length)]
      randomSector.players.push(player.userId)
    }
  }
}
