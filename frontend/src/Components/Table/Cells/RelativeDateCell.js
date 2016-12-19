import React, { PropTypes } from 'react';
import formatDateTime from 'Utilities/Date/formatDateTime';
import getRelativeDate from 'Utilities/Date/getRelativeDate';
import TableRowCell from './TableRowCell';
import styles from './relativeDateCell.css';

function RelativeDateCell(props) {
  const {
    className,
    date,
    includeSeconds,
    showRelativeDates,
    shortDateFormat,
    longDateFormat,
    timeFormat
  } = props;

  if (!date) {
    return <TableRowCell className={className} />;
  }

  return (
    <TableRowCell
      className={className}
      title={formatDateTime(date, longDateFormat, timeFormat, { includeSeconds })}
    >
      {getRelativeDate(date, shortDateFormat, showRelativeDates, { timeFormat, includeSeconds, timeForToday: true })}
    </TableRowCell>
  );
}

RelativeDateCell.propTypes = {
  className: PropTypes.string.isRequired,
  date: PropTypes.string,
  includeSeconds: PropTypes.bool.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};

RelativeDateCell.defaultProps = {
  className: styles.cell,
  includeSeconds: false
};

export default RelativeDateCell;
