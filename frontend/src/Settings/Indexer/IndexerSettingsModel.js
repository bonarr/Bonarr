var SettingsModelBase = require('../SettingsModelBase');

module.exports = SettingsModelBase.extend({
    url            : window.Sonarr.ApiRoot + '/config/indexer',
    successMessage : 'Indexer settings saved',
    errorMessage   : 'Failed to save indexer settings'
});