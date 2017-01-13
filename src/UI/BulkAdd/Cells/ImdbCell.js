var NzbDroneCell = require('../../Cells/NzbDroneCell');
var MovieCell = require('./MovieCell');
var SearchMovieLayout = require('../SearchMovieLayout');

module.exports = NzbDroneCell.extend({
    className : 'imdb-id-cell editable',

    event : {
        'click' : '_onClick'
    },

    render : function() {

    },

    _onBlur : function(imdbId) {
        //query IMDB and update movie cell
    },

    _onClick : function () {
        var view = new SearchMovieLayout();

        this.listenTo(view, 'bulkAdd:searched:movie', this._setMovie);

        vent.trigger(vent.Commands.OpenModal2Command, view);
    },

    _setMovie : function (e) {
        // if (this.model.has('movie') && e.model.id === this.model.get('movie').id) {
        //     return;
        // }

        this.model.set({
            movie       : e.model.toJSON()
        });
    }
})