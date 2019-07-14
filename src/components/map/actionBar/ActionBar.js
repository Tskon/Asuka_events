import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from "@material-ui/core/styles"
import themes from '../../../services/themes'
import {connect} from "react-redux"

class ActionBar extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired,
    selectedCell: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    if (this.props.cells && this.props.cells[this.props.selectedCell]) {
      const cell = this.props.cells[this.props.selectedCell]

      return (
        <MuiThemeProvider theme={themes.dark}>
          <Drawer
            open={this.props.show}
            onClose={this.props.closeHandler}
            anchor="right"
          >
            <div className="cell-info">
              <p>Клетка {cell.id.toUpperCase()}</p>
              <p>Бонус: {cell.bonus}</p>
              <p>Соседние клетки: {cell.connectedCells.join(', ')}</p>
            </div>
          </Drawer>
        </MuiThemeProvider>
      )
    }

    return <div />
  }
}

const mapStateToProps = state => ({
  cells: state.map.cells
})

export default connect(mapStateToProps)(ActionBar)