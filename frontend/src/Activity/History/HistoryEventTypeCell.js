import React, { PropTypes } from 'react';
import Icon from 'Components/Icon';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './HistoryEventTypeCell.css';

function getIconName(eventType) {
  switch (eventType) {
    case 'grabbed':
      return 'icon-sonarr-downloading';
    case 'seriesFolderImported':
      return 'icon-sonarr-hdd';
    case 'downloadFolderImported':
      return 'icon-sonarr-imported';
    case 'downloadFailed':
      return 'icon-sonarr-download-failed';
    case 'episodeFileDeleted':
      return 'icon-sonarr-deleted';
    default:
      return 'icon-sonarr-unknown';
  }
}

function getTooltip(eventType, data) {
  switch (eventType) {
    case 'grabbed':
      return `Episode grabbed from ${data.indexer} and sent to ${data.downloadClient}`;
    case 'seriesFolderImported':
      return 'Episode downloaded successfully and picked up from download client';
    case 'downloadFolderImported':
      return 'Episode download failed';
    case 'downloadFailed':
      return 'Episode file deleted';
    case 'episodeFileDeleted':
      return '';
    default:
      return 'Unknown event';
  }
}

function HistoryEventTypeCell({ eventType, data }) {
  const iconName = getIconName(eventType);
  const tooltip = getTooltip(eventType, data);

  return (
    <TableRowCell
      className={styles.cell}
      title={tooltip}
    >
      <Icon name={iconName} />
    </TableRowCell>
  );
}

HistoryEventTypeCell.propTypes = {
  eventType: PropTypes.string.isRequired,
  data: PropTypes.object
};

HistoryEventTypeCell.defaultProps = {
  data: {}
};

export default HistoryEventTypeCell;
