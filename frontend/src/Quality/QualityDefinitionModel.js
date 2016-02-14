var ModelBase = require('Settings/SettingsModelBase');

module.exports = ModelBase.extend({
  initialize() {
    const name = this.get('quality').name;

    this.successMessage = `Saved ${name} quality settings`;
    this.errorMessage = `Couldn't save ${name} quality settings`;

    ModelBase.prototype.initialize.apply(this, arguments);
  }
});
