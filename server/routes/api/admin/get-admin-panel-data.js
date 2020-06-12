module.exports = function (router, models) {
  router.post('/admin/get-admin-panel-data', async (req, res) => {
    const users = await models.User.find()
    const playersData = await models.Player.find()

    const usersData = users.map((user) => {
      const {
        username, isAdmin
      } = user

      const playerData = playersData.find(pd => pd.username === username) || {_doc: {}}

      return {
        username,
        isAdmin,
        eventList: playerData.events
      }
    })

    res.send({
      status: 'ok',
      data: {
        users: usersData
      }
    })

  })
}
