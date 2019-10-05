module.exports = (models) => {
  models.user.findOne({where: {username: 'beatxd'}})
    .then((userDataObject) => {
      if (!userDataObject) {
        models.user.create({
          username: 'beatxd',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 1,
          isPlayer: 1
        })

        models.user.create({
          username: 'Palochka_Nagibalochka_M',
          password: '$2a$08$qbgtfzddmKniXHGrnbZEVeMwopRcbnybTtVfZrUVEd5pBDS4aigry',
          secret: '$2a$08$qbgtfzddmKniXHGrnbZEVeMwopRcbnybTtVfZrUVEd5pBDS4aigry',
          isAdmin: 1,
          isPlayer: 1
        })
      }
    })
}