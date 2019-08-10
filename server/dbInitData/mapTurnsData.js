module.exports = (models) => {
  const turns = [
    {name: 'selectStartSector', count: 1, fog: false},
    {name: 'commonTurn', count: 8, fog: true}
  ]

  models.mapTurnData.findAll({
    limit: 1
  })
    .then((turnsInDb => {
      if (turnsInDb[0]) return

      turns.forEach(turn => {
        for (let i = 0; i < turn.count; i++) {
          models.mapTurnData.create({
            turnName: turn.name,
            fog: turn.fog
          })
        }
      })
    }))
}