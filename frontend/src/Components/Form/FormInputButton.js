import React, { Component, PropTypes } from 'react';
import Button from 'Components/Button';
import * as kinds from 'Helpers/kinds';
import styles from './FormInputButton.css';

class FormInputButton extends Component {

  //
  // Render

  render() {
    return (
      <Button
        kind={kinds.PRIMARY}
        {...this.props}
      />
    );
  }

}

FormInputButton.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node
};

FormInputButton.defaultProps = {
  className: styles.button
};

export default FormInputButton;
