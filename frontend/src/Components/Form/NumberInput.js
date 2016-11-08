import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput';

class NumberInput extends Component {

  //
  // Listeners

  onChange = (event) => {
    this.props.onChange({
      name: this.props.name,
      value: parseInt(event.target.value)
    });
  }

  //
  // Render

  render() {
    const {
      ...otherProps
    } = this.props;

    return (
      <TextInput
        type="number"
        {...otherProps}
        onChange={this.onChange}
      />
    );
  }
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

NumberInput.defaultProps = {
  value: 0
};

export default NumberInput;
