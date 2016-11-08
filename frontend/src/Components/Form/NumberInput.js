import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput';

class NumberInput extends Component {

  //
  // Listeners

  onChange = ({ name, value }) => {
    this.props.onChange({
      name,
      value: value ? (value) : null
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
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

NumberInput.defaultProps = {
  value: null
};

export default NumberInput;
