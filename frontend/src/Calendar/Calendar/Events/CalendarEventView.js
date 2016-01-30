var $ = require('jquery');
var vent = require('vent');
var moment = require('moment');
var Marionette = require('marionette');
var QueueCollection = require('Activity/Queue/QueueCollection');

require('jquery.easypiechart');

module.exports = Marionette.ItemView.extend({
  template: 'Calendar/Calendar/Events/CalendarEventView',
  className: 'calendar-event',

  events: {
    'click': '_showEpisodeDetails'
  },

  ui: {
    downloadProgress: '.download-progress'
  },

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(QueueCollection, 'sync', this._onQueueUpdated);
  },

  serializeData() {
    var seriesTitle = this.model.get('series').title;
    var start = this.model.get('airDateUtc');
    var end = this._getEndTime();
    var statusLevel = this._getStatusLevel();
    var queueDetails = this._getQueueDetails();
    var downloading = queueDetails || this.model.get('grabbed');
    var missingAbsoluteNumber = this.model.get('series').seriesType === 'anime' && this.model.get('seasonNumber') > 0 && !this.model.has('absoluteEpisodeNumber');

    return {
      seriesTitle,
      start,
      end,
      statusLevel,
      queueDetails,
      downloading,
      missingAbsoluteNumber
    };
  },

  onRender() {
    this.$el.addClass(this._getStatusLevel());

    this.ui.downloadProgress.easyPieChart({
      barColor   : '#7932ea',
      trackColor : false,
      scaleColor : false,
      lineWidth  : 2,
      size       : 14,
      animate    : false
    });
  },

  _getQueueDetails() {
    var queueItem = QueueCollection.findEpisode(this.model.get('id'));

    if (queueItem) {
      var progress = (100 - queueItem.get('sizeleft') / queueItem.get('size') * 100).toFixed(1);
      var releaseTitle = queueItem.get('title');
      var estimatedCompletionTime = moment(queueItem.get('estimatedCompletionTime')).fromNow();
      var status = queueItem.get('status').toLocaleLowerCase();
      var errorMessage = queueItem.get('errorMessage');
      var message = errorMessage;
      var downloading = false;
      var pending = status === 'pending';
      var completed = status === 'completed';
      var failed = status === 'failed';
      var warning = status === 'warning';

      if (pending) {
        message = `Release will be processed ${estimatedCompletionTime}`;
      } else if (errorMessage) {
        if (completed) {
          failed = true;
          message = `Import failed: ${errorMessage}`;
        } else {
          failed = true;
          message = `Download failed: ${errorMessage}`;
        }
      } else if (failed) {
        message = 'Download failed: check download client for more details';
      } else if (warning) {
        message = 'Download warning: check download client for more details';
      } else {
        downloading = true;
      }

      return {
        progress,
        releaseTitle,
        estimatedCompletionTime,
        status,
        message,
        pending,
        completed,
        failed,
        warning,
        downloading
      };
    }
  },

  _showEpisodeDetails() {
    vent.trigger(vent.Commands.ShowEpisodeDetails, { episode: this.model });
  },

  _getEndTime() {
    var start = this.model.get('airDateUtc');
    var runtime = this.model.get('series').runtime;

    return moment(start).add('minutes', runtime).toISOString();
  },

  _getStatusLevel() {
    var hasFile = this.model.get('hasFile');
    var downloading = QueueCollection.findEpisode(this.model.get('id')) || this.model.get('grabbed');
    var currentTime = moment();
    var start = moment(this.model.get('airDateUtc'));
    var end = moment(this._getEndTime());
    var monitored = this.model.get('series').monitored && this.model.get('monitored');

    var statusLevel = 'primary';

    if (hasFile) {
      statusLevel = 'success';
    } else if (downloading) {
      statusLevel = 'purple';
    } else if (!monitored) {
      statusLevel = 'unmonitored';
    } else if (currentTime.isAfter(start) && currentTime.isBefore(end)) {
      statusLevel = 'warning';
    } else if (start.isBefore(currentTime) && !hasFile) {
      statusLevel = 'danger';
    } else if (this.model.get('episodeNumber') === 1) {
      statusLevel = 'premiere';
    }

    if (end.isBefore(currentTime.startOf('day'))) {
      statusLevel += ' past';
    }

    return statusLevel;
  },

  _onQueueUpdated() {
    // TODO: Also handle when item is removed from the queue?
    // TODO: If the progress is changing just update the progress bar and tool tip
    if (QueueCollection.findEpisode(this.model.get('id'))) {
      this.render();
    }
  }
});
