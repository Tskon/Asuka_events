import React from 'react'
import '../../scss/map/map.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cols: 8,
      rows: 6,
      currentScope: 1,
    }

    this.step = 0.2
    this.minScope = 0.5
    this.maxScope = 8
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
        >
          {colLetter + rowNum}
        </div>,
      )
    }

    this.scopeIn = this.scopeIn.bind(this)
    this.scopeOut = this.scopeOut.bind(this)
    this.rangeHandler = this.rangeHandler.bind(this)
    this.wheelHandler = this.wheelHandler.bind(this)
    this.wrapperMouseDownHandler = this.wrapperMouseDownHandler.bind(this)
    this.wrapperMouseUpHandler = this.wrapperMouseUpHandler.bind(this)
    this.wrapperMouseMoveHandler = this.wrapperMouseMoveHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('wheel', this.wheelHandler)
  }

  getMapStyles() {
    return {
      transform: `scale(${this.state.currentScope})`,
    }
  }

  scopeIn() {
    const newScope = this.state.currentScope + this.step
    if (newScope <= this.maxScope) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  scopeOut() {
    const newScope = this.state.currentScope - this.step
    if (newScope > this.minScope - this.step) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  rangeHandler() {
    console.log(this.state.currentScope)
  }

  wheelHandler(event) {
    event.preventDefault()
    const e = event || window.event
    const delta = e.deltaY || e.detail || e.wheelDelta

    if (delta < 0) {
      this.scopeIn()
    } else {
      this.scopeOut()
    }
  }

  wrapperMouseDownHandler(event) {
    event.preventDefault()
    this.mouseEventStart = {
      x: event.clientX,
      y: event.clientY,
    }
    this.mouseMoveAvailable = true
  }

  wrapperMouseUpHandler() {
    this.mouseMoveAvailable = false
  }

  wrapperMouseMoveHandler(event) {
    if (this.mouseMoveAvailable) {
      this.shiftX -= event.clientX - this.mouseEventStart.x
      this.shiftY -= event.clientY - this.mouseEventStart.y

      const maxValX = this.mapRef.clientWidth / 4
      if (this.shiftX > maxValX) this.shiftX = maxValX
      if (this.shiftX < -maxValX) this.shiftX = -maxValX

      const maxValY = this.mapRef.clientHeight / 4
      if (this.shiftY > maxValY) this.shiftY = maxValY
      if (this.shiftY < -maxValY) this.shiftY = -maxValY

      this.mapRef.style.left = `calc(50% - ${this.shiftX}px)`
      this.mapRef.style.top = `calc(50% - ${this.shiftY}px)`

      this.mouseEventStart = {
        x: event.clientX,
        y: event.clientY,
      }
    }
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
      </div>
    )
  }
}
