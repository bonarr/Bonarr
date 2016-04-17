var Marionette = require('marionette');
var commandCollection = require('./commandCollection');
var CommandMessengerItemView = require('./CommandMessengerItemView');

var CollectionView = Marionette.CollectionView.extend({
  childView: CommandMessengerItemView
});

module.exports = new CollectionView({
  collection: commandCollection
});
