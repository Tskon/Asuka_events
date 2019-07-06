import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'

export default class ActionBar extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Drawer
        open={this.props.show}
        onClose={this.props.closeHandler}
        anchor="right"
      >
        lorem asfdasd asdas dad
      </Drawer>
    )
  }
}