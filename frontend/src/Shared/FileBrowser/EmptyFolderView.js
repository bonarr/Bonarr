var Marionette = require('marionette');
var tpl = require('./EmptyFolderView.hbs');

const EmptyFolderView = Marionette.CompositeView.extend({
  template: tpl
});

module.exports = EmptyFolderView;
