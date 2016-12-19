import React, { PropTypes } from 'react';
import Link from './Link';
import Icon from './Icon';
import styles from './IconButton.css';

function IconButton({ className, name, ...otherProps }) {
  return (
    <Link
      className={className}
      {...otherProps}
    >
      <Icon
        name={name}
      />
    </Link>
  );
}

IconButton.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

IconButton.defaultProps = {
  className: styles.button
};

export default IconButton;
