import React, { Component, PropTypes } from 'react';

class TableRowCell extends Component {

  //
  // Render

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    return (
      <td {...otherProps}>{children}</td>
    );
  }

}

TableRowCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default TableRowCell
