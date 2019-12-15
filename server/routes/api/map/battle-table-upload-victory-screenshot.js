module.exports = function (router, models) {
  router.post('/map/battle-table-upload-victory-screenshot', async (req, res) => {
    const mapLog = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = (mapLog.length) ? mapLog[0].turn + 1 : 1

    const battleTable = await models.battleTable.findOne({
      where: {
        turnNumber,
        cellId: req.body.cellId
      }})

    if (!battleTable) {
      const screenName = req.body.clanTag

      models.battleTable.create({
        turnNumber,
        cellId: req.body.cellId,
        finalist1Screen: getScreenshotName(req.files.screenshot, 'semifinal-' + req.body.clanTag)
      })
    } else {
      // TODO получать уже имеющиеся данные, расширять пришедшими
    }

    res.send({
      status: 'ok'
    })

  })
}

function getScreenshotName(file, name) {
  const fileExtention = file.mimetype.split('/')[1]
  const fileName = name.replace(' ', '-')

  return `${fileName}.${fileExtention}`
}
