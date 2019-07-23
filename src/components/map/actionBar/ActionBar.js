import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from "@material-ui/core/styles"
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import themes from '../../../services/themes'
import {STAGES} from '../../../services/constants'

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
            <div className="map-action-bar">
              <p>Клетка {cell.id.toUpperCase()}</p>
              <p>Бонус: {cell.bonus}</p>
              <p>Соседние клетки: {cell.connectedCells.join(', ')}</p>
              {
                this.props.stage === STAGES.CHOOSE_START_SECTOR
                && cell.isStarted
                && <Button variant="contained" color="primary">Выбрать сектор стартовым</Button>
              }
            </div>
          </Drawer>
        </MuiThemeProvider>
      )
    }

    return <div />
  }
}

const mapStateToProps = state => ({
  cells: state.map.cells,
  stage: state.map.stage
})

export default connect(mapStateToProps)(ActionBar)