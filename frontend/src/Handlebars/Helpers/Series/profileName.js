var Handlebars = require('handlebars');
var profileCollection = require('Profile/profileCollection');

function profileName(profileId) {
  const profile = profileCollection.get(profileId);

  if (!profile) {
    return;
  }

  const name = profile.get('name');
  return new Handlebars.SafeString(`<span class="label label-default profile-label">${name}</span>`);
}

module.exports = profileName;
