var Backgrid = require('backgrid');
var profileCollection = require('Profile/profileCollection');
var _ = require('underscore');

module.exports = Backgrid.Cell.extend({
  className: 'profile-cell',

  _originalInit: Backgrid.Cell.prototype.initialize,

  initialize() {
    this._originalInit.apply(this, arguments);

    this.listenTo(profileCollection, 'sync', this.render);
  },

  render() {
    this.$el.empty();
    var profileId = this.model.get(this.column.get('name'));

    var profile = _.findWhere(profileCollection.models, { id: profileId });

    if (profile) {
      this.$el.html(profile.get('name'));
    }

    return this;
  }
});
