import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { kinds } from 'Helpers/Props'; 
import styles from './Label.css';

function Label({ className, kind, children, ...otherProps }) {
  return (
    <div
      className={classNames(
        className,
        styles[kind]
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}

Label.propTypes = {
  className: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(kinds.all).isRequired,
  children: PropTypes.node.isRequired
};

Label.defaultProps = {
  className: styles.label,
  kind: kinds.DEFAULT
};

export default Label;
