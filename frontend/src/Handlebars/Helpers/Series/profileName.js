var Handlebars = require('handlebars');
var ProfileCollection = require('../../../Profile/ProfileCollection');

const profileName = function(profileId) {
  const profile = ProfileCollection.get(profileId);

  if (!profile) {
    return;
  }

  const name = profile.get('name');
  return new Handlebars.SafeString(`<span class="label label-default profile-label">${name}</span>`);
};

module.exports = profileName;
