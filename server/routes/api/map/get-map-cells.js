module.exports = function (router, models) {
  router.post('/map/get-map-cells', (req, res) => {
    // models.mapCell.findAll({
    //   order: [['cellName', 'ASC']],
    //   attributes: ['cellName', 'dataJson']
    // })
    //   .then((cells) => {
    //     const data = []
    //     cells.forEach((cell) => {
    //       data.push({id: cell.cellName, ...JSON.parse(cell.dataJson)})
    //     })
    //     res.send({
    //       status: 'ok',
    //       data
    //     })
    //   })

    // TODO переделать. На данный момент дает данные из модели userMapData, нужны все ячейки.

    models.userMapData.findAll({
      include: [
        {model: models.mapCell, attributes: ['cellName', 'dataJson']},
        {model: models.userLkData, attributes: ['clanTag','clanName', 'imageUrl']}
      ]
    }).then(resp => {
      console.log(resp)
      res.send({
        status: 'ok',
        data: resp
      })
    })
  })
}
