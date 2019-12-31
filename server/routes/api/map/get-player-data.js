module.exports = function (router, models) {
  router.post('/map/get-player-data', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) return

        res.send({
          status: 'ok',
          data: {
            currentCellId: 'a1', // TODO add logic
            selectedCellId: userMapData.selectedCellId, // TODO changes on front-end
            selectableCellIds: [], // TODO add logic
            score: userMapData.score,
            inBattle: false, // TODO add logic
            battleResults: [], // TODO add logic [true, false]
          }
        })
      })
  })
}
