const Marionette = require('marionette');
const tpl = require('./ProfileSelectView.hbs');
const profileCollection = require('./profileCollection');

const ProfileSelectView = Marionette.ItemView.extend({
  template: tpl,

  className: 'dropdown',

  ui: {
    buttonText: '.x-button-text'
  },

  events: {
    'click a': 'onItemClick'
  },

  initialize(options = {}) {
    this.collection = profileCollection;
    this.model = options.model || this.collection.at(0);
    this.listenTo(this.collection, 'sync', this.render);
  },

  serializeData() {
    return {
      selected: this.model.toJSON(),
      list: this.collection.toJSON()
    };
  },

  select(model) {
    this.model = model;
    this.ui.buttonText.text(model.get('name'));
    this.trigger('change', model);
  },

  onItemClick(e) {
    e.preventDefault();
    const $target = this.$(e.currentTarget);
    const profileId = $target.data('id');
    const selectedModel = this.collection.get(profileId);
    this.select(selectedModel);
  }
});

module.exports = ProfileSelectView;
