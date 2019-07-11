const cell = {
  bonus: 0,
  players: [],
  connectedCells: [],
  controlledTurnsCount: 0,
  isStarted: false
}

const lowEconomyCell = {
  ...cell,
  bonus: 10
}

const highEconomyCell = {
  ...cell,
  bonus: 15
}

const richEconomyCell = {
  ...cell,
  bonus: 20
}

const starterCellsList = ['a4', 'a5', 'a6', 'b1', 'b6', 'c1', 'c6', 'g1', 'g6', 'h1', 'h2', 'h3', 'h5', 'h6']
const emptyCellsList = ['b2', 'b3', 'c4', 'c5', 'd2', 'd4', 'i2', 'i3', 'i5', 'f3', 'f4', 'g3', 'g5']
const lowCellsList = ['a1', 'a2', 'a3', 'd1', 'd5', 'd6', 'f1', 'f2', 'f5', 'f6']
const highCellsList = ['b4', 'c2', 'd3', 'i1', 'i6', 'g2', 'g4']
const richCellsList = ['b5', 'c3', 'i4', 'h4'];

[starterCellsList, emptyCellsList, lowCellsList, highCellsList, richCellsList].forEach(list => {

})

const cellsMap = new Map()

function getConnectedCells() {

}

module.exports = (models) => {
  cellsList.forEach((cell) => {
    models.map.findByPk(req.user.id)
      .then((userDataObject) => {
        if (userDataObject) {
          models.user_lk_data.update({
            clan_tag: req.body.clanTag,
            clan_name: req.body.clanName,
            image_url: req.body.imageUrl,
          }, {
            where: { cell_name: req.user.id },
          })
        } else {
          models.user_lk_data.create({
            user_id: req.user.id,
            clan_tag: req.body.clanTag,
            clan_name: req.body.clanName,
            image_url: req.body.imageUrl,
          })
        }
      })
  })
}