import React, { Component, PropTypes } from 'react';
import Icon from 'Components/Icon';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import styles from './FilterMenu.css';

class FilterMenu extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <Menu>
        <MenuButton>
          <Icon name="icon-sonarr-filter" className={styles.filterMenuButtonIcon} />
          <span className={styles.filterMenuButtonText}>Filter</span>
        </MenuButton>
          {children}
      </Menu>
    );
  }
}

FilterMenu.propTypes = {
  children: PropTypes.node.isRequired
};

export default FilterMenu;
