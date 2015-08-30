var SettingsModelBase = require('../SettingsModelBase');

module.exports = SettingsModelBase.extend({
    url            : window.Sonarr.ApiRoot + '/config/host',
    successMessage : 'General settings saved',
    errorMessage   : 'Failed to save general settings'
});