var Marionette = require('marionette');

var region = Marionette.Region.extend({
    el : '#actionbar-region',

    onShow : function () {
        Marionette.$('body').addClass('actionbar-visible');
    },

    onClose : function () {
        Marionette.$('body').removeClass('actionbar-visible actionbar-extended');
    }
});

module.exports = region;