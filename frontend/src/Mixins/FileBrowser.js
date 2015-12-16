var $ = require('jquery');
var reqres = require('reqres');
require('./DirectoryAutoComplete');

const buttonHtml = '<button class="btn btn-primary x-file-browser" title="Browse"><i class="icon-sonarr-folder-open"/></button>';

$.fn.fileBrowser = function() {
  var inputs = $(this);

  inputs.each(function() {
    var $input = $(this);
    var button = $(buttonHtml);

    if ($input.parent('.input-group').length > 0) {
      $input.parent('.input-group').find('.input-group-btn').prepend(button);
    } else {
      var $inputGroup = $('<div class="input-group"></div>');
      var $inputGroupButton = $('<span class="input-group-btn"></span>');
      $inputGroupButton.append(button);
      $input.wrap($inputGroup);
      $input.after($inputGroupButton);
    }

    button.on('click', () => {
      const promise = reqres.request(reqres.SelectPath);
      promise.done((result) => {
        $input.val(result.path);
      });
    });
  });

  inputs.directoryAutoComplete();
};
