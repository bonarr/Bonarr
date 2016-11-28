import React, { Component, PropTypes } from 'react';
import { sortDirections } from 'Helpers/Props';
import Link from 'Components/Link';
import Icon from 'Components/Icon';
import styles from './TableHeaderCell.css';

class TableHeaderCell extends Component {

  //
  // Listeners

  onPress = () => {
    const {
      name,
      fixedSortDirection,
      sortPredicate
    } = this.props;

    if (fixedSortDirection) {
      this.props.onSortPress(name, fixedSortDirection, sortPredicate);
    } else {
      this.props.onSortPress(name, null, sortPredicate);
    }
  }

  //
  // Render

  render() {
    const {
      className,
      name,
      label,
      sortable,
      sortKey,
      sortDirection,
      fixedSortDirection,
      sortPredicate,
      children,
      onSortPress,
      ...otherProps
    } = this.props;

    const isSorting = sortable && sortKey === name;
    const sortIcon = sortDirection === sortDirections.ASCENDING ?
                     'icon-sonarr-sort-asc' :
                     'icon-sonarr-sort-desc';

    return (
      sortable ?
        <Link
          component="th"
          className={className}
          onPress={this.onPress}
          {...otherProps}
        >
          {children}

          {
            isSorting &&
              <Icon
                name={sortIcon}
                className={styles.sortIcon}
              />
          }
        </Link> :

        <th className={className}>
          {children}
        </th>
    );
  }
}

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sortable: PropTypes.bool,
  sortKey: PropTypes.string,
  fixedSortDirection: PropTypes.string,
  sortDirection: PropTypes.string,
  sortPredicate: PropTypes.func,
  children: PropTypes.node.isRequired,
  onSortPress: PropTypes.func
};

TableHeaderCell.defaultProps = {
  className: styles.headerCell,
  sortable: false
};

export default TableHeaderCell;
