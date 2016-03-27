var $ = require('jquery');
var _ = require('underscore');
var DeepModel = require('backbone.deepmodel');
var Messenger = require('Shared/Messenger');

module.exports = DeepModel.extend({
  connectData(action, initialQueryParams) {
    var self = this;

    this.trigger('connect:sync');

    var promise = $.Deferred();

    var callAction = function(action, queryParams) {
      if (queryParams) {
        action = action + '?' + $.param(queryParams, true);
      }

      var params = {
        url: self.collection.url + '/connectData/' + action,
        contentType: 'application/json',
        data: JSON.stringify(self.toJSON()),
        type: 'POST',
        isValidatedCall: true
      };

      var ajaxPromise = $.ajax(params);
      ajaxPromise.fail(promise.reject);

      ajaxPromise.success(function(response) {
        if (response.action) {
          if (response.action === 'openWindow') {
            window.open(response.url);
            var selfWindow = window;
            selfWindow.onCompleteOauth = function(query, callback) {
              delete selfWindow.onCompleteOauth;

              if (response.nextStep) {
                var queryParams = {};
                var splitQuery = query.substring(1).split('&');

                _.each(splitQuery, function(param) {
                  var paramSplit = param.split('=');
                  queryParams[paramSplit[0]] = paramSplit[1];
                });

                callAction(response.nextStep, _.extend(initialQueryParams, queryParams));
              } else {
                promise.resolve(response);
              }

              callback();
            };

            return;
          } else if (response.action === 'updateFields') {
            _.each(self.get('fields'), function(value, index) {
              var fieldValue = _.find(response.fields, function(field, key) {
                return key === value.name;
              });

              if (fieldValue) {
                self.set('fields.' + index + '.value', fieldValue);
              }
            });
          }
        }
        if (response.nextStep) {
          callAction(response.nextStep, initialQueryParams);
        } else {
          promise.resolve(response);
        }
      });
    };

    callAction(action, initialQueryParams);

    Messenger.monitor({
      promise,
      successMessage: 'Connecting for \'{0}\' succeeded'.format(this.get('name')),
      errorMessage: 'Connecting for \'{0}\' failed'.format(this.get('name'))
    });

    promise.fail((response) => {
      this.trigger('connect:failed', response);
    });

    return promise;
  },

  test() {
    this.trigger('validation:reset');

    var params = {};

    params.url = `${this.collection.url}/test`;
    params.contentType = 'application/json';
    params.data = JSON.stringify(this.toJSON());
    params.type = 'POST';
    params.isValidatedCall = true;

    var promise = $.ajax(params);

    Messenger.monitor({
      promise,
      successMessage: 'Testing \'{0}\' succeeded'.format(this.get('name')),
      errorMessage: 'Testing \'{0}\' failed'.format(this.get('name'))
    });

    promise.fail((response) => {
      this.trigger('validation:failed', response);
    });

    return promise;
  }
});
