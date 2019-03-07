import { Component } from 'react'
import PropTypes from 'prop-types'

class CheckboxLoginTypeSwitcher extends Component {
  constructor(props) {
    super()
    this.onChange = props.onChange

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.onChange(!this.checked)
  }

  render() {
    return (
      <label htmlFor="CheckboxLoginTypeSwitcher" className="rocker">
        <input
          id="CheckboxLoginTypeSwitcher"
          type="checkbox"
          onChange={this.handleChange}
        />
        <span className="switch-left"><span>Вход</span></span>
        <span className="switch-right"><span>Рега</span></span>
      </label>
    )
  }
}

CheckboxLoginTypeSwitcher.propTypes = {
  onChange: PropTypes.func,
}

CheckboxLoginTypeSwitcher.defaultProps = {
  onChange: () => {
  },
}

export default CheckboxLoginTypeSwitcher
