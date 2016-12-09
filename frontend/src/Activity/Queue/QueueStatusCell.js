import React, { PropTypes } from 'react'
import { tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import Popover from 'Components/Tooltip/Popover';
import styles from './QueueStatusCell.css';

function getDetailedPopoverBody(statusMessages) {
  return (
    <div>
      {
        statusMessages.map(({ title, messages }) => {
          return (
            <div key={title}>
              {title}
              <ul>
                {
                  messages.map((message) => {
                    return (
                      <li key={message}>
                        {message}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        })
      }
    </div>
  );
}

function QueueStatusCell(props) {
  const {
    sourceTitle,
    status,
    trackedDownloadStatus = 'ok',
    statusMessages
  } = props;

  const hasWarning = trackedDownloadStatus === 'warning';
  const hasError = trackedDownloadStatus === 'error';

  // status === 'downloading'
  let iconName = 'icon-sonarr-downloading';
  let title = 'Downloading';

  if (status === 'queued') {
    iconName = 'icon-sonarr-queued';
    title = 'Queued';
  }

  if (status === 'completed') {
    iconName = 'icon-sonarr-downloaded';
    title = 'Downloaded';
  }

  if (status === 'pending') {
    iconName = 'icon-sonarr-pending';
    title = 'Pending';
  }

  if (status === 'failed') {
    iconName = 'icon-sonarr-download-failed';
    title = 'Download failed';
  }

  if (status === 'warning') {
    iconName = 'icon-sonarr-download-warning';
    title = 'Download warning: check download client for more details';
  }

  if (hasError) {
    if (status === 'completed') {
      iconName = 'icon-sonarr-import-failed';
      title = `Import failed: ${sourceTitle}`;
    } else {
      iconName = 'icon-sonarr-download-failed';
      title = 'Download failed';
    }
  }

  return (
    <TableRowCell className={styles.status}>
      <Popover
        anchor={
          <Icon
            className={hasWarning ? styles.warning : null}
            name={iconName}
          />
        }
        title={title}
        body={hasWarning || hasError ? getDetailedPopoverBody(statusMessages) : sourceTitle}
        position={tooltipPositions.RIGHT}
      />
    </TableRowCell>
  );
}

QueueStatusCell.propTypes = {
  sourceTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  trackedDownloadStatus: PropTypes.string,
  statusMessages: PropTypes.arrayOf(PropTypes.object)
};

export default QueueStatusCell;
