var _ = require('underscore');
var Backbone = require('backbone');

module.exports = function() {

    var originalMakeFullCollection = this.prototype._makeFullCollection;

    _.extend(this.prototype.state, {
        filterKey   : null,
        filterValue : null
    });

    _.extend(this.prototype.queryParams, {
        filterKey   : 'filterKey',
        filterValue : 'filterValue'
    });

    this.prototype.setFilterMode = function(mode, options) {
        return this.setFilter(this.filterModes[mode], options);
    };

    this.prototype.setFilter = function(filter, options) {
        options = _.extend({ reset : true }, options || {});

        this.state.filterKey = filter.key;
        this.state.filterValue =filter.value;
        this.state.filterType = filter.type || 'equal';

        if (options.reset) {
            if (this.mode !== 'server') {
                return this.fullCollection.resetFiltered();
            } else {
                return this.fetch();
            }
        }
    };

    this.prototype._makeFullCollection = function(models, options) {
        var self = this;
        self.shadowCollection = originalMakeFullCollection.apply(this, arguments);

        var filterModel = function(model) {
            if (!self.state.filterKey || !self.state.filterValue) {
                return true;
            }
            else if (self.state.filterType === 'contains') {
                return model.get(self.state.filterKey).toLowerCase().indexOf(self.state.filterValue.toLowerCase()) > -1;
            }
            else {
                return model.get(self.state.filterKey) === self.state.filterValue;
            }
        };

        self.shadowCollection.filtered = function() {
            return this.filter(filterModel);
        };

        var filteredModels = self.shadowCollection.filtered();
        var fullCollection = originalMakeFullCollection.call(this, filteredModels, options);

        fullCollection.resetFiltered = function(options) {
            Backbone.Collection.prototype.reset.call(this, self.shadowCollection.filtered(), options);
        };

        fullCollection.reset = function() {
            self.shadowCollection.reset.apply(self, arguments);
            self.fullCollection.resetFiltered();
        };

        return fullCollection;
    };

    return this;
};