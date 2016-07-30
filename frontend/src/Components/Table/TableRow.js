import React, { Component, PropTypes } from 'react';

class TableRow extends Component {

  //
  // Render

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    return (
      <tr
        {...otherProps}
      >
        {children}
      </tr>
    );
  }

}

TableRow.propTypes = {
  children: PropTypes.node
};

export default TableRow;
