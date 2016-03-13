var $ = require('jquery');
require('typeahead');

$.fn.autoComplete = function(options) {
  if (!options) {
    throw 'options are required';
  }

  if (!options.resource) {
    throw 'resource is required';
  }

  if (!options.query) {
    throw 'query is required';
  }

  $(this).typeahead({
    hint: true,
    highlight: true,
    minLength: 3,
    items: 20
  }, {
    name: options.resource.replace('/'),
    displayKey: '',
    source(filter, callback) {
      var data = {};
      data[options.query] = filter;
      $.ajax({
        url: options.resource,
        dataType: 'json',
        type: 'GET',
        data,
        success(response) {
          if (options.filter) {
            options.filter.call(this, filter, response, callback);
          } else {
            var matches = [];

            $.each(response, (i, d) => {
              if (d[options.query] && d[options.property].startsWith(filter)) {
                matches.push({ value: d[options.property] });
              }
            });

            return callback(matches);
          }
        }
      });
    }
  });
};
