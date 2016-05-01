const _ = require('underscore');
const Backbone = require('backbone');

function AsPageableCollection() {

  this.prototype.fetch = function(options = {}) {
    options.data = _.extend(options.data || {}, { page: 1 }, _.pick(this.state, ['page', 'pageSize', 'sortDir', 'sortKey']));

    return Backbone.Collection.prototype.fetch.call(this, options);
  };

  this.prototype.parse = function(resp) {
    _.extend(this.state,
             _.omit(resp, ['records']),
             { totalPages: Math.ceil(resp.totalRecords / resp.pageSize) });

    return resp.records;
  };

  return this;
}

module.exports = AsPageableCollection;
