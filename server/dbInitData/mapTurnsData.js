module.exports = async (models) => {
  if (await models.TurnType.countDocuments()) return

  const turns = [
    { type: 'selectStartSector', count: 1, fog: false },
    { type: 'commonTurn', count: 99, fog: true }
  ]

  let turnNumber = 0

  turns.forEach((turn) => {
    for (let i = 0; i < turn.count; i++) {
      turnNumber++
      models.TurnType.create({
        turnNumber,
        type: turn.type,
        fog: turn.fog
      })
    }
  })
}
