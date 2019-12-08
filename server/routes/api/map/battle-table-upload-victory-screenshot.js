module.exports = function (router, models) {
  router.post('/map/battle-table-upload-victory-screenshot', (req, res) => {
    console.log(req.files, req.file)
    // models.battleTable.findOne({
    //   where: {
    //     turnNumber: req.body.turnNumber,
    //     cellId: req.body.cellId
    //   }
    // })
    //   .then((battleTable) => {
    //     if (!battleTable) {
    //       return
    //     }
    //
    //     res.send({
    //       status: 'ok'
    //     })
    //   })
  })
}
