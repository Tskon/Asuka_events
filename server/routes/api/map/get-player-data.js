module.exports = function (router, models) {
  router.post('/map/get-player-data', async(req, res) => {
    let playerData = await models.Player.findOne({username: req.user.username})

    if (!playerData) {
      await models.Player.create({ username: req.user.username })
      playerData = await models.Player.findOne({username: req.user.username})
    }

    // TODO использовались списки клеток и баттл-таблиц
    // TODO список клеток возможных к выбору selectableCellIds (winner ? connected cells : started cells)
    // const battleStatus = checkBattleStatus()

    res.send({
      status: 'ok',
      data: {
        currentCellId: playerData.currentCellId,
        selectedCellId: playerData.selectedCellId,
        ownedCellId: playerData.ownedCellId,
        // selectableCellIds,
        score: playerData.score,
        // battleStatus
      }
    })
    //
    // function checkBattleStatus() {
    //   let inBattle = false
    //   let winner = false
    //
    //   if (currentCell && currentCell.players.length > 1) {
    //
    //     rawBattleTableList.some(rawBattleTable => {
    //       const battleTable = JSON.parse(rawBattleTable.dataJson)
    //       if (battleTable.finalPair.includes(req.user.id)) {
    //         if(battleTable.finalPair.length === 1) {
    //           winner = true
    //           return true
    //         }
    //         if (!battleTable.winner) inBattle = true
    //         if (battleTable.winner === req.user.id) winner = true
    //         return true
    //       }
    //       if (battleTable.pair1.includes(req.user.id) && battleTable.pair1.length > 1) {
    //         if (!battleTable.winner) inBattle = true
    //         return true
    //       }
    //       if (battleTable.pair2.includes(req.user.id) && battleTable.pair2.length > 1) {
    //         if (!battleTable.winner) inBattle = true
    //         return true
    //       }
    //
    //       return false
    //     })
    //   } else if (currentCell && currentCell.players.length === 1) {
    //     winner = true
    //   }
    //
    //   return {
    //     inBattle,
    //     winner
    //   }
    // }
  })
}
