import {post} from "../../utils"
import store from '../store'

export function getCellsData(){
  post('/api/get-map-cells')
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