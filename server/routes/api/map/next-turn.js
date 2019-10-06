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
          status: 'ok'
        })
      })

  })
}

function getJson (mapData, usersData) {
  return {
    playersJson: JSON.stringify(usersData),
    cellsJson: JSON.stringify(
      values[0].map(cell => {
        return {
          cellName: cell.cellName,
          ...JSON.parse(cell.dataJson)
        }
      })
    )
  }
}