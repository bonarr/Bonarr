import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Icon from 'Components/Icon';
import MenuItem from './MenuItem';
import styles from './FilterMenuItem.css';

class FilterMenuItem extends Component {

  //
  // Listeners

  @autobind
  onPress() {
    const {
      name,
      value,
      onPress
    } = this.props;

    onPress(name, value);
  }

  //
  // Render

  render() {
    const {
      children,
      name,
      value,
      filterKey,
      filterValue,
      ...otherProps
    } = this.props;

    const isActive = name === filterKey && value === filterValue;

    return (
      <MenuItem
        {...otherProps}
        onPress={this.onPress}
      >
        {children}

        {
          isActive &&
            <Icon name="icon-sonarr-check" className={styles.activeIcon} />
        }
      </MenuItem>
    );
  }
}

FilterMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  filterKey: PropTypes.string,
  filterValue: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default FilterMenuItem;
