import React from 'react'
import ActionBar from './actionBar/ActionBar'
import '../../scss/map/map.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cols: 8,
      rows: 6,
      currentScope: 3,
      actionBarShown: false
    }

    this.step = 1
    this.minScope = 2
    this.maxScope = 6
    this.letters = 'ABCDIFGHIJKLMNOP'
    this.mouseEventStart = {
      x: 0,
      y: 0,
    }
    this.mouseMoveAvailable = false
    this.shiftX = 0
    this.shiftY = 0

    this.gridElems = []
    for (let i = 0; i < this.state.cols * this.state.rows; i += 1) {
      const rowNum = Math.ceil((i + 1) / this.state.cols)
      const colNum = (i + 1) % this.state.cols || this.state.cols
      const colLetter = this.letters[colNum - 1]

      this.gridElems.push(
        <div
          className="event-map__elem"
          key={`map-elem-${i}`}
          id={colLetter + rowNum}
          onClick={() => {this.showActionBar(colLetter + rowNum)}}
        >
          {colLetter + rowNum}
        </div>,
      )
    }
  }

  showActionBar = (id) => {
    this.setState({
      actionBarShown: true
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

  render() {
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
            {this.gridElems}
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
        <ActionBar show={this.state.actionBarShown} closeHandler={this.closeActionBar}></ActionBar>
      </div>
    )
  }
}
