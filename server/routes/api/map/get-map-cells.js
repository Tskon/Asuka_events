module.exports = function (router, models) {
  router.post('/map/get-map-cells', async (req, res) => {
    const [cells, players] = await Promise.all([
      models.mapCell.findAll({
        order: [['cellName', 'ASC']],
        attributes: ['cellName', 'dataJson']
      }),
      models.userLkData.findAll({
        attributes: ['userId', 'clanTag']
      })
    ])

    const data = cells.map((cell) => {
      const parsedCell = {
        id: cell.cellName,
        ...JSON.parse(cell.dataJson)
      }

      parsedCell.players = parsedCell.players.map(playerId => {
        const player = players.find((player) => {
          return player.userId === playerId
        })
        return player
          ? {id: player.userId, clanTag: player.clanTag}
          : {id: playerId, clanTag: 'UNKWN'}
      })

      return parsedCell
    })

    const currentCell = data.find((cell) => {
      return cell.players.some(player => player.id === req.user.id)
    })


    const filteredData = data.map((cell) => {
      return (cell.id === currentCell.id || cell.connectedCells.includes(currentCell.id))
        ? cell
        : {
          id: cell.id,
          connectedCells: cell.connectedCells,
          players: [],
          bonus: cell.bonus
        }
    })

    res.send({
      status: 'ok',
      data: filteredData
    })

  })
}
