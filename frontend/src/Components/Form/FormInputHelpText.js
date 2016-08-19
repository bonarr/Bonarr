import React, { PropTypes } from 'react';
import classNames from 'classNames';
import styles from './FormInputHelpText.css';

function FormInputHelpText({ className, text, isError, isWarning }) {
  return (
    <div className={classNames(
      className,
      isError && styles.isError,
      isWarning && styles.isWarning
    )}>
      {text}
    </div>
  );
}

FormInputHelpText.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  isWarning: PropTypes.bool
};

FormInputHelpText.defaultProps = {
  className: styles.helpText,
  isError: false,
  isWarning: false
};

export default FormInputHelpText;
