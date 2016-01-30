var NzbDroneCell = require('Cells/NzbDroneCell');

module.exports = NzbDroneCell.extend({
  className: 'log-filename-cell',

  render() {
    var filename = this._getValue();
    this.$el.html(filename);

    return this;
  }
});