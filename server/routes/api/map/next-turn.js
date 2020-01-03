module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const values = await Promise.all([
      models.mapCell.findAll({
        order: [['cellName']],
        attributes: ['cellName', 'dataJson']
      }),
      models.userMapData.findAll({
        attributes: ['userId', 'score', 'selectedCellId']
      })
    ])

    const { playersData, cellsData } = getData(values[0], values[1])
    await models.mapLog.create({
      playersJson: JSON.stringify(playersData),
      cellsJson: JSON.stringify(cellsData)
    })

    const mapLog = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = mapLog[0].turn

    createBattleTables({models, mapData: cellsData, turnNumber})
    updateCellsData({models, cellsData, cellsFromDB: values[0]})

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

function getData(mapData, usersData) {
  const parcedMapData = mapData.map((cell) => ({
    cellName: cell.cellName,
    ...JSON.parse(cell.dataJson)
  }))

  const parcedUsersData = usersData.map((user) => {
    const changedUser = user
    smartSectorChoose(user, parcedMapData)

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
    mapData.find((cell) => {
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
