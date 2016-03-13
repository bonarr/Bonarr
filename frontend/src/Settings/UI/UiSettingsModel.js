var SettingsModelBase = require('../SettingsModelBase');

module.exports = SettingsModelBase.extend({
  url: '/config/ui',
  successMessage: 'UI settings saved',
  errorMessage: 'Failed to save UI settings'
});
