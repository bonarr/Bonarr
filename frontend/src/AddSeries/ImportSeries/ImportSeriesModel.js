const Backbone = require('backbone');
const profileCollection = require('Profile/ProfileCollection');

const ImportSeriesModel = Backbone.Model.extend({

  initialize() {
    this.listenTo(this, 'change:selectedSeries', this.onSelectedSeriesChanged);

    this.set({
      profileId: profileCollection.first().id,
      monitor: 'all'
    });
  },

  isSelectable() {
    const selectedSeries = this.get('selectedSeries');
    return selectedSeries && !selectedSeries.isExisting();
  },

  onSelectedSeriesChanged() {
    const newSelectedSeries = this.get('selectedSeries');

    if (this._currentlySelectedSeries) {
      this.stopListening(this._currentlySelectedSeries);
    }

    this._currentlySelectedSeries = newSelectedSeries;
    this.listenTo(this._currentlySelectedSeries, 'request', this.onSeriesRequest);
  },

  onSeriesRequest(model, xhr, options) {
    xhr.done(() => {
      this.collection.remove(this);
    });
  }

});

module.exports = ImportSeriesModel;
