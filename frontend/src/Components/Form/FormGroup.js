import React, { PropTypes } from 'react';
import styles from './FormGroup.css';

function FormGroup({ className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

FormGroup.defaultProps = {
  className: styles.group
};

export default FormGroup;
