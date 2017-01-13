var vent = require('../../vent');
var NzbDroneCell = require('../../Cells/NzbDroneCell');
var ImdbCell = require('./ImdbCell');

module.exports = NzbDroneCell.extend({
    className : 'series-title-cell editable',

    render : function() {
        this.$el.empty();

        var movie = this.model.get('movie');

        if (movie)
        {
            this.$el.html(movie.title + " (" + movie.year + ")" );
        }

        this.delegateEvents();
        return this;
    },

    _onClick : function () {
        var view = new SelectMovieLayout();

        this.listenTo(view, 'bulkadd:selected:movie', this._setMovie);

        vent.trigger(vent.Commands.OpenModal2Command, view);
    },

    _setMovie : function (e) {
        if (this.model.has('movie') && e.model.id === this.model.get('movie').id) {
            return;
        }

        this.model.set({
            movie       : e.model.toJSON()
        });
    }
});