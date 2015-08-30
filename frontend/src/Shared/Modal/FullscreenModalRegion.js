var _ = require('underscore');
var Marionette = require('marionette');
var $ = require('jquery');

var FullScreenModalRegion = Marionette.Region.extend({
    el: '#fullscreen-modal-region',

    initialize: function () {
        _.bindAll(this, 'close', 'onKeypress');
        $(document).on('keyup', this.onKeypress);
    },

    onShow: function () {
        this.$el.addClass('shown');
        this.closeButtons = this.$el.find('.x-close');
        this.closeButtons.on('click', this.close);
    },

    onKeypress: function (event) {
        var view = this.currentView;
        if (!view || view.isClosed) {
            return;
        }
        var esc = 27;
        if (event.keyCode === esc) {
            this.close();
            event.stopPropagation();
            event.preventDefault();
        }
    },

    close: function () {
        var view = this.currentView;
        if (!view || view.isClosed) {
            return;
        }
        this.$el.removeClass('shown');
        // give animation time to finish before killing the html
        var protoClose = _.bind(Marionette.Region.prototype.close, this, arguments);
        window.setTimeout(protoClose, 1000);
        this.closeButtons = null;
    },
});

module.exports = FullScreenModalRegion;