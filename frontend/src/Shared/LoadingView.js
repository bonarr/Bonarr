const Marionette = require('marionette');
const tpl = require('./LoadingView.hbs');

module.exports = Marionette.ItemView.extend({
  template: tpl,
  className: 'loading'
});
