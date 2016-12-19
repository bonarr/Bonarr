import React, { Component, PropTypes } from 'react';
import { sortDirections } from 'Helpers/Props';
import SelectedMenuItem from './SelectedMenuItem';

class SortMenuItem extends Component {

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
      sortKey,
      sortDirection,
      ...otherProps
    } = this.props;

    const isSelected = name === sortKey;

    return (
      <SelectedMenuItem
        selectedIconName={sortDirection === sortDirections.ASCENDING ? 'icon-sonarr-sort-asc' : 'icon-sonarr-sort-desc'}
        isSelected={isSelected}
        {...otherProps}
        onPress={this.onPress}
      />
    );
  }
}

SortMenuItem.propTypes = {
  name: PropTypes.string,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  onPress: PropTypes.func.isRequired
};

SortMenuItem.defaultProps = {
  name: null
};

export default SortMenuItem;
