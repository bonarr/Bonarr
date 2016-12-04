import React from 'react';
import Link from 'Components/Link';
import TableRow from './TableRow';

function TableRowButton(props) {
  return (
    <Link
      component={TableRow}
      {...props}
    />
  );
}

export default TableRowButton;
