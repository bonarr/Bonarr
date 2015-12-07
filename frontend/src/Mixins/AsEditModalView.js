var vent = require('vent');
var _ = require('underscore');

module.exports = function() {

  const proto = this.prototype;

  const events = {
    'click .x-save': '_save',
    'click .x-save-and-add': '_saveAndAdd',
    'click .x-test': '_test',
    'click .x-delete': '_delete'
  };

  proto.events = _.extend({}, proto.events, events);

  var originalInitialize = proto.initialize;
  var originalOnBeforeClose = proto.onBeforeClose;

  const saveInternal = function() {
    if (this.saving) {
      return this.savePromise;
    }

    this.saving = true;
    this.ui.indicator.show();

    if (this._onBeforeSave) {
      this._onBeforeSave();
    }

    this.savePromise = this.model.save();

    this.savePromise.always(() => {
      this.saving = false;

      if (!this.isClosed) {
        this.ui.indicator.hide();
      }
    });

    this.savePromise.done(() => {
      this.originalModelData = JSON.stringify(this.model.toJSON());
    });

    return this.savePromise;
  };

  this.prototype.initialize = function(options) {
    if (!this.model) {
      throw 'View has no model';
    }

    this.testing = false;
    this.saving = false;

    this.originalModelData = JSON.stringify(this.model.toJSON());

    this.ui = this.ui || {};
    this.ui.indicator = '.x-indicator';

    if (originalInitialize) {
      originalInitialize.call(this, options);
    }
  };

  this.prototype._save = function() {
    var promise = saveInternal.call(this);

    promise.done(() => {
      if (this._onAfterSave) {
        this._onAfterSave();
      }
    });
  };

  this.prototype._saveAndAdd = function() {
    var promise = saveInternal.call(this);

    promise.done(() => {
      if (this._onAfterSaveAndAdd) {
        this._onAfterSaveAndAdd();
      }
    });
  };

  this.prototype._test = function() {
    if (this.testing) {
      return;
    }

    this.testing = true;
    this.ui.indicator.show();

    this.model.test().always(() => {
      this.testing = false;
      this.ui.indicator.hide();
    });
  };

  this.prototype._delete = function() {
    var view = new this._deleteView({ model: this.model });
    vent.trigger(vent.Commands.OpenFullscreenModal, view);
  };

  this.prototype.onBeforeClose = function() {
    this.model.set(JSON.parse(this.originalModelData));

    if (originalOnBeforeClose) {
      originalOnBeforeClose.call(this);
    }
  };

  return this;
};
