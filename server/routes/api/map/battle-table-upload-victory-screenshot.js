module.exports = function (router, models) {
  router.post('/map/battle-table-upload-victory-screenshot', async (req, res) => {
    const mapLog = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = (mapLog.length) ? mapLog[0].turn + 1 : 1

    models.battleTable.findOne({
      where: {
        turnNumber,
        cellId: req.body.cellId
      }
    })
      .then((battleTable) => {
        if (!battleTable) {
          const screenshots = {final:{}, semifinal:{}}
          if (req.body.isFinal) {
            screenshots.final[req.body.clanTag] = req.files.screenshot
          } else {
            screenshots.semifinals[req.body.clanTag] = req.files.screenshot
          }

          models.battleTable.create({
            turnNumber,
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
