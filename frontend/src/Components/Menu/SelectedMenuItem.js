import React, { PropTypes } from 'react';
import Icon from 'Components/Icon';
import MenuItem from './MenuItem';
import styles from './SelectedMenuItem.css';

function SelectedMenuItem(props) {
  const {
    children,
    selectedIconName,
    isSelected,
    ...otherProps
  } = props;

  return (
    <MenuItem
      {...otherProps}
    >
      <div className={styles.item}>
        {children}

        <Icon
          className={isSelected ? styles.isSelected : styles.isNotSelected}
          name={selectedIconName}
        />
      </div>
    </MenuItem>
  );
}

SelectedMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  selectedIconName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
};

SelectedMenuItem.defaultProps = {
  selectedIconName: 'icon-sonarr-check'
};

export default SelectedMenuItem;
