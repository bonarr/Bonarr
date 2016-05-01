const _ = require('underscore');
const Handlebars = require('handlebars');
const TagCollection = require('Tags/TagCollection');

function tagDisplayHelper(tags) {
  const selectedTags = TagCollection.filter((tag) => {
    return _.contains(tags, tag.get('id'));
  });

  const tagLabels = _.map(selectedTags, (tag) => {
    const lable = tag.get('label');
    return `<span class="label label-info"><i class="icon-sonarr-tag"/>${lable}</span>`;
  });

  return new Handlebars.SafeString(tagLabels.join(' '));
}

module.exports = tagDisplayHelper;
