import React, { Component, PropTypes } from 'react';

class TableHeaderCell extends Component {

  //
  // Render

  render() {
    const {
      className,
      label
    } = this.props;

    return (
      <th className={className}>{label}</th>
    );
  }

}

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
};

export default TableHeaderCell
