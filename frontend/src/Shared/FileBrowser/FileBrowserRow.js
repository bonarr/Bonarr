var Marionette = require('marionette');
var tpl = require('./FileBrowserRow.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,

  className: 'file-browser-row',
  tagName: 'tr',

  events: {
    'click': 'onClick'
  },

  serializeData() {
    const type = this.model.get('type');
    const name = this.model.get('name');

    return {
      icon: `icon-sonarr-browser-${type}`,
      name
    };
  },

  onClick() {
    this.model.collection.trigger('modelselected', this.model);
  }
});
