import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './FormLabel.css';

function FormLabel({
  children,
  className,
  errorClassName,
  name,
  hasError,
  ...otherProps
}) {
  return (
    <label
      {...otherProps}
      className={classNames(className, hasError && errorClassName)}
      htmlFor={name}
    >
      {children}
    </label>
  );
}

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  name: PropTypes.string,
  hasError: PropTypes.bool
};

FormLabel.defaultProps = {
  className: styles.label,
  errorClassName: styles.hasError
};

export default FormLabel;
