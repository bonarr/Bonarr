var NzbDroneCell = require('../../Cells/NzbDroneCell');
var MovieCell = require('./MovieCell');

module.exports = NzbDroneCell.extend({
    className : 'imdb-id-cell editable',

    render : function() {

    },

    _onBlur : function(imdbId) {
        //query IMDB and update movie cell
    }
})