import React, { Component, PropTypes } from 'react';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';

class Table extends Component {

  //
  // Render

  render() {
    const {
      headers,
      children
    } = this.props;

    return (
      <table
        className="table table-hover"
      >
        <TableHeader>
          {
            headers.map((header) => {
              return (
                <TableHeaderCell
                  key={header.name}
                  {...header}
                />
              );
            })
          }
        </TableHeader>
        {children}
      </table>
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.array,
  children: PropTypes.node
};

export default Table
