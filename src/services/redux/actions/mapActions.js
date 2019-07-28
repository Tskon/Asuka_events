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
  post('/api/choose-start-sector', {
    cellId: cell.id
  })
  return {
    type: 'SET_PLAYER_SECTOR',
    payload: cell
  }
}