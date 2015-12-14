var $ = require('jquery');
var Marionette = require('marionette');
var FileBrowserCollection = require('./FileBrowserCollection');
var EmptyView = require('./EmptyFolderView');
var FileBrowserRow = require('./FileBrowserRow');
var LoadingView = require('../LoadingView');
var TableView = require('../../Table/TableView');
var tpl = require('./FileBrowserLayout.hbs');
require('../../Mixins/DirectoryAutoComplete');

module.exports = Marionette.Layout.extend({
  template: tpl,

  regions: {
    browser: '#x-browser'
  },

  ui: {
    path: '.x-path',
    indicator: '.x-indicator'
  },

  events: {
    'typeahead:selected .x-path': '_pathChanged',
    'typeahead:autocompleted .x-path': '_pathChanged',
    'keyup .x-path': '_inputChanged',
    'click .x-ok': 'onOkClick'
  },

  initialize: function(options) {
    this._deferred = $.Deferred();
    this.promise = this._deferred.promise();

    this.collection = new FileBrowserCollection();
    this.collection.showFiles = options.showFiles || false;
    this.collection.showLastModified = options.showLastModified || false;
    this.path = options.path;
    this._setColumns();
    this.listenTo(this.collection, 'sync', this._showGrid);
    this.listenTo(this.collection, 'modelselected', this._rowSelected);
  },

  onRender: function() {
    this.browser.show(new LoadingView());
    this.ui.path.directoryAutoComplete();
    this._fetchCollection(this.path);
    this._updatePath(this.path);
  },

  _setColumns: function() {
    this.headers = [
      {
        name: 'type',
        label: ''
      },
      {
        name: 'name',
        label: 'Name'
      }
    ];
    if (this.collection.showLastModified) {
      this.headers.push({
        name: 'lastModified',
        label: 'Last Modified'
      });
    }
    if (this.collection.showFiles) {
      this.headers.push({
        name: 'size',
        label: 'Size'
      });
    }
  },

  _fetchCollection: function(path) {
    this.ui.indicator.show();
    var data = { includeFiles: this.collection.showFiles };
    if (path) {
      data.path = path;
    }
    this.collection.fetch({ data: data });
  },

  _showGrid: function() {
    this.ui.indicator.hide();
    if (this.collection.models.length === 0) {
      this.browser.show(new EmptyView());
      return;
    }

    var tableView = new TableView({
      collection: this.collection,
      itemView: FileBrowserRow,
      headers: this.headers
    });

    this.browser.show(tableView);
  },

  _rowSelected: function(model) {
    var path = model.get('path');
    var type = model.get('type');

    if (type === 'file') {
      this.onOkClick();
    }

    this._updatePath(path);
  },

  _pathChanged: function(e, path) {
    this._updatePath(path.value);
  },

  _inputChanged: function() {
    var path = this.ui.path.val();
    if (path === '' || path.endsWith('\\') || path.endsWith('/')) {
      this._fetchCollection(path);
    }
  },

  _updatePath: function(path) {
    if (path !== undefined || path !== null) {
      this.ui.path.val(path);
      this._fetchCollection(path);
    }
  },

  onOkClick: function() {
    var path = this.ui.path.val();

    this._deferred.resolve({
      path: path
    });

    this.close();
  }
});
