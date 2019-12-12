module.exports = function (router, models) {
  router.post('/map/battle-table-upload-victory-screenshot', (req, res) => {
    console.log(req.files)
    models.battleTable.findOne({
      where: {
        // turnNumber: req.body.turnNumber, // заранее получать turnNumber
        cellId: req.body.cellId
      }
    })
      .then((battleTable) => {
        if (!battleTable) {
          const screenshots = {}
          if (req.body.isFinal) {
            screenshots.final[req.body.clanTag] = req.files.screenshot
          } else {
            screenshots.semifinals[req.body.clanTag] = req.files.screenshot
          }

          models.battleTable.create({
            // TODO запрашивать turnNumber: NUM,
            cellId: req.body.cellId,
            screenshots: JSON.stringify(screenshots)
          })
        } else {
          // TODO получать уже имеющиеся данные, расширять пришедшими
        }

        res.send({
          status: 'ok'
        })
      })
  })
}
