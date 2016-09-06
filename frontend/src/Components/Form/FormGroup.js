import React, { PropTypes } from 'react';
import classNames from 'classNames';
import sizes from 'Utilities/sizes';
import styles from './FormGroup.css';

function FormGroup({ className, children, size }) {
  return (
    <div className={classNames(
      className,
      styles[size]
    )}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired
};

FormGroup.defaultProps = {
  className: styles.group,
  size: sizes.SMALL
};

export default FormGroup;
