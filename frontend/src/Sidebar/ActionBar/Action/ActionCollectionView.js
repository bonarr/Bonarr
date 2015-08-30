var Marionette = require('marionette');
var ActionView = require('./ActionView');

module.exports = Marionette.CollectionView.extend({
    tagName   : 'ul',
    className : 'sidebar-right-list',
    itemView  : ActionView
});