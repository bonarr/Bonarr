const Backbone = require('backbone');
const Handlebars = require('handlebars');
const moment = require('moment');
const reqres = require('reqres');
const FormatHelpers = require('Shared/FormatHelpers');
const QueueCollection = require('Activity/Queue/QueueCollection');

function getFile(episode) {
  const hasFile = episode.hasFile;

  if (hasFile) {
    let episodeFile;

    if (reqres.hasHandler(reqres.Requests.GetEpisodeFileById)) {
      episodeFile = reqres.request(reqres.Requests.GetEpisodeFileById, episode.episodeFileId);
    } else if (this.episodeFile) {
      episodeFile = new Backbone.Model(this.episodeFile);
    }

    if (episodeFile) {
      return episodeFile;
    }
  }
}

function episodeFileInfo(episodeFile) {
  const quality = episodeFile.quality;
  const revision = quality.revision;
  const size = FormatHelpers.bytes(episodeFile.size);
  let title = 'Episode downloaded';
  let className = 'badge';

  if (revision.real && revision.real > 0) {
    title += '[REAL]';
  }

  if (revision.version && revision.version > 1) {
    title += ' [PROPER]';
  }

  if (size !== '') {
    title += ` - ${size}`;
  }

  if (episodeFile.qualityCutoffNotMet) {
    className += ' badge-inverse';
  }

  return `<span class="${className}" title="${title}">${quality.quality.name}</span>`;
}

function episodeInfo(episode) {
  const hasAired = moment(episode.airDateUtc).isBefore(moment());
  const downloading = QueueCollection.findEpisode(episode.id);
  let icon;
  let tooltip;

  if (downloading) {
    var progress = 100 - (downloading.get('sizeleft') / downloading.get('size') * 100);

    if (progress === 0) {
      icon = 'icon-sonarr-downloading';
      tooltip = 'Episode is downloading';
    } else {
      const progress = `<div class="progress" title="Episode is downloading - ${progress.toFixed(1)}% ${downloading.get('title')}">`;
      const progressBar = `<div class="progress-bar progress-bar-purple" style="width: ${progress}%;"></div></div>`;

      return `${progress}${progressBar}`;
    }
  } else if (episode.grabbed) {
    icon = 'icon-sonarr-downloading';
    tooltip = 'Episode is downloading';
  } else if (!episode.airDateUtc) {
    icon = 'icon-sonarr-tba';
    tooltip = 'TBA';
  } else if (hasAired) {
    icon = 'icon-sonarr-missing';
    tooltip = 'Episode missing from disk';
  } else {
    icon = 'icon-sonarr-not-aired';
    tooltip = 'Episode has not aired';
  }

  return `<i class="${icon}" title="${tooltip}"></i>`;
}

const episodeStatus = function() {
  const episodeFile = getFile(this);

  if (episodeFile) {
    return new Handlebars.SafeString(episodeFileInfo(episodeFile));
  }

  const ei = episodeInfo(this);
  const test = 1;
  return new Handlebars.SafeString(episodeInfo(this));
};

module.exports = episodeStatus;
