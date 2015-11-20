var Backbone = require('backbone');
var CalendarDayModel = require('./CalendarDayModel');

module.exports = Backbone.Collection.extend({
  model: CalendarDayModel
});
