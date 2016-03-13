var SettingsModelBase = require('../SettingsModelBase');

module.exports = SettingsModelBase.extend({
  url: '/config/indexer',
  successMessage: 'Indexer settings saved',
  errorMessage: 'Failed to save indexer settings'
});
