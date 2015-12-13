var Marionette = require('marionette');
var Controller = require('./Controller');

module.exports = Marionette.AppRouter.extend({
  controller: new Controller(),
  appRoutes: {
    'calendar': 'calendar',
    'rss': 'rss',
    'seasonpass': 'seasonPass',
    'serieseditor': 'seriesEditor',
    ':whatever': 'showNotFound'
  }
});
