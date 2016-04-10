var $ = require('jquery');
var Marionette = require('marionette');
var ImportSeriesCollection = require('./ImportSeriesCollection');
var TableView = require('Table/TableView');
var ImportSeriesRow = require('./ImportSeriesRow');
var rootFolderCollection = require('../RootFolders/RootFolderCollection');
var TaskQueue = require('Shared/TaskQueue').default; // have no idea why I need this
var tpl = require('./ImportSeriesTableLayout.hbs');
var ImportSeriesFooterView = require('./ImportSeriesFooterView');
var vent = require('vent');

const EmptyView = Marionette.LayoutView.extend({

  template: tpl,

  headers: [{
    name: 'name',
    label: 'folder'
  }, {
    name: 'monitor'
  }, {
    name: 'profile'
  }, {
    name: 'series'
  }],

  regions: {
    table: '#import-series-table-region'
  },

  initialize(options = {}) {
    const rootFolderId = options.rootFolderId;
    this.folderPromise = $.Deferred();

    rootFolderCollection.fetch()
      .done(() => {
        const rootFolder = rootFolderCollection.get(rootFolderId);
        rootFolder.fetch().done(() => this.folderPromise.resolve(rootFolder));
      });
  },

  onShow() {
    this.folderPromise.done((model) => {
      const unmapped = model.get('unmappedFolders') || [];
      console.log(`rootfolder ID ${model.id}. Unmapped: ${unmapped.length}`);

      const collection = new ImportSeriesCollection(unmapped);

      const tableView = new TableView({
        collection,
        childView: ImportSeriesRow,
        headers: this.headers,
        selectable: true,
        childViewOptions: {
          taskQueue: new TaskQueue({
            concurrentJobs: 6
          })
        }
      });

      this.table.show(tableView);
      vent.trigger(vent.Commands.OpenFooter, new ImportSeriesFooterView({
        collection
      }));
    });
  }
});

module.exports = EmptyView;
