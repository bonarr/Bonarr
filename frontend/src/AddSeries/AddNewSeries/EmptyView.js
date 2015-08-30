var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
    template : 'AddSeries/AddNewSeries/EmptyView',

    initialize : function(options) {
        options = options || {};
        this.term = options.term;
    },

    serializeData : function() {
        return { term : this.term };
    }
});