module.exports = function (router, models) {
  router.post('/admin/get-admin-panel-data', async (req, res) => {
    const users = await models.User.find()
    const players = await models.Player.find()

    const commonUsers = []
    const admins = []

    users.forEach((user) => {
      const {
        username, isAdmin, isPlayer
      } = user

      const userObject = {
        username,
        isAdmin,
        isPlayer
      }

      if (isAdmin) admins.push(userObject)
      if (!isPlayer) commonUsers.push(userObject)
    })

    res.send({
      status: 'ok',
      data: {
        commonUsers,
        players,
        admins
      }
    })

  })
}
