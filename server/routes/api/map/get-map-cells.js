module.exports = function (router, models) {
  router.post('/get-map-cells', (req, res) => {
    if (!req.isAuthenticated() || (!req.user.is_admin && !req.user.is_player)){
      return res.send({
        status: 'error',
        message: 'Вы не авторизованы',
      })
    }

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
