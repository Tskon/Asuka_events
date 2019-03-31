import React from 'react'
import '../../scss/map/map.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      blocsNumInRow: 8,
      blocsNumInCol: 6,
    }

    this.gridElems = []
    for (let i = 0; i < this.state.blocsNumInRow * this.state.blocsNumInCol; i += 1) {
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
