import React, { Component, PropTypes } from 'react';

class TableHeaderCell extends Component {

  //
  // Render

  render() {
    const {
      className,
      label,
      ...otherProps
    } = this.props;

    return (
      <th
        className={className}
        {...otherProps}
      >
        {label}
      </th>
    );
  }
}

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
};

export default TableHeaderCell;
