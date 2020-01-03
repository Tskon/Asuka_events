module.exports = (models) => {
  models.user.findOne({ where: { username: 'beatxd' } })
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
          username: 'user1',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user2',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user3',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user4',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user5',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user6',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user7',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user8',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'user9',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 0,
          isPlayer: 1
        })

        models.user.create({
          username: 'Palochka_Nagibalochka_M',
          password: '$2a$08$qbgtfzddmKniXHGrnbZEVeMwopRcbnybTtVfZrUVEd5pBDS4aigry',
          secret: '$2a$08$qbgtfzddmKniXHGrnbZEVeMwopRcbnybTtVfZrUVEd5pBDS4aigry',
          isAdmin: 1,
          isPlayer: 1
        })

        models.userMapData.create({
          userId: 1,
          selectedCellId: 'a4'
        })
        models.userMapData.create({
          userId: 2,
          selectedCellId: 'a4'
        })
        models.userMapData.create({
          userId: 3,
          selectedCellId: 'a4'
        })
        models.userMapData.create({
          userId: 4,
          selectedCellId: 'a4'
        })
      }
    })
}
