import {post} from "../../utils"
import store from '../store'

export function getCellsData(){
  post('/api/map/get-map-cells')
    .then(cells => {
      store.dispatch(setCellsData(cells))
    })
}

function setCellsData(cells) {
  return {
    type: 'SET_CELLS',
    payload: cells
  }
}

export function chooseStartSector(cell) {
  post('/api/map/choose-start-sector', {
    cellId: cell.id
  })
    // TODO Поправить ошибку Uncaught (in promise) Error: Actions must be plain objects. Use custom middleware for async actions.
    .then(() => {
      store.dispatch(getCellsData())
    })
  return {
    type: 'SET_PLAYER_SECTOR',
    payload: cell
  }
}