module.exports = (models) => {
  models.user.findOne({ where: { username: 'beatxd' } })
    .then((userDataObject) => {
      if (!userDataObject) {
        models.user.create({
          username: 'beatxd',
          password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
          isAdmin: 1,
          isPlayer: 0
        })

        models.user.create({
          username: 'drobotov.92@mail.ru',
          password: '$2a$08$PSAu6YvLoJxSUF4njjnT0umDPet4OCFGC8cuSCdOhnjEiyHHsk6CS',
          secret: '$2a$08$PSAu6YvLoJxSUF4njjnT0umDPet4OCFGC8cuSCdOhnjEiyHHsk6CS',
          isAdmin: 1,
          isPlayer: 0
        })

        // models.user.create({
        //   username: 'user1',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user2',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user3',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user4',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user5',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user6',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user7',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user8',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
        //
        // models.user.create({
        //   username: 'user9',
        //   password: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   secret: '$2a$08$Dygxt1hYXnEcEvaWOQqSv.m/U4XHbfeGbE1Oo17SsTQM99wdRWvTi',
        //   isAdmin: 0,
        //   isPlayer: 1
        // })
      }
    })
}
