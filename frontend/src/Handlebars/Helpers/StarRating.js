var handlebars = require('handlebars');

handlebars.registerHelper('starRating', function (context) {
  var title = '{0}/10 with {1} votes'.format(context.value, context.votes);
  var html = '<div class="star-rating" title="' + title + '">';

  var score = context.value / 2;

  for (var i = 0; i < 5; i++) {
    if (i < score && i+1 > score) {
      html = html + ' <i class="fa fa-star-half-o"></i>';
    } else {
      if (i < score) {
        html = html + ' <i class="fa fa-star"></i>';
      }
      else {
        html = html + ' <i class="fa fa-star-o"></i>';
      }
    }
  }

  html = html + '</div>';

  return new handlebars.SafeString(html);
});