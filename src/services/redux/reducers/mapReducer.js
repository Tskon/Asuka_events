import {createReducer} from 'redux-starter-kit'

const initialState = {
  cells: {}
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
