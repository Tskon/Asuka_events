module.exports = function (router, models) {
  router.post('/admin/create-event', async (req, res) => {
    const {
      slug,
      name,
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList,
      bonusForWin
    } = req.body

    if (await models.Event.countDocuments({ slug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент уже существует'
      })

      return
    }

    if (
      !slug
      || !name
      || !columns.length
      || !rows.length
      || !startedSectors.length
      || !gameMapList.length
    ) {
      res.send({
        status: 'warning',
        message: 'Эвент не создан, переданы некорректные данные'
      })

      return
    }

    const cellList = createCells({
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList
    })

    const turnList = createTurns()

    await models.Event.create({
      slug,
      name,
      columns,
      rows,
      cellList,
      turnList,
      bonusForWin
    })

    res.send({
      status: 'success',
      message: 'Эвент создан"'
    })
  })
}

function createCells(options) {
  const {
    columns,
    rows,
    startedSectors,
    richEconomyCells,
    middleEconomyCells,
    poorEconomyCells,
    gameMapList
  } = options

  const cells = []

  columns.forEach((col) => {
    rows.forEach(row => {
      const name = `${col}${row}`
      const connectedCells = getConnectedCells(name, columns, rows)
      const started = startedSectors.includes(name)
      const gameMap = gameMapList[Math.floor(Math.random() * gameMapList.length)]

      const isReach = richEconomyCells.list.some(cellName => cellName === name)
      const isMiddle = middleEconomyCells.list.some(cellName => cellName === name)
      const isPoor = poorEconomyCells.list.some(cellName => cellName === name)

      let cellBonus = 0
      let incomeStatus

      if (isReach) {
        cellBonus = richEconomyCells.bonus
        incomeStatus = 'reach'
      }

      if (isMiddle) {
        cellBonus = middleEconomyCells.bonus
        incomeStatus = 'middle'
      }

      if (isPoor) {
        cellBonus = poorEconomyCells.bonus
        incomeStatus = 'poor'
      }

      cells.push({
        name,
        connectedCells,
        started,
        gameMap,
        incomeStatus,
        bonus: cellBonus
      })
    })
  })

  return cells
}

function getConnectedCells(cellName, columns, rows) {
  let cellColumn
  let cellRow

  columns.some(col => {
    return rows.some(row => {
      if (`${col}${row}` === cellName) {
        cellColumn = col
        cellRow = row
        return true
      }
      return false
    })
  })

  const columnIndex = columns.findIndex(col => col === cellColumn)
  const rowIndex = rows.findIndex(row => row === cellRow)

  const result = []

  if (columnIndex === -1 || rowIndex === -1) return result

  if (columnIndex > 0) {
    const nearColumn = columns[columnIndex - 1]
    result.push(`${nearColumn}${cellRow}`)
    if (rowIndex > 0) {
      const nearRow = rows[rowIndex - 1]
      result.push(`${nearColumn}${nearRow}`)
    }
    if (rowIndex < rows.length - 1) {
      const nearRow = rows[rowIndex + 1]
      result.push(`${nearColumn}${nearRow}`)
    }
  }

  if (columnIndex < columns.length - 1) {
    const nearColumn = columns[columnIndex + 1]
    result.push(`${nearColumn}${cellRow}`)
    if (rowIndex > 0) {
      const nearRow = rows[rowIndex - 1]
      result.push(`${nearColumn}${nearRow}`)
    }
    if (rowIndex < rows.length - 1) {
      const nearRow = rows[rowIndex + 1]
      result.push(`${nearColumn}${nearRow}`)
    }
  }

  if (rowIndex > 0) {
    const nearRow = rows[rowIndex - 1]
    result.push(`${cellColumn}${nearRow}`)
  }
  if (rowIndex < rows.length - 1) {
    const nearRow = rows[rowIndex + 1]
    result.push(`${cellColumn}${nearRow}`)
  }

  return result
}

function createTurns() {
  return [
    {
      turnNumber: 1,
      fog: false,
      type: 'selectStartSector'
    },
    {
      turnNumber: 2,
      fog: false,
      type: 'commonTurn'
    },
    {
      turnNumber: 3,
      fog: false,
      type: 'commonTurn'
    },
    {
      turnNumber: 4,
      fog: false,
      type: 'commonTurn'
    },
    {
      turnNumber: 5,
      fog: false,
      type: 'commonTurn'
    },
    {
      turnNumber: 6,
      fog: false,
      type: 'commonTurn'
    },
    {
      turnNumber: 7,
      fog: false,
      type: 'commonTurn'
    }
  ]
}
