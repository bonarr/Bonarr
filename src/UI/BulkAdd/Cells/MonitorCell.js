var _ = require('underscore');
var ToggleCell = require('../../Cells/ToggleCell');

module.exports = ToggleCell.extend({
    className : 'toggle-cell episode-monitored',

    _originalOnClick : ToggleCell.prototype._onClick,

    _onClick : function(e) {
        this._originalOnClick.apply(this, arguments);
    }
});