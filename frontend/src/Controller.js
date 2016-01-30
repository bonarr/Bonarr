var NzbDroneController = require('./Shared/NzbDroneController');
var CalendarLayout = require('./Calendar/CalendarLayout');
var ReleaseLayout = require('./Release/ReleaseLayout');
var SeasonPassLayout = require('./SeasonPass/SeasonPassLayout');
var SeriesEditorLayout = require('./Series/Editor/SeriesEditorLayout');

module.exports = NzbDroneController.extend({
  calendar() {
    this.setTitle('Calendar');
    this.showMainRegion(new CalendarLayout());
  },

  rss() {
    this.setTitle('RSS');
    this.showMainRegion(new ReleaseLayout());
  },

  seasonPass() {
    this.setTitle('Season Pass');
    this.showMainRegion(new SeasonPassLayout());
  },

  seriesEditor() {
    this.setTitle('Series Editor');
    this.showMainRegion(new SeriesEditorLayout());
  }
});
