var $ = require('jquery');
var vent = require('./vent');

module.exports = {
  Events: {
    ConfigUpdatedEvent: 'ConfigUpdatedEvent'
  },

  Keys: {
    AdvancedSettings: 'advancedSettings'
  },

  getValueJson(key, defaultValue) {
    defaultValue = defaultValue || {};

    var storeValue = window.localStorage.getItem(key);

    if (!storeValue) {
      return defaultValue;
    }

    return $.parseJSON(storeValue);
  },

  getValueBoolean(key, defaultValue) {
    defaultValue = defaultValue || false;

    return this.getValue(key, defaultValue.toString()) === 'true';
  },

  getValue(key, defaultValue) {
    var storeValue = window.localStorage.getItem(key);

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
        key: key,
        value: value
      });
    } catch (error) {
      console.error('Unable to save config: [{0}] => [{1}]'.format(key, value));
    }
  }
};
