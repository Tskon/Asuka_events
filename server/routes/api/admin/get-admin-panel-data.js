module.exports = function (router, models) {
  router.post('/admin/get-admin-panel-data', (req, res) => {
    if (req.isAuthenticated() && req.user.is_admin) {
      models.user.findAll()
        .then((users) => {
          const commonUsers = []
          const players = []
          const admins = []

          users.forEach((user) => {
            const {
              id, username, is_admin: isAdmin, is_player: isPlayer,
            } = user

            const userObject = {
              id,
              username,
              isAdmin,
              isPlayer,
            }

            if (isAdmin) admins.push(userObject)
            if (isPlayer) players.push(userObject)
            if (!isPlayer) commonUsers.push(userObject)
          })

          res.send({
            status: 'ok',
            data: {
              commonUsers,
              players,
              admins,
            },
          })
        })
    } else {
      res.send({
        status: 'error',
        message: 'Вы не авторизованы',
      })
    }
  })
}
