import React, { Component, PropTypes } from 'react';

class TableRowCell extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <td>{children}</td>
    );
  }

}

TableRowCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default TableRowCell
