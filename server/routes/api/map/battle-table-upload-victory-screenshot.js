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
      models.battleTable.create({
        turnNumber,
        cellId: req.body.cellId,
        finalist1Screen: getScreenshotName(req.files.screenshot, 'semifinal-' + req.body.clanTag)
      })
    } else {
      const data = {
        turnNumber,
        cellId: req.body.cellId,
      }

      if (!battleTable.dataValues.finalist2Screen) {
        data.finalist2Screen = getScreenshotName(req.files.screenshot, 'semifinal-' + req.body.clanTag)
      } else if (!battleTable.dataValues.winner) {
        data.winnerScreen = getScreenshotName(req.files.screenshot, 'semifinal-' + req.body.clanTag)
      }

      models.battleTable.create(data)
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
