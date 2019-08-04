module.exports = function (router, models) {
  router.post('/map/get-map-cells', (req, res) => {
    models.mapCell.findAll({
      order: [['cellName', 'ASC']],
      attributes: ['cellName', 'dataJson']
    })
      .then((cells) => {
        const data = []
        cells.forEach((cell) => {
          data.push({id: cell.cellName, ...JSON.parse(cell.dataJson)})
        })

        models.userMapData.findAll({
          attributes: ['cellId', 'score'],
          include: [
            {model: models.userLkData, attributes: ['clanTag','clanName', 'imageUrl', 'userId']}
          ]
        }).then(userCells => {
          data.map(cell => {
            const userCellsFiltered = userCells.filter(userCell => userCell.cellId === cell.id)
            userCellsFiltered.forEach(userCell => cell.players.push(userCell.userLkDatum))
            return cell
          })

          res.send({
            status: 'ok',
            data
          })
        })
      })
  })
}
