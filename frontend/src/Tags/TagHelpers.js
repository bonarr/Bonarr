const _ = require('underscore');
const Handlebars = require('handlebars');
const TagCollection = require('./TagCollection');
const tagDisplayHelper = require('Handlebars/Helpers/Tags/tagDisplayHelper');

Handlebars.registerHelper('tagDisplay', tagDisplayHelper);

Handlebars.registerHelper('genericTagDisplay', (tags, classes) => {
  if (!tags) {
    return new Handlebars.SafeString('');
  }

  const tagLabels = _.map(tags.split(','), (tag) => {
    return '<span class="{0}">{1}</span>'.format(classes, tag);
  });

  return new Handlebars.SafeString(tagLabels.join(' '));
});
