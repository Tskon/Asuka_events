module.exports = (models) => {
  models.user.findOne({where: {username: 'beatxd'}})
    .then((userDataObject) => {
      if (!userDataObject) {
        models.user.create({
          username: 'beatxd',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          is_admin: 1,
          is_player: 1
        })
      }
    })
}