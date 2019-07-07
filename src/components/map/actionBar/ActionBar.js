import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import {createMuiTheme} from "@material-ui/core"
import {MuiThemeProvider} from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: { main: '#fdc073' },
    secondary: { main: '#498161' },
  },
})

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
      <MuiThemeProvider theme={theme}>
        <Drawer
          open={this.props.show}
          onClose={this.props.closeHandler}
          anchor="right"
        >
          lorem asfdasd asdas dad
        </Drawer>
      </MuiThemeProvider>
    )
  }
}