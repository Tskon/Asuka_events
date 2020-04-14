// TODO добавлять очки оунерам клеток

module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const [mapLog] = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = mapLog ? mapLog.turn + 1 : 1

    const [
      cellsDataFromDB,
      playersDataFromDB,
      playersList,
      battleTableListFromDB
    ] = await Promise.all([
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
      }),
      models.battleTable.findAll({where: {
        turnNumber
      }})
    ])

    const { playersData, cellsData } = getData(cellsDataFromDB, playersDataFromDB, playersList)
    await models.mapLog.create({
      playersJson: JSON.stringify(playersData),
      cellsJson: JSON.stringify(cellsData)
    })

    const battleTableList = battleTableListFromDB.map(battleTable => {
      return {
        cellId: battleTable.cellId,
        ...JSON.parse(battleTable.dataJson)
      }
    })

    const cellsDataCopy = JSON.parse(JSON.stringify(cellsData))
    cellsData.forEach(cellData => {
      if (cellData.owner) {
        const owner = playersData.find(player => player.userId === cellData.owner)
        owner.score += cellData.bonus
      }

      if (cellData.players.length === 1) {
        const playerData = playersData.find(player => player.userId === cellData.players[0])
        if (playerData.selectedCellId === cellData.cellName) {
          [cellData.owner] = cellData.players
        }
      }

      cellData.players.forEach(player => {
        battleTableList.some((battleTable) => {
          if (battleTable.winner === player) {
            const playerData = playersData.find(player => player.userId === cellData.players[0])
            if (playerData.selectedCellId === cellData.cellName) {
              cellData.owner = player
            }
            return true
          }
          return false
        })
      })

      cellData.players = []
    })

    playersData.forEach(playerData => {
      smartSectorChoose(playerData, cellsData, cellsDataCopy, battleTableList)
      playerData.selectedCellId = ''
    })

    createBattleTables({cellsData, turnNumber: turnNumber + 1})
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
    cellsData.forEach((cell) => {
      const currentCell = cellsDataFromDB.find(cellFromDB => cellFromDB.cellName === cell.cellName)
      models.mapCell.update({
        dataJson: JSON.stringify({
          ...JSON.parse(currentCell.dataJson),
          players: cell.players,
          owner: cell.owner
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
    const owners = new Map() // [{userId: bonus}]

    const parcedCellsData = cellsDataFromDB.map((cellDataFromDB) => {
      const parcedCell = {
        cellName: cellDataFromDB.cellName,
        ...JSON.parse(cellDataFromDB.dataJson)
      }

      if (parcedCell.owner) {
        owners.set(parcedCell.owner, parcedCell.bonus)
      }

      return parcedCell
    })

    const parcedUsersData = players.map(player => {
      let changedUser = playersDataFromDB.find(user => user.userId === player.id)
      changedUser = changedUser || {
        userId: player.id,
        score: 0,
        selectedCellId: ''
      }

      if (owners.has(changedUser.userId)) {
        changedUser.score += owners.get(changedUser.userId)
      }

      return changedUser
    })

    return {
      playersData: parcedUsersData,
      cellsData: parcedCellsData
    }
  }

  function smartSectorChoose(player, mapDataClear, mapData, battleTableList) {
    if (player.selectedCellId) {
      mapData.some((cell) => {
        if (cell.cellName === player.selectedCellId) {
          const newCellData = mapDataClear.find(cellData => cellData.cellName === player.selectedCellId)
          newCellData.players.push(player.userId)
          return true
        }
        return false
      })
    } else {
      const startedSectors = mapDataClear.filter((cell) => {
        return cell.isStarted && cell.players.length < 4
      })
      const cellWithPlayer = mapData.find((cell) => cell.players.includes(player.userId))
      const currentBattleTable = battleTableList.find(battleTable => battleTable.cellId === cellWithPlayer.cellName)
      if (!cellWithPlayer || !currentBattleTable || currentBattleTable.winner !== player.userId) {
        const randomSector = startedSectors[Math.floor(Math.random() * startedSectors.length)]
        randomSector.players.push(player.userId)
      }
    }
  }
}
