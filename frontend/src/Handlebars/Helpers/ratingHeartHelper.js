var handlebars = require('handlebars');

handlebars.registerHelper('ratingHeartHelper', function(context) {
    var title = '{0} votes'.format(context.votes);
    var html = '<span class="heart-rating" title="'+ title +'">' +
               '<i class="icon-sonarr-heart"></i><span>' + context.value * 10 + '%</span>' +
               '</span>';

    return new handlebars.SafeString(html);
});