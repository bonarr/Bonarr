const Marionette = require('marionette');
const ActionView = require('./ActionView');

module.exports = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'actionbar-list',
  childView: ActionView
});
