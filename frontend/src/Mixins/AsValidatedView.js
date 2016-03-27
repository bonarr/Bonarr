var _ = require('underscore');
require('jQuery/jquery.validation');

function asValidatedView() {
  const originalInitialize = this.prototype.initialize;

  const extentions = {
    initialize() {
      // Validation.bind(this);
      this.listenTo(this, {
        'validation:failed': this.validatedView_onValidationFailed,
        'validation:reset': this.validatedView_onValidationReset
      });

      if (this.model) {
        this.listenTo(this.model, 'request', this.validatedView_onModelRequest);
      }

      if (originalInitialize) {
        originalInitialize.apply(this, arguments);
      }
    },

    validatedView_onModelRequest(model, xhr) {
      this.$el.removeAllErrors();
      xhr.error((response) => {
        if (response.status === 400 && !this.isClosed) {
          this.trigger('validation:failed', response);
        }
      });
    },

    validatedView_onValidationReset() {
      this.$el.removeAllErrors();
    },

    validatedView_onValidationFailed(response) {
      _.each(response.responseJSON, (error) => {
        this.$el.processServerError(error);
      });
    }
  };

  this.prototype = _.extend(this.prototype, extentions);

  return this;
}

module.exports = asValidatedView;
