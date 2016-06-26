import React, { Component, PropTypes } from 'react';

class TableRow extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <tr>{children}</tr>
    );
  }

}

TableRow.propTypes = {
  children: PropTypes.node
};

export default TableRow
