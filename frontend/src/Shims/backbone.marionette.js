var Backbone = require('backbone');
require('../JsLibraries/backbone.marionette');

window.Marionette = Backbone.Marionette;

var templateMixin = require('../Handlebars/backbone.marionette.templates');
var asNamedView = require('../Mixins/AsNamedView');

templateMixin.call(window.Marionette.TemplateCache);
asNamedView.call(window.Marionette.ItemView.prototype);

module.exports = window.Marionette;