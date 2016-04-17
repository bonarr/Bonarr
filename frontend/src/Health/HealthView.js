var Marionette = require('marionette');
var healthCollection = require('./healthCollection');

module.exports = Marionette.ItemView.extend({
  tagName: 'span',
  className: 'label',

  initialize() {
    this.listenTo(healthCollection, 'sync', this.render);
    healthCollection.fetch();
  },

  render() {
    this.$el.empty();

    if (healthCollection.length === 0) {
      return this;
    }

    let label = 'label-warning';
    var errors = healthCollection.some((model) => {
      return model.get('type') === 'error';
    });

    if (errors) {
      label = 'label-danger';
    }

    this.$el.addClass(label);
    this.$el.text(healthCollection.length);

    return this;
  }
});
