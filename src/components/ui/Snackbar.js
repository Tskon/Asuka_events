import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

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
        <span id="client-snackbar">
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
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

MySnackbarContent.defaultProps = {
  onClose: () => {},
}

class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick() {
    this.setState({ open: true })
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>
          Open success snackbar
        </Button>
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
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
}

CustomizedSnackbars.defaultProps = {
  type: 'info',
}

export default CustomizedSnackbars
