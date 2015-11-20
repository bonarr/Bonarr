var $ = require('jquery');
var vent = require('vent');
var moment = require('moment');
var Marionette = require('marionette');
var QueueCollection = require('../../../Activity/Queue/QueueCollection');
//var Config = require('../Config');

module.exports = Marionette.ItemView.extend({
  template: 'Calendar/Calendar/Events/CalendarEventView',
  className: 'calendar-event',

  events: {
    'click': '_showEpisodeDetails'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(QueueCollection, 'sync', this._onQueueUpdated);
  },

  serializeData: function () {
    var seriesTitle = this.model.get('series').title;
    var start = this.model.get('airDateUtc');
    var end = this._getEndTime();
    var statusLevel = this._getStatusLevel();

    //      statusLevel: self._getStatusLevel(model, end),
    //      downloading: QueueCollection.findEpisode(model.get('id')),

    return {
      seriesTitle: seriesTitle,
      start: start,
      end: end,
      statusLevel: statusLevel
    }
  },

  onRender: function () {
    this.$el.addClass(this._getStatusLevel())
  },

  _showEpisodeDetails: function () {
    // TODO: Open episode details modal
  },

  _eventRender: function(event, element) {
    element.addClass(event.statusLevel);
    element.children('.fc-content').addClass(event.statusLevel);

    if (event.downloading) {
      var progress = 100 - event.downloading.get('sizeleft') / event.downloading.get('size') * 100;
      var releaseTitle = event.downloading.get('title');
      var estimatedCompletionTime = moment(event.downloading.get('estimatedCompletionTime')).fromNow();
      var status = event.downloading.get('status').toLocaleLowerCase();
      var errorMessage = event.downloading.get('errorMessage');

      if (status === 'pending') {
        this._addStatusIcon(element, 'icon-sonarr-pending', 'Release will be processed {0}'.format(estimatedCompletionTime));
      } else if (errorMessage) {
        if (status === 'completed') {
          this._addStatusIcon(element, 'icon-sonarr-import-failed', 'Import failed: {0}'.format(errorMessage));
        } else {
          this._addStatusIcon(element, 'icon-sonarr-download-failed', 'Download failed: {0}'.format(errorMessage));
        }
      } else if (status === 'failed') {
        this._addStatusIcon(element, 'icon-sonarr-download-failed', 'Download failed: check download client for more details');
      } else if (status === 'warning') {
        this._addStatusIcon(element, 'icon-sonarr-download-warning', 'Download warning: check download client for more details');
      } else {
        element.find('.fc-time').after('<span class="chart pull-right" data-percent="{0}"></span>'.format(progress));

        element.find('.chart').easyPieChart({
          barColor: '#ffffff',
          trackColor: false,
          scaleColor: false,
          lineWidth: 2,
          size: 14,
          animate: false
        });

        element.find('.chart').tooltip({
          title: 'Episode is downloading - {0}% {1}'.format(progress.toFixed(1), releaseTitle),
          container: '.fc-content-skeleton'
        });
      }
    } else if (event.model.get('series').seriesType === 'anime' && event.model.get('seasonNumber') > 0 && !event.model.has('absoluteEpisodeNumber')) {
      this._addStatusIcon(element, 'icon-sonarr-form-warning', 'Episode does not have an absolute episode number');
    }
  },

  _getEndTime: function () {
    var start = this.model.get('airDateUtc');
    var runtime = this.model.get('series').runtime;

    return moment(start).add('minutes', runtime).toISOString();
  },

  _getStatusLevel: function() {
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

  _onQueueUpdated: function () {
    // TODO: Also handle when item is removed from the queue?
    if (QueueCollection.findEpisode(this.model.get('id'))) {
      this.render();
    }
  }
});
