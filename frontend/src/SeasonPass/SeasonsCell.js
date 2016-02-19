var TemplatedCell = require('Cells/TemplatedCell');

module.exports = TemplatedCell.extend({
  className: 'seasons-cell',
  template: 'SeasonPass/SeasonsCellTemplate',

  events: {
    'click .x-season-monitored': '_toggleSeasonMonitored'
  },

  _toggleSeasonMonitored(e) {
    var target = this.$(e.target).closest('.x-season-monitored');
    var seasonNumber = parseInt(this.$(target).data('season-number'), 10);
    var icon = this.$(target).children('.x-season-monitored-icon');

    this.model.toggleSeasonMonitored(seasonNumber);

    // TODO: unbounce the save so we don't multiple to the server at the same time
    var savePromise = this.model.save();

    icon.spinForPromise(savePromise);
    savePromise.always(this.render.bind(this));
  }
});
