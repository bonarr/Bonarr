var ModelBase = require('../../SettingsModelBase');

module.exports = ModelBase.extend({
  url: '/config/naming',
  successMessage: 'MediaManagement settings saved',
  errorMessage: 'Couldn\'t save naming settings'
});
