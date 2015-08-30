var SettingsModelBase = require('../SettingsModelBase');

module.exports = SettingsModelBase.extend({
    url            : window.Sonarr.ApiRoot + '/config/ui',
    successMessage : 'UI settings saved',
    errorMessage   : 'Failed to save UI settings'
});