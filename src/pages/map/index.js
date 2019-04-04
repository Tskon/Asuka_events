import React from 'react'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      map: {},
    }
  }

  componentDidMount() {
    ymaps.ready(
      () => {
        this.map = new ymaps.Map('map', {
          center: [55.76, 37.64],
          zoom: 7,
          controls: ['zoomControl'],
          type: 'yandex#map',
        },
        {
          maxZoom: 7,
          minZoom: 5,
        })
      },
    )
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
