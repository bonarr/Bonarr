import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import MenuContent from 'Components/Menu/MenuContent';
import MenuItem from 'Components/Menu/MenuItem';

class LogsNavMenu extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isMenuOpen: false
    };
  }

  //
  // Listeners

  @autobind
  onMenuButtonPress() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  @autobind
  onMenuItemPress() {
    this.setState({ isMenuOpen: false });
  }

  //
  // Render

  render() {
    const {
      current
    } = this.props;

    return (
      <Menu>
        <MenuButton
          onPress={this.onMenuButtonPress}
        >
          {current}
        </MenuButton>
        <MenuContent
          isOpen={this.state.isMenuOpen}
        >
          <MenuItem
            to={'system/logs'}
          >
            Logs
          </MenuItem>

          <MenuItem
            to={'system/logs/files'}
          >
            Log Files
          </MenuItem>

          <MenuItem
            to={'system/logs/update'}
          >
            Update Logs
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

LogsNavMenu.propTypes = {
  current: PropTypes.string.isRequired
};

export default LogsNavMenu;
