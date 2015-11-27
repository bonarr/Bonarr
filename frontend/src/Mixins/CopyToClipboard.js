var $ = require('jquery');
var ZeroClipboard = require('zero.clipboard');
var Messenger = require('../Shared/Messenger');

$.fn.copyToClipboard = function(input) {
  ZeroClipboard.config({
    swfPath: `${window.Sonarr.UrlBase}/Content/Vendor/zero.clipboard.swf`
  });

  var client = new ZeroClipboard(this);

  client.on('ready', () => {
    client.on('copy', (e) => e.clipboardData.setData('text/plain', input.val()));
    client.on('aftercopy', () => Messenger.show({ message: 'Copied text to clipboard' }));
  });
};
