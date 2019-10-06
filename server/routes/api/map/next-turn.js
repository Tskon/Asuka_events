module.exports = function (router, models) {
  router.post('/admin/next-turn', (req, res) => {
    Promise.all([
      models.mapCell.findAll({
        order: [['cellName']],
        attributes: ['cellName', 'dataJson']
      }),
      models.userMapData.findAll({
        attributes: ['userId', 'score', 'cellId']
      })
    ])
      .then(values => {
        const {playersJson, cellsJson} = getJson(values[0], values[1])

        models.mapLog.create({playersJson, cellsJson})

        res.send({
          status: 'ok',
          pl: JSON.parse(playersJson),
          map: JSON.parse(cellsJson)
        })
      })

  })
}

function getJson (mapData, usersData) {
  console.log(mapData, usersData)

  const parcedMapData = mapData.map(cell => {

    return {
      cellName: cell.cellName,
      ...JSON.parse(cell.dataJson)
    }
  })

  const parcedUsersData = usersData.map(user => {
    smartSectorChoose (user, parcedMapData)

    user.cellId = ''
    return user
  })

  return {
    playersJson: JSON.stringify(parcedUsersData),
    cellsJson: JSON.stringify(parcedMapData)
  }
}

function smartSectorChoose (player, mapData) {
  if (player.cellId) {
    mapData.find(cell => {
      if (cell.cellName === player.cellId) {
        cell.players.push(player.userId)
        return true
      }

      return false
    })
  } else {
    const startedSectors = mapData.filter(cell => cell.isStarted)

    const cellWithPlayer = mapData.find(cell => cell.players.includes(player.userId))

    if (!cellWithPlayer) {
      const randomSector = startedSectors[Math.floor(Math.random()*startedSectors.length)]
      randomSector.players.push(player.userId)
    }
  }
}