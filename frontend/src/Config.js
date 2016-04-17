const vent = require('./vent');

module.exports = {
  Events: {
    ConfigUpdatedEvent: 'ConfigUpdatedEvent'
  },

  Keys: {
    AdvancedSettings: 'advancedSettings'
  },

  getValueJson(key, defaultValue = {}) {
    const storeValue = window.localStorage.getItem(key);

    if (!storeValue) {
      return defaultValue;
    }

    return JSON.parse(storeValue);
  },

  getValueBoolean(key, defaultValue = false) {
    return this.getValue(key, defaultValue.toString()) === 'true';
  },

  getValue(key, defaultValue) {
    const storeValue = window.localStorage.getItem(key);

    if (!storeValue) {
      return defaultValue;
    }

    return storeValue.toString();
  },

  setValueJson(key, value) {
    return this.setValue(key, JSON.stringify(value));
  },

  setValue(key, value) {
    console.log('Config: [{0}] => [{1}]'.format(key, value));

    if (this.getValue(key) === value.toString()) {
      return;
    }

    try {
      window.localStorage.setItem(key, value);
      vent.trigger(this.Events.ConfigUpdatedEvent, {
        key,
        value
      });
    } catch (error) {
      console.error('Unable to save config: [{0}] => [{1}]'.format(key, value));
    }
  }
};
