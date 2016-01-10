var Marionette = require('marionette');
var tpl = require('./ImportSeriesRow.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,

  className: 'import-series-row',
  tagName: 'tr',

  events: {
    'click': 'onClick'
  }
  // serializeData() {
  //   const type = this.model.get('type');
  //
  //   var icon = '';
  //   if (type === 'computer') {
  //     icon = 'icon-sonarr-browser-computer';
  //   } else if (type === 'parent') {
  //     icon = 'icon-sonarr-browser-up';
  //   } else if (type === 'folder') {
  //     icon = 'icon-sonarr-browser-folder';
  //   } else if (type === 'file') {
  //     icon = 'icon-sonarr-browser-file';
  //   }
  //
  //   return {
  //     icon: icon,
  //     name: this.model.get('name')
  //   };
  // },
  //
  // onClick() {
  //   this.model.collection.trigger('modelselected', this.model);
  // }
});
