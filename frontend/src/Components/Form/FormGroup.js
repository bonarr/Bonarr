import React, { PropTypes } from 'react';
import styles from './FormGroup.css';

function FormGroup({ children, ...otherProps }) {
  return (
    <div {...otherProps}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired
};

FormGroup.defaultProps = {
  className: styles.group
};

export default FormGroup;
