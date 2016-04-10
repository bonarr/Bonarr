const Marionette = require('JsLibraries/backbone.marionette');
const templateMixin = require('Handlebars/backbone.marionette.templates');
const asNamedView = require('Mixins/AsNamedView');

templateMixin.call(Marionette.TemplateCache);
asNamedView.call(Marionette.ItemView.prototype);

module.exports = Marionette;
