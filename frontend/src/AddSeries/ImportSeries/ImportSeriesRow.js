var TableRow = require('Table/TableRow');
var AddSeriesCollection = require('../AddSeriesCollection');
var tpl = require('./ImportSeriesRow.hbs');

module.exports = TableRow.extend({
  template: tpl,

  className: 'import-series-row',

  events: {
    click: 'onClick'
  },

  initialize(options) {
    const queue = options.taskQueue;
    this.results = new AddSeriesCollection();
    const name = this.model.get('name');
    this.promise = queue.enqueue(() => {
      return this.results.search(name);
    });

    this.listenTo(this.results, 'sync', this.render);
  },

  templateHelpers() {
    return {
      suggestions: this.results.toJSON()
    };
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
