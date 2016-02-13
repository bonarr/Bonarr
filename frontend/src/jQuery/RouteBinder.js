var Backbone = require('backbone');
var $ = require('jquery');

// This module will automatically route all relative links through backbone router rather than
// causing links to reload pages.

var routeBinder = {
  bind() {
    var self = this;
    $(document).on('click', 'a[href]', function(event) {
      self._handleClick(event);
    });
  },

  _handleClick(event) {
    var $target = $(event.target);

    // check if tab nav
    if ($target.parents('.nav-tabs').length) {
      return;
    }

    if (!this._shouldHandle($target)) {
      return;
    }

    var href = event.target.getAttribute('href');

    if (!href && $target.closest('a') && $target.closest('a')[0]) {

      var linkElement = $target.closest('a')[0];

      if (!this._shouldHandle($(linkElement))) {
        return;
      }

      href = linkElement.getAttribute('href');
    }

    event.preventDefault();

    if (!href) {
      throw 'couldn\'t find route target';
    }

    if (!href.startsWith('http')) {
      if (event.ctrlKey) {
        window.open(href, '_blank');
      } else {
        var relativeHref = href.replace(window.Sonarr.UrlBase, '');

        Backbone.history.navigate(relativeHref, { trigger: true });
      }
    } else if (href.contains('#')) {
      // Open in new tab without dereferer (since it doesn't support fragments)
      window.open(href, '_blank');
    } else {
      // Open in new tab
      window.open(`https://services.sonarr.tv/derefer/?url=${encodeURI(href)}`, '_blank');
    }
  },

  _shouldHandle($element) {
    if ($element.hasClass('no-router') || $element.is('[data-toggle="dropdown"]')) {
      return false;
    }

    return true;
  }
};

module.exports = routeBinder;
