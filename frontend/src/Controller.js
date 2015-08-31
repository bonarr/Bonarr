var NzbDroneController = require('./Shared/NzbDroneController');
var AppLayout = require('./AppLayout');
var Marionette = require('marionette');
var AddNewSeriesLayout = require('./AddSeries/AddNewSeries/AddNewSeriesLayout');
var CalendarLayout = require('./Calendar/CalendarLayout');
var ReleaseLayout = require('./Release/ReleaseLayout');
var SeasonPassLayout = require('./SeasonPass/SeasonPassLayout');
var SeriesEditorLayout = require('./Series/Editor/SeriesEditorLayout');

module.exports = NzbDroneController.extend({
  addSeries: function(action) {
    this.setTitle('Add New Series');
    this.showMainRegion(new AddNewSeriesLayout({ action: action }));
  },

  importSeries: function(action) {
    this.setTitle('Import Series');
    this.showMainRegion(new AddNewSeriesLayout({ action: action }));
  },

  calendar: function() {
    this.setTitle('Calendar');
    this.showMainRegion(new CalendarLayout());
  },

  rss: function() {
    this.setTitle('RSS');
    this.showMainRegion(new ReleaseLayout());
  },

  seasonPass: function() {
    this.setTitle('Season Pass');
    this.showMainRegion(new SeasonPassLayout());
  },

  seriesEditor: function() {
    this.setTitle('Series Editor');
    this.showMainRegion(new SeriesEditorLayout());
  }
});