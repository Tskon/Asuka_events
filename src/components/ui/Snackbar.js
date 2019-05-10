import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import snackbarActions from '../../services/redux/actions/snackbarActions'
import store from '../../services/redux/store'
import '../../scss/ui/snackbar.scss'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

function MySnackbarContent(props) {
  const {
    message, onClose, variant, ...other
  } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className="snackbar__content">
          <Icon />
          {message}
        </span>
      )}

      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: this.props.open,
    }

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    store.dispatch(snackbarActions.closeSnackbar())
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContent
            class={`snackbar snackbar_${this.props.type}`}
            onClose={this.handleClose}
            variant={this.props.type}
            message={this.props.message}
          />
        </Snackbar>
      </div>
    )
  }
}

CustomizedSnackbars.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  type: state.snackbar.type,
  message: state.snackbar.message,
  open: state.snackbar.open,
})

export default connect(mapStateToProps)(CustomizedSnackbars)
