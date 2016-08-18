import React, { PropTypes } from 'react';
import styles from './FormInputGroup.css';

function FormInputGroup({ children, ...otherProps }) {
  return (
    <div {...otherProps}>
      {children}
    </div>
  );
}

FormInputGroup.propTypes = {
  children: PropTypes.node.isRequired
};

FormInputGroup.defaultProps = {
  className: styles.inputGroup
};

export default FormInputGroup;
