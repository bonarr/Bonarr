import React, { Component, PropTypes } from 'react';
import MenuItem from 'Components/Menu/MenuItem';

class AddIndexerPresetMenuItem extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onPress(this.props.preset);
  }

  //
  // Render

  render() {
    const {
      name,
      preset,
      ...otherProps
    } = this.props;

    return (
      <MenuItem
        {...otherProps}
        onPress={this.onPress}
      >
        {name}
      </MenuItem>
    );
  }
}

AddIndexerPresetMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  preset: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AddIndexerPresetMenuItem;
