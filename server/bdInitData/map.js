const cell = {
  bonus: 0,
  players: [],
  connectedCells: [],
  controlledTurnsCount: 0,
  isStarted: false
}

const starterCell = {
  ...cell,
  isStarted: true
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

const starterCellsList = [starterCell, 'a4', 'a5', 'a6', 'b1', 'b6', 'c1', 'c6', 'g1', 'g6', 'h1', 'h2', 'h3', 'h5', 'h6']
const emptyCellsList = [cell, 'b2', 'b3', 'c4', 'c5', 'd2', 'd4', 'i2', 'i3', 'i5', 'f3', 'f4', 'g3', 'g5']
const lowCellsList = [lowEconomyCell, 'a1', 'a2', 'a3', 'd1', 'd5', 'd6', 'f1', 'f2', 'f5', 'f6']
const highCellsList = [highEconomyCell, 'b4', 'c2', 'd3', 'i1', 'i6', 'g2', 'g4']
const richCellsList = [richEconomyCell, 'b5', 'c3', 'i4', 'h4']

const cellsMap = new Map();

[starterCellsList, emptyCellsList, lowCellsList, highCellsList, richCellsList].forEach((cellsList) => {
  cellsList.forEach((cell, i, arr) => {
    if (i === 0) return
    cellsMap.set(cell, arr[0])
  })
})

console.log(cellsMap)

function getConnectedCells() {

}

module.exports = (models) => {
  cellsMap.forEach((cell, cellName) => {
    models.map.findOne({where: {cell_name: cellName}})
      .then((userDataObject) => {
        if (userDataObject) {
          models.map.update({
            data_json: JSON.stringify(cell)
          }, {
            where: { cell_name: cellName },
          })
        } else {
          models.map.create({
            cell_name: cellName,
            data_json: JSON.stringify(cell)
          })
        }
      })
  })
}