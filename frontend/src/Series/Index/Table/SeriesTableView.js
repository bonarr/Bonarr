var $ = require('jquery');
var Marionette = require('marionette');
var TableView = require('Table/TableView');
var tpl = require('./SeriesTableLayout.hbs');

const SeriesTableLayout = Marionette.LayoutView.extend({

  template: tpl,

  headers: [{
    name: 'status'
  }, {
    name: 'title',
    label: 'Title'
  }, {
    name: 'profile',
    label: 'Profile'
  }, {
    name: 'network',
    label: 'Network'
  }, {
    name: 'netAiring',
    label: 'Net Airing'
  }, {
    name: 'seasons',
    label: 'Seasons'
  }, {
    name: 'episodes',
    label: 'Episodes'
  }],

  regions: {
    table: '#series-table-region'
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

module.exports = SeriesTableLayout;
