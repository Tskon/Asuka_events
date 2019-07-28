module.exports = function (router, models) {
  router.post('/map/get-map-cells', (req, res) => {
    models.mapCell.findAll({
      order: [['cell_name', 'ASC']],
      attributes: ['cell_name', 'data_json']
    })
      .then((cells) => {
        const data = []
        cells.forEach((cell) => {
          data.push({id: cell.cell_name, ...JSON.parse(cell.data_json)})
        })
        res.send({
          status: 'ok',
          data
        })
      })
  })
}
