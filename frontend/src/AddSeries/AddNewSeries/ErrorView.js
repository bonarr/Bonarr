var Marionette = require('marionette');

module.exports = Marionette.CompositeView.extend({

    template : 'AddSeries/AddNewSeries/ErrorView',

    initialize : function(options) {
        this.options = options;
    },

    templateHelpers : function() {
        var xhr = this.options.xhr;

        var data = {
            status     : xhr.status,
            statusText : xhr.statusText
        };

        if (xhr) {
            try {
                var messageJson = JSON.parse(xhr.responseText);
                if (messageJson && messageJson.message) {
                    data.message = messageJson.message;
                }
            }
            catch (e) {

            }
        }

        if (!data.message) {
            data.message = 'An error occurred while searching for \'' + this.options.term + '\'';
        }

        return data;
    }
});