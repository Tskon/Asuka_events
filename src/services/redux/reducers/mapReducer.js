import {createReducer} from 'redux-starter-kit'
import {STAGES} from '../../constants'

const initialState = {
  cells: {},
  stage: STAGES.CHOOSE_START_SECTOR
}

const mapReducer = createReducer(initialState, {
  SET_CELLS(state, action) {
    if (!action.payload.data) return

    const cells = {}
    action.payload.data.forEach(cell => {
      cells[cell.id] = cell
    })
    state.cells = cells
  }
})

export default mapReducer
