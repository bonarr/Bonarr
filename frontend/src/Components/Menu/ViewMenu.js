import React, { Component, PropTypes } from 'react';
import Menu from 'Components/Menu/Menu';
import ToolbarMenuButton from 'Components/Menu/ToolbarMenuButton';

class ViewMenu extends Component {

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
          iconName="icon-sonarr-view"
          text="View"
        />
          {children}
      </Menu>
    );
  }
}

ViewMenu.propTypes = {
  className: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default ViewMenu;
