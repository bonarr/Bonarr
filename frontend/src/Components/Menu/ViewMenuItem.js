import React, { Component, PropTypes } from 'react';
import SelectedMenuItem from './SelectedMenuItem';

class ViewMenuItem extends Component {

  //
  // Listeners

  onPress = () => {
    const {
      name,
      onPress
    } = this.props;

    onPress(name);
  }

  //
  // Render

  render() {
    const {
      name,
      view,
      ...otherProps
    } = this.props;

    const isSelected = name === view;

    return (
      <SelectedMenuItem
        isSelected={isSelected}
        {...otherProps}
        onPress={this.onPress}
      />
    );
  }
}

ViewMenuItem.propTypes = {
  name: PropTypes.string,
  view: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ViewMenuItem;
