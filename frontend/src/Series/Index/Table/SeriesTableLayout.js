// var $ = require('jquery');
// var ImportSeriesCollection = require('./ImportSeriesCollection');
var Marionette = require('marionette');
var TableView = require('Table/TableView');
var SeriesRow = require('./SeriesRow');
// var rootFolderCollection = require('../RootFolders/RootFolderCollection');
// var TaskQueue = require('Shared/TaskQueue').default; // have no idea why I need this
var tpl = require('./SeriesTableLayout.hbs');
// var ImportSeriesFooterView = require('./ImportSeriesFooterView');
// var vent = require('vent');

const SeriesTableView = Marionette.LayoutView.extend({

  template: tpl,

  headers: [{
    title: '',
    name: 'status'
  }, {
    name: 'name'
  }, {
    name: 'network'
  }, {
    name: 'profile'
  }, {
    name: 'nextAiring',
    title: 'next episode'
  }, {
    name: 'previousAiring',
    title: 'previous episode'
  }, {
    name: 'seasons'
  }, {
    name: 'episodes'
  }, {
    name: 'actions'
  }],

  regions: {
    table: '#series-table-region'
  },

  // initialize(options = {}) {
  //   const rootFolderId = options.rootFolderId;
  //   this.folderPromise = $.Deferred();
  //
  //   rootFolderCollection.fetch()
  //     .done(() => {
  //       const rootFolder = rootFolderCollection.get(rootFolderId);
  //       rootFolder.fetch().done(() => this.folderPromise.resolve(rootFolder));
  //     });
  // },

  onShow() {
    // this.folderPromise.done((model) => {
    //   const unmapped = model.get('unmappedFolders') || [];
    //   console.log(`rootfolder ID ${model.id}. Unmapped: ${unmapped.length}`);
    //
    //   const collection = new ImportSeriesCollection(unmapped);

    const tableView = new TableView({
      collection: this.collection,
      childView: SeriesRow,
      headers: this.headers
      // selectable: true,
      // childViewOptions: {
      //   taskQueue: new TaskQueue({
      //     concurrentJobs: 6
      //   })
      // }
    });

    this.table.show(tableView);
      // vent.trigger(vent.Commands.OpenFooter, new ImportSeriesFooterView({
      //   collection
      // }));
    // });
  }
});

module.exports = SeriesTableView;
