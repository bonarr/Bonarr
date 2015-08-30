var Marionette = require('marionette');
var StatusModel = require('../../StatusModel');

module.exports = Marionette.ItemView.extend({
    template : 'System/Status/About/AboutViewTemplate',

    initialize : function() {
        this.model = StatusModel;
    }
});