const NzbDroneController = require('./Shared/NzbDroneController');
const CalendarLayout = require('./Calendar/CalendarLayout');
const ReleaseLayout = require('./Release/ReleaseLayout');
const SeasonPassLayout = require('./SeasonPass/SeasonPassLayout');
const SeriesEditorLayout = require('Series/Editor/SeriesEditorLayout');

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
