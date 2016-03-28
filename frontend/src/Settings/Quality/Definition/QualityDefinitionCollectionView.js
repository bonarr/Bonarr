var Marionette = require('marionette');
var QualityDefinitionItemView = require('./QualityDefinitionItemView');

module.exports = Marionette.CompositeView.extend({
  template: 'Settings/Quality/Definition/QualityDefinitionCollectionTemplate',

  childViewContainer: '.x-rows',

  childView: QualityDefinitionItemView
});
