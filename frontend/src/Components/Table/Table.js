import React, { Component, PropTypes } from 'react';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';

class Table extends Component {

  //
  // Render

  render() {
    const {
      className,
      selectAll,
      headers,
      children,
      onSortPress
    } = this.props;

    return (
      <table
        className={className}
      >
        <TableHeader>
          {
            selectAll &&
              <TableHeaderCell
                key="selectAll"
                name="selectAll"
              />
          }

          {
            headers.map((header) => {
              return (
                <TableHeaderCell
                  key={header.name}
                  onSortPress={onSortPress}
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
  selectAll: PropTypes.bool.isRequired,
  headers: PropTypes.array,
  children: PropTypes.node,
  onSortPress: PropTypes.func
};

Table.defaultProps = {
  className: 'table table-hover',
  selectAll: false
};

export default Table;
