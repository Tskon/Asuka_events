module.exports = function (router, models) {
  router.post('/admin/get-logs', async (req, res) => {
    const logs = await models.Log.find({}, 'turnNumber players cells')

    res.send({
      status: 'ok',
      data: logs
    })
  })
}
