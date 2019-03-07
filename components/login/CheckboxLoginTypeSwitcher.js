import { Component } from 'react'
import PropTypes from 'prop-types'

class CheckboxLoginTypeSwitcher extends Component {
  constructor(props) {
    super()
    this.onChange = props.onChange

    this.state = {
      checked: props.checked,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    const newState = { checked: !this.checked }

    this.setState(newState)

    this.onChange(!this.checked)
  }

  render() {
    return (
      <div className="rocker">
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.onChange}
        />
        <span className="switch-left"><span>Вход</span></span>
        <span className="switch-right"><span>Рега</span></span>
      </div>
    )
  }
}

CheckboxLoginTypeSwitcher.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}

CheckboxLoginTypeSwitcher.defaultProps = {
  onChange: () => {
  },
  checked: false,
}

export default CheckboxLoginTypeSwitcher
