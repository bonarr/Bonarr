var vent = require('../../vent');
var NzbDroneCell = require('../../Cells/NzbDroneCell');
var ImdbCell = require('./ImdbCell');

module.exports = NzbDroneCell.extend({
    className : 'series-title-cell editable',

    render : function() {
        this.$el.empty();

        this._getMovie();

        //this.delegateEvents();

        this.listenTo(view, 'bulkadd:selected:movie', this._getMovie);

        return this;
    },

    _getMovie : function () {
        this.model.get('movie');

        var movie = this.model.get('movie');

        if (movie)
        {
            this.$el.html(movie.title + " (" + movie.year + ")" );
        }
    }
});