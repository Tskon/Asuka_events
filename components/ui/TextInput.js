import { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor(props) {
    super()
    this.label = props.labelText
    this.name = props.name

    this.state = {
      value: '',
      isFocused: false,
      isCompleted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBloor = this.handleBloor.bind(this)
  }

  handleChange(e) {
    const newState = {
      value: e.target.value,
      isCompleted: e.target.value !== '',
    }
    this.setState(newState)
  }

  handleFocus() {
    const newState = { isFocused: true }
    this.setState(newState)
  }

  handleBloor() {
    const newState = {
      isFocused: false,
      isCompleted: this.state.value !== '',
    }
    this.setState(newState)
  }

  render() {
    const wrapperStyles = classNames(
      'mat-div',
      {
        'is-active': this.state.isFocused,
        'is-completed': this.state.isCompleted,
      },
    )

    return (
      <div className={wrapperStyles}>
        <span className="mat-label">{this.label}</span>
        <input
          type="text"
          className="mat-input"
          id={this.name}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBloor}
        />
      </div>
    )
  }
}

TextInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default TextInput
