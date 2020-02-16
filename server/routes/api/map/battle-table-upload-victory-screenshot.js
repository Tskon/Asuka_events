const fs = require('fs')
const path = require('path')

let screenName = ''
// TODO заменить req.body.cellId данными из БД
module.exports = function (router, models) {
  router.post('/map/battle-table-upload-victory-screenshot', async (req, res) => {
    const mapLog = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
    const turnNumber = (mapLog.length) ? mapLog[0].turn + 1 : 1

    screenName += `${turnNumber}--${req.body.cellId}--`

    const battleTable = await models.battleTable.findOne({
      where: {
        turnNumber,
        cellId: req.body.cellId
      }
    })

    if (battleTable) {
      const data = JSON.parse(battleTable.dataJson)

      if (data.finalPair.includes(req.user.id)) {
        data.screenshots.winner = getScreenshotName(req.files.screenshot, `final--${req.body.clanTag}`)
        data.winner = req.user.id
        addUserScore(3)
      } else if (data.pair1.includes(req.user.id)) {
        data.screenshots.finalist1 = getScreenshotName(req.files.screenshot, `semifinal--${req.body.clanTag}`)
        data.finalPair[0] = req.user.id
        addUserScore(3)
      } else if (data.pair2.includes(req.user.id)) {
        data.screenshots.finalist2 = getScreenshotName(req.files.screenshot, `semifinal--${req.body.clanTag}`)
        data.finalPair[1] = req.user.id
        addUserScore(3)
      }

      models.battleTable.update({dataJson: JSON.stringify(data)}, {
        where: {
          turnNumber,
          cellId: req.body.cellId
        }
      })
    }

    fs.appendFileSync(path.resolve(__dirname, '../../../../upload/', screenName), req.files.screenshot.data)

    res.send({
      status: 'ok'
    })

    screenName = ''

    function addUserScore(num) {
      models.userMapData.increment('score', {
        by: num,
        where: { userId: req.user.id }
      })
    }

    function getScreenshotName(file, name) {
      const fileExtention = file.mimetype.split('/')[1]
      const fileName = name.replace(' ', '-')
      screenName += `${fileName}.${fileExtention}`
      return screenName
    }
  })
}
