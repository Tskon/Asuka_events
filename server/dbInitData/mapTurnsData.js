module.exports = (models) => {
  const turns = [
    { name: 'selectStartSector', count: 1, fog: false },
    { name: 'commonTurn', count: 99, fog: true }
  ]

  models.mapTurnData.findAll({
    limit: 1
  })
    .then(((turnsInDb) => {
      if (turnsInDb[0]) return

      let turnNumber = 0

      turns.forEach((turn) => {
        for (let i = 0; i < turn.count; i++) {
          turnNumber++
          models.mapTurnData.create({
            turnNumber,
            turnName: turn.name,
            fog: turn.fog
          })
        }
      })
    }))
}
