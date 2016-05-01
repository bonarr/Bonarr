const handlebars = require('handlebars');

function heartRating(ratings) {
  const html =
  `<span class="heart-rating" title="${ratings.votes} votes">
      <i class="icon-sonarr-heart"></i><span>${ratings.value * 10}%</span>
   </span>`;

  return new handlebars.SafeString(html);
}

module.exports = heartRating;
