import React, { Component, PropTypes } from 'react';
import CheckInput from 'Components/Form/CheckInput';
import TableHeaderCell from './TableHeaderCell';
import styles from './TableSelectAllHeaderCell.css';

function getValue(allSelected, allUnselected) {
  if (allSelected) {
    return true;
  } else if (allUnselected) {
    return false;
  }

  return null;
}

class TableSelectAllHeaderCell extends Component {

  //
  // Render

  render() {
    const {
      allSelected,
      allUnselected,
      onSelectAllChange
    } = this.props;

    const value = getValue(allSelected, allUnselected);

    return (
      <TableHeaderCell
        className={styles.selectAllHeaderCell}
        name="selectAll"
      >
        <CheckInput
          className={styles.input}
          name="selectAll"
          value={value}
          onChange={onSelectAllChange}
        />
      </TableHeaderCell>
    );
  }
}

TableSelectAllHeaderCell.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func.isRequired
};

export default TableSelectAllHeaderCell;
