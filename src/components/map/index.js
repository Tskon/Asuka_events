import React from 'react'
import '../../scss/map/map.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cols: 8,
      rows: 6,
    }

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

  render() {
    return (
      <div className="map-wrapper">
        <div className="event-map">
          {this.gridElems}
        </div>
      </div>
    )
  }
}
