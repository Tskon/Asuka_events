import React from 'react'
import classnames from 'classnames'
import ActionBar from './actionBar/ActionBar'
import {getCellsData} from '../../services/redux/actions/mapActions'
import '../../scss/map/map.scss'
import {connect} from "react-redux"

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cols: 8,
      rows: 6,
      currentScope: 3,
      actionBarShown: false,
      selectedCell: 'a1',
    }

    this.step = 1
    this.minScope = 2
    this.maxScope = 6
    this.letters = 'abcdefghijklmnop'
    this.mouseEventStart = {
      x: 0,
      y: 0,
    }
    this.mouseMoveAvailable = false
    this.shiftX = 0
    this.shiftY = 0

    this.cellClickPosition = 0
  }

  cellDownHandler = (e) => {
    this.cellClickPosition = e.clientX
  }

  cellClickHandler = (e, id) => {
    if (!this.props.user.isAdmin && !this.props.user.isPlayer) return
    if (this.cellClickPosition === e.clientX) this.showActionBar(id)

  }

  showActionBar = (id) => {
    this.setState({
      actionBarShown: true,
      selectedCell: id.toLowerCase()
    })
  }

  closeActionBar = () => {
    this.setState({
      actionBarShown: false
    })
  }

  componentDidMount() {
    document.addEventListener('wheel', this.wheelHandler)
  }

  getMapStyles = () => {
    return {
      transform: `scale(${this.state.currentScope * 0.5})`,
    }
  }

  scopeIn = () => {
    const newScope = this.state.currentScope + this.step
    if (newScope <= this.maxScope) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  scopeOut = () => {
    const newScope = this.state.currentScope - this.step
    if (newScope > this.minScope - this.step) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  rangeHandler = () => {
    console.log(this.state.currentScope)
  }

  wheelHandler = (event) => {
    const e = event || window.event
    const delta = e.deltaY || e.detail || e.wheelDelta

    if (delta < 0) {
      this.scopeIn()
    } else {
      this.scopeOut()
    }

    this.checkShiftValues()
  }

  wrapperMouseDownHandler = (event) => {
    event.preventDefault()
    this.mouseEventStart = {
      x: event.clientX,
      y: event.clientY,
    }
    this.mouseMoveAvailable = true
  }

  wrapperMouseUpHandler = () => {
    this.mouseMoveAvailable = false
  }

  wrapperMouseMoveHandler = (event) => {
    if (this.mouseMoveAvailable) {
      this.shiftX += event.clientX - this.mouseEventStart.x
      this.shiftY += event.clientY - this.mouseEventStart.y

      this.checkShiftValues()

      this.mapRef.style.left = `${this.shiftX}px`
      this.mapRef.style.top = `${this.shiftY}px`

      this.mouseEventStart = {
        x: event.clientX,
        y: event.clientY,
      }
    }
  }

  checkShiftValues = () => {
    const maxShiftX = 600 * this.state.currentScope
    const maxShiftY = 240 * this.state.currentScope
    const minShiftX = -maxShiftX
    const minShiftY = -maxShiftY

    if (this.shiftX > maxShiftX) this.shiftX = maxShiftX
    if (this.shiftY > maxShiftY) this.shiftY = maxShiftY
    if (this.shiftX < minShiftX) this.shiftX = minShiftX
    if (this.shiftY < minShiftY) this.shiftY = minShiftY
  }

  initCells = () => {
    const gridCells = []
    for (let i = 0; i < this.state.cols * this.state.rows; i += 1) {
      const rowNum = Math.ceil((i + 1) / this.state.cols)
      const colNum = (i + 1) % this.state.cols || this.state.cols
      const colLetter = this.letters[colNum - 1]
      const id = colLetter + rowNum


      const players = this.props.cells[id] ?
        this.props.cells[id].players.map(player => {
          return (
            <li key={`${this.props.cells[id]}-players-${player.userId}`}>
              <img src={player.imageUrl} alt="Аватар"/>
              {player.clanTag}
            </li>
          )
        }) : []

      gridCells.push(
        <button
          className={classnames(
            'event-map__elem',
            {
              'event-map__elem_started': this.props.cells[id] && this.props.cells[id].isStarted
            }
          )}
          key={`map-elem-${i}`}
          id={id}
          onClick={(e) => {this.cellClickHandler(e,id)}}
          onMouseDown={this.cellDownHandler}
        >
          <div className='players-in-cell'>
            <ul>{players}</ul>
          </div>
          {id}
        </button>
      )
    }

    return gridCells
  }

  componentDidMount() {
    getCellsData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((this.props.user.isAdmin || this.props.user.isPlayer)
      && !prevProps.cells.hasOwnProperty(this.state.selectedCell)) {
      getCellsData()
    }
  }

  render() {
    const gridCells = this.initCells()
    return (
      <div
        className="map-page"
        onMouseDown={this.wrapperMouseDownHandler}
        onMouseUp={this.wrapperMouseUpHandler}
        onMouseLeave={this.wrapperMouseUpHandler}
        onMouseMove={this.wrapperMouseMoveHandler}
      >
        <div
          ref={(ref) => {
            this.mapRef = ref
          }}
          className="map-wrapper"
          style={this.getMapStyles()}
        >
          <div className="event-map">
            {gridCells}
          </div>
        </div>
        <div className="event-map__controls">
          <button type="button" onClick={this.scopeOut}>-</button>
          <input
            type="range"
            min={this.minScope}
            max={this.maxScope}
            id="size"
            value={this.state.currentScope}
            onChange={this.rangeHandler}
          />
          <button type="button" onClick={this.scopeIn}>+</button>
        </div>
        <ActionBar
          show={this.state.actionBarShown}
          closeHandler={this.closeActionBar}
          selectedCell={this.state.selectedCell}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cells: state.map.cells,
  stage: state.map.stage,
  user: state.user.data
})

export default connect(mapStateToProps)(Map)