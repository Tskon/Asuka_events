module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const [cellsDataFromDB, playersDataFromDB, playersList] = await Promise.all([
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

    const { playersData, cellsData } = getData(cellsDataFromDB, playersDataFromDB, playersList)
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

    createBattleTables({cellsData, turnNumber})
    updateCellsData({cellsData, cellsDataFromDB})
    updatePlayersData({playersData})

    res.send({
      status: 'success',
      message: `Начат ход №${turnNumber + 1}`
    })
  })

  function createBattleTables({cellsData, turnNumber}) {
    cellsData.forEach((cellData) => {
      if (cellData.players.length < 2) return

      const dataJson = JSON.stringify({
        screenshots: {
          finalist1: "",
          finalist2: "",
          winner: ""
        },
        pair1: [cellData.players[0], cellData.players[1]],
        pair2: [cellData.players[2], cellData.players[3]],
        finalPair: [],
        winner: ""
      })

      models.battleTable.create({
        turnNumber,
        cellId: cellData.cellName,
        dataJson
      })
    })
  }

  function updateCellsData({cellsData, cellsDataFromDB}) {
    cellsData.filter((cell) => cell.players.length).forEach((cell) => {
      const currentCell = cellsDataFromDB.find(cellFromDB => cellFromDB.cellName === cell.cellName)
      models.mapCell.update({
        dataJson: JSON.stringify({
          ...JSON.parse(currentCell.dataJson),
          players: cell.players
        })
      }, {where: {cellName: cell.cellName}})
    })
  }

  function updatePlayersData({playersData}) {
    playersData.forEach(async (playerData) => {
      const playerDataFromDB = await models.userMapData.findOne({where: {userId: playerData.userId}})
      if (playerDataFromDB) {
        models.userMapData.update({selectedCellId: ''}, {where: {userId: playerData.userId}})
      } else {
        models.userMapData.create(playerData)
      }
    })
  }

  function getData(cellsDataFromDB, playersDataFromDB, players) {
    const parcedCellsData = cellsDataFromDB.map((cellDataFromDB) => ({
      cellName: cellDataFromDB.cellName,
      ...JSON.parse(cellDataFromDB.dataJson)
    }))

    const parcedUsersData = players.map(player => {
      let changedUser = playersDataFromDB.find(user => user.userId === player.id)
      changedUser = changedUser || {
        userId: player.id,
        score: 0,
        selectedCellId: ''
      }

      smartSectorChoose(changedUser, parcedCellsData)
      changedUser.selectedCellId = ''
      return changedUser
    })

    return {
      playersData: parcedUsersData,
      cellsData: parcedCellsData
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
}
