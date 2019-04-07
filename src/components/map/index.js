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

    this.step = 1
    this.minScope = 1
    this.maxScope = 8

    this.gridElems = []
    for (let i = 0; i < this.state.cols * this.state.rows; i += 1) {
      this.gridElems.push(
        <div
          className="event-map__elem"
          key={`map-elem-${i}`}
        />,
      )
    }

    this.scopeIn = this.scopeIn.bind(this)
    this.scopeOut = this.scopeOut.bind(this)
    this.rangeHandler = this.rangeHandler.bind(this)
    this.wheelHandler = this.wheelHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('wheel', this.wheelHandler)
  }

  getMapStyles() {
    return {
      width: `${100 * (1 + this.state.currentScope / 2)}%`,
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

    if (delta < 0) this.scopeIn()
    else this.scopeOut()
  }

  render() {
    return (
      <div className="map-wrapper">
        <div className="event-map" style={this.getMapStyles()}>
          {this.gridElems}
        </div>
        <div className="event-map__controls">
          <button type="button" onClick={this.scopeIn}>+</button>
          <input
            type="range"
            min={this.minScope}
            max={this.maxScope}
            id="size"
            value={this.state.currentScope}
            onChange={this.rangeHandler}
          />
          <button type="button" onClick={this.scopeOut}>-</button>
        </div>
      </div>
    )
  }
}
