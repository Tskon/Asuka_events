import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.label = props.labelText
    this.name = props.name
    this.onChangeHandler = props.onChange
    this.isRequired = props.required
    this.type = props.type || 'text'

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
    this.onChangeHandler(e.target.value)
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
      'ui-text-input',
      {
        'ui-text-input_active': this.state.isFocused,
        'ui-text-input_completed': this.state.isCompleted,
      },
    )

    return (
      <div className={wrapperStyles}>
        <span className="ui-text-input__label">{this.label}</span>
        <input
          type={this.type}
          className="ui-text-input__input"
          id={this.name}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBloor}
          required={this.isRequired}
        />
      </div>
    )
  }
}

TextInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

TextInput.defaultProps = {
  onChange: () => {
  },
  required: false,
}

export default TextInput
