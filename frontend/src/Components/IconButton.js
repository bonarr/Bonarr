import React, { PropTypes } from 'react';
import Button from './Button';
import Icon from './Icon';
import styles from './IconButton.css';

function IconButton({ className, name, ...otherProps }) {
  return (
    <Button
      className={styles.button}
      {...otherProps}
    >
      <Icon
        name={name}
      />
    </Button>
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
