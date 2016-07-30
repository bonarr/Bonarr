import React, { Component, PropTypes } from 'react';

class TableBody extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <tbody>{children}</tbody>
    );
  }

}

TableBody.propTypes = {
  children: PropTypes.node
};

export default TableBody;
