const $ = require('jquery');
const _ = require('underscore');

$(document).ready(() => {
  const $window = $(window);
  const $scrollButton = $('#scroll-up');

  function onScroll() {
    if ($window.scrollTop() > 100) {
      $scrollButton.fadeIn();
    } else {
      $scrollButton.fadeOut();
    }
  }

  $window.scroll(_.throttle(onScroll, 500));

  $scrollButton.click(() => {
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});
