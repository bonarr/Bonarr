var _ = require('underscore');
var Marionette = require('marionette');
var HealthCollection = require('./HealthCollection');

module.exports = Marionette.ItemView.extend({
  tagName: 'span',
  className: 'label',

  initialize() {
    this.listenTo(HealthCollection, 'sync', this.render);
    HealthCollection.fetch();
  },

  render() {
    this.$el.empty();

    if (HealthCollection.length === 0) {
      return this;
    }

    let label = 'label-warning';
    var errors = HealthCollection.some(function (model) {
      return model.get('type') === 'error';
    });

    if (errors) {
      label = 'label-danger';
    }

    this.$el.addClass(label);
    this.$el.text(HealthCollection.length);

    return this;
  }
});
