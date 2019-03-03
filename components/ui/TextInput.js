import { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class TextInput extends Component {
  constructor(...props) {
    super()
    this.label = props.label
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
    this.setState({ value: e.target.value })
  }

  handleFocus() {
    const newState = { isFocused: true }
    this.setState(newState)
  }

  handleBloor() {
    const newState = {
      isFocused: false,
      isComleted: this.state.value === '',
    }
    if (this.state.value === '') newState.isComleted = false
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
        <label className="mat-label" htmlFor={this.name}>{this.label}
          <input
            type="text"
            className="mat-input"
            id={this.name}
            value={this.state.value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBloor}
          />
        </label>
      </div>
    )
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default TextInput
