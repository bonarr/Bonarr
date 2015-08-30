var Marionette = require('marionette');
var Controller = require('./Controller');

module.exports = Marionette.AppRouter.extend({
    controller : new Controller(),
    appRoutes  : {
        'addseries'    : 'addSeries',
        'importseries' : 'importSeries',
        'calendar'     : 'calendar',
        'rss'          : 'rss',
        'seasonpass'   : 'seasonPass',
        'serieseditor' : 'seriesEditor',
        ':whatever'    : 'showNotFound'
    }
});