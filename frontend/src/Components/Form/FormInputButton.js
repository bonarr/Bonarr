import React, { PropTypes } from 'react';
import Button from 'Components/Button';
import SpinnerButton from 'Components/SpinnerButton';
import { kinds } from 'Helpers/Props';
import styles from './FormInputButton.css';

function FormInputButton({ canSpin, ...otherProps }) {
  if (canSpin) {
    return (
      <SpinnerButton
        kind={kinds.PRIMARY}
        {...otherProps}
      />
    );
  }

  return (
    <Button
      kind={kinds.PRIMARY}
      {...otherProps}
    />
  );
}

FormInputButton.propTypes = {
  className: PropTypes.string.isRequired,
  canSpin: PropTypes.bool.isRequired
};

FormInputButton.defaultProps = {
  className: styles.button,
  canSpin: false
};

export default FormInputButton;
