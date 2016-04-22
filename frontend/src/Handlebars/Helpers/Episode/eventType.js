const moment = require('moment');
const handlebars = require('handlebars');

function eventTypeHelper() {
  const eventType = this.eventType;
  let icon;
  let tooltip;

  switch (eventType) {
    case 'grabbed':
      icon = 'icon-sonarr-downloading';
      tooltip = 'Episode grabbed from {0} and sent to {1}'.format(this.data.indexer, this.data.downloadClient);
      break;
    case 'seriesFolderImported':
      icon = 'icon-sonarr-hdd';
      tooltip = 'Existing episode file added to library';
      break;
    case 'downloadFolderImported':
      icon = 'icon-sonarr-imported';
      tooltip = 'Episode downloaded successfully and picked up from download client';
      break;
    case 'downloadFailed':
      icon = 'icon-sonarr-download-failed';
      tooltip = 'Episode download failed';
      break;
    case 'episodeFileDeleted':
      icon = 'icon-sonarr-deleted';
      tooltip = 'Episode file deleted';
      break;
    default:
      icon = 'icon-sonarr-unknown';
      tooltip = 'unknown event';
  }

  return new handlebars.SafeString(`<i class="${icon}" title="${tooltip}" data-placement="right"/>`);
}

module.exports = eventTypeHelper;
