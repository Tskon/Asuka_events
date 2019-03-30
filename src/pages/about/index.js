import React from 'react'

export default class About extends React.Component {
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
      <div>
        <h1 className="event-header">WoWs amateur`s event</h1>
        <div className="event-map">
          { this.gridElems }
        </div>
      </div>
    )
  }
}
