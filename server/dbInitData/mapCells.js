const basicCell = {
  bonus: 0,
  connectedCells: [],
  started: false
}

const starterCell = {
  ...basicCell,
  started: true
}

const lowEconomyCell = {
  ...basicCell,
  bonus: 10
}

const highEconomyCell = {
  ...basicCell,
  bonus: 15
}

const richEconomyCell = {
  ...basicCell,
  bonus: 20
}

const starterCellsList = [starterCell, 'a4', 'a5', 'a6', 'b1', 'b6', 'c1', 'c6', 'g1', 'g6', 'h1', 'h2', 'h3', 'h5', 'h6']
const emptyCellsList = [basicCell, 'b2', 'b3', 'c4', 'c5', 'd2', 'd4', 'e2', 'e3', 'e5', 'f3', 'f4', 'g3', 'g5']
const lowCellsList = [lowEconomyCell, 'a1', 'a2', 'a3', 'd1', 'd5', 'd6', 'f1', 'f2', 'f5', 'f6']
const highCellsList = [highEconomyCell, 'b4', 'c2', 'd3', 'e1', 'e6', 'g2', 'g4']
const richCellsList = [richEconomyCell, 'b5', 'c3', 'e4', 'h4']

const gameMapList = [
  'Море надежды (Турнир Превосходство)',
  'Огненная земля (Турнир Превосходство)р',
  'Слезы пустыни (Турнир Превосходство)',
  'Путь воина (Турнир Превосходство)',
  'Океан (Турнир Превосходство)',
  'Спящий гигант (Турнир Превосходство)',
  'Соседи (Турнир Превосходство)',
  'Раскол (Турнир Превосходство)',
  'Греция (Ранговый, превосходство)',
  'Ловушка (Ранговый, превосходство)',
  'Север (Турнир Превосходство)',
  'Северные воды (Турнир Превосходство)',
  'Зона крушения Альфа (Турнир Превосходство)'
]

const cellsMap = new Map();

[starterCellsList, emptyCellsList, lowCellsList, highCellsList, richCellsList]
  .forEach((cellsList) => {
    cellsList.forEach((cell, i, arr) => {
      if (i === 0) return
      cellsMap.set(cell, { ...arr[0], connectedCells: getConnectedCells(cell) })
    })
  })

function getConnectedCells(cellName = 'a1') {
  const letters = 'abcdefgh'
  const numbers = [1, 2, 3, 4, 5, 6]
  const cellLetter = cellName[0]
  const letterIndex = letters.indexOf(cellLetter)
  const cellNumber = +cellName[1]
  const result = []

  if (letterIndex === -1) return result
  if (!numbers.includes(cellNumber)) return result

  if (letterIndex > 0) {
    const nearLetter = letters[letterIndex - 1]
    result.push(nearLetter + cellNumber)
    if (cellNumber > 1) result.push(nearLetter + (cellNumber - 1))
    if (cellNumber < numbers.length) result.push(nearLetter + (cellNumber + 1))
  }
  if (letterIndex < letters.length - 1) {
    const nearLetter = letters[letterIndex + 1]
    result.push(nearLetter + cellNumber)
    if (cellNumber > 1) result.push(nearLetter + (cellNumber - 1))
    if (cellNumber < numbers.length) result.push(nearLetter + (cellNumber + 1))
  }
  if (cellNumber > 1) {
    const nearNumber = cellNumber - 1
    result.push(cellLetter + nearNumber)
  }
  if (cellNumber < numbers.length) {
    const nearNumber = cellNumber + 1
    result.push(cellLetter + nearNumber)
  }

  return result
}

module.exports = async (models) => {
  if (await models.Cell.countDocuments()) return

  cellsMap.forEach((cell, name) => {
    models.Cell.create({
      name,
      gameMap: gameMapList[Math.floor(Math.random() * gameMapList.length)],
      ...cell
    })
  })
}
