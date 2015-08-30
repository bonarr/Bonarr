var PageableCollection = require('backbone.paginator');
var TaskModel = require('./TaskModel');

module.exports = PageableCollection.extend({
    url   : window.Sonarr.ApiRoot + '/system/task',
    model : TaskModel,

    state : {
        sortKey  : 'name',
        order    : -1,
        pageSize : 100000
    },

    mode : 'client'
});