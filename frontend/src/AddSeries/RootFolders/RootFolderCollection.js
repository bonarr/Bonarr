const Backbone = require('backbone');
const RootFolderModel = require('./RootFolderModel');
const asSignalRCollection = require('Mixins/Collection/asSignalRCollection');

const RootFolderCollection = Backbone.Collection.extend({
  url: '/rootfolder',
  model: RootFolderModel
});

asSignalRCollection.apply(RootFolderCollection.prototype);

module.exports = new RootFolderCollection();
