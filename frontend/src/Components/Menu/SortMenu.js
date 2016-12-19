import React, { Component, PropTypes } from 'react';
import Menu from 'Components/Menu/Menu';
import ToolbarMenuButton from 'Components/Menu/ToolbarMenuButton';

import styles from './SortMenu.css';

class SortMenu extends Component {

  //
  // Render

  render() {
    const {
      className,
      children
    } = this.props;

    return (
      <Menu className={className}>
        <ToolbarMenuButton
          iconName="icon-sonarr-sort-by"
          text="Sort"
        />
          {children}
      </Menu>
    );
  }
}

SortMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default SortMenu;
