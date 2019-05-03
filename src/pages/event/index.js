import React from 'react'
import '../../scss/pages/about.scss'

import Map from '../../components/map/index'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="event-wrapper">
        <Map />
      </div>
    )
  }
}
