import moment from 'moment';
import React, { PropTypes } from 'react';
import formatTime from 'Utilities/Date/formatTime';
import isSameWeek from 'Utilities/Date/isSameWeek';
import isToday from 'Utilities/Date/isToday';
import isTomorrow from 'Utilities/Date/isTomorrow';
import formatBytes from 'Utilities/Number/formatBytes';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './TimeleftCell.css';

function getDate(date, shortDateFormat, showRelativeDates) {
  if (!showRelativeDates) {
    return moment(date).format(shortDateFormat);
  }

  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  if (isSameWeek(date)) {
    return moment(date).format('dddd');
  }

  return moment(date).format(shortDateFormat);
}

function TimeleftCell(props) {
  const {
    estimatedCompletionTime,
    timeleft,
    status,
    size,
    sizeleft,
    showRelativeDates,
    shortDateFormat,
    timeFormat
  } = props;

  if (status === 'pending') {
    const date = getDate(estimatedCompletionTime, shortDateFormat, showRelativeDates);
    const time = formatTime(estimatedCompletionTime, timeFormat, { includeMinuteZero: true });

    return (
      <TableRowCell
        className={styles.timeleft}
        title={`Delaying download until ${date} at ${time}`}
      >
        -
      </TableRowCell>
    );
  }

  if (!timeleft) {
    return (
      <TableRowCell className={styles.timeleft}>
        -
      </TableRowCell>
    );
  }

  const totalSize = formatBytes(size);
  const remainingSize = formatBytes(sizeleft);

  return (
    <TableRowCell
      className={styles.timeleft}
      title={`${remainingSize} / ${totalSize}`}
    >
      {timeleft}
    </TableRowCell>
  );
}

TimeleftCell.propTypes = {
  estimatedCompletionTime: PropTypes.string,
  timeleft: PropTypes.string,
  status: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  sizeleft: PropTypes.number.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default TimeleftCell;
