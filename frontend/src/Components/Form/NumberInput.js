import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import styles from './NumberInput.css';

class NumberInput extends Component {

  //
  // Listeners

  @autobind
  onChange(event) {
    this.props.onChange({
      name: this.props.name,
      value: parseInt(event.target.value)
    });
  }

  //
  // Render

  render() {
    const {
      className,
      name,
      value,
      hasError,
      hasWarning,
      hasButton
    } = this.props;

    return (
      <input
        className={classNames(
          className,
          hasError && styles.hasError,
          hasWarning && styles.hasWarning,
          hasButton && styles.hasButton
        )}
        type="number"
        name={name}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

NumberInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasButton: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

NumberInput.defaultProps = {
  className: styles.number
};

export default NumberInput;
