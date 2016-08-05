import React, { Component, PropTypes } from 'react';
import longDateTime from 'Utilities/Date/longDateTime';
import relativeDate from 'Utilities/Date/relativeDate';
import Link from 'Components/Link';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/TableRowCell';
import styles from './LogFilesTableRow.css';

class LogFilesTableRow extends Component {

  //
  // Render

  render() {
    const {
      filename,
      lastWriteTime,
      downloadUrl
    } = this.props;

    return (
      <TableRow>
        <TableRowCell>{filename}</TableRowCell>

        <TableRowCell
          className={styles.time}
          title={longDateTime(lastWriteTime)}
        >
          {relativeDate(lastWriteTime)}
        </TableRowCell>

        <TableRowCell
          className={styles.download}
        >
          <Link
            to={downloadUrl}
            target="_blank"
          >
            Download
          </Link>
        </TableRowCell>
      </TableRow>
    );
  }

}

LogFilesTableRow.propTypes = {
  filename: PropTypes.string.isRequired,
  lastWriteTime: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string.isRequired
};

export default LogFilesTableRow;
