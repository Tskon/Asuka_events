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
        res.send({
          status: 'ok',
          data
        })
      })
  })
}
