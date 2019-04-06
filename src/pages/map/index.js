import React from 'react'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      map: {},
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Map</h1>
        <div
          id="map"
          style={{
            width: '100%',
            height: '600px',
          }}
        />
      </div>
    )
  }
}
