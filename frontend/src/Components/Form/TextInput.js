import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import styles from './TextInput.css';

class TextInput extends Component {

  //
  // Listeners

  onChange = (event) => {
    this.props.onChange({
      name: this.props.name,
      value: event.target.value
    });
  }

  //
  // Render

  render() {
    const {
      type,
      readOnly,
      className,
      placeholder,
      name,
      value,
      hasError,
      hasWarning,
      hasButton,
      onFocus
    } = this.props;

    return (
      <input
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        className={classNames(
          className,
          hasError && styles.hasError,
          hasWarning && styles.hasWarning,
          hasButton && styles.hasButton
        )}
        name={name}
        value={value}
        onChange={this.onChange}
        onFocus={onFocus}
      />
    );
  }
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasButton: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func
};

TextInput.defaultProps = {
  type: 'text',
  readOnly: false,
  className: styles.text,
  value: ''
};

export default TextInput;
