var $ = require('jquery');
var Marionette = require('marionette');
var Backbone = require('backbone');
var reqres = require('reqres');
var tpl = require('./ImportSeriesLayout.hbs');
var rootFolderCollection = require('../RootFolders/RootFolderCollection');

const ImportSeriesLayout = Marionette.Layout.extend({
  template: tpl,

  regions: {
    result: '.import-region'
  },

  events: {
    'click .x-start': 'onStart'
  },

  initialize(options = {}) {
    this.term = options.term;
  },

  onStart() {
    var promise = reqres.request(reqres.SelectPath);
    promise.done(this.onPathSelected);
  },

  onPathSelected(options) {
    const path = options.path;
    console.log('Import series path selected', path);

    const folderPromise = $.Deferred();
    rootFolderCollection.fetch().
      done(() => {
        const rootFolder = rootFolderCollection.findWhere({ path });
        if (rootFolder) {
          folderPromise.resolve(rootFolder);
        } else {
          rootFolderCollection.create({ path: path },
            {
              wait: true,
              success: folderPromise.resolve
            }
          );
        }
      });

    folderPromise.done((model) => {
      const unmapped = model.get('unmappedFolders') || [];
      console.log(`rootfolder ID ${model.id}. Unmapped: ${unmapped.length}`);
      Backbone.history.navigate(`add/import/${model.id}`, { trigger: true });
    });
  }
});

module.exports = ImportSeriesLayout;
