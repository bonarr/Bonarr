import moment from 'moment';
import React, { PropTypes } from 'react';
import formatDateTime from 'Utilities/Date/formatDateTime';
import formatTime from 'Utilities/Date/formatTime';
import isSameWeek from 'Utilities/Date/isSameWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import TableRowCell from './TableRowCell';
import styles from './relativeDateCell.css';

function getDate(date, shortDateFormat, timeFormat, showRelativeDates, includeSeconds) {
  if (!showRelativeDates) {
    return moment(date).format(shortDateFormat);
  }

  if (isToday(date)) {
    return formatTime(date, timeFormat, { includeMinuteZero: true, includeSeconds });
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  if (isSameWeek(date)) {
    return moment(date).format('dddd');
  }

  return moment(date).format(shortDateFormat);
}

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
      {getDate(date, shortDateFormat, timeFormat, showRelativeDates, includeSeconds)}
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
