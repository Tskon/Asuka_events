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
  }

  scopeIn() {
    const newScope = this.state.currentType + this.step
    if (newScope <= this.maxScope) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  scopeOut() {
    const newScope = this.state.currentType - this.step
    if (newScope > this.minScope - this.step) {
      this.setState({
        currentScope: newScope,
      })
    }
  }

  render() {
    return (
      <div className="map-wrapper">
        <div className="event-map">
          {this.gridElems}
        </div>
        <div className="event-map__controls">
          <button type="button" onClick={this.scopeIn}>+</button>
          <input type="range" min="1" max="5" id="size" value="3" />
          <button type="button" onClick={this.scopeOut}>-</button>
        </div>
      </div>
    )
  }
}
