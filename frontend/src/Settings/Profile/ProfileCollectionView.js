const _ = require('underscore');
const vent = require('vent');
const Marionette = require('marionette');
const ProfileView = require('./ProfileView');
const EditProfileView = require('./Edit/EditProfileLayout');
const ProfileSchemaCollection = require('./ProfileSchemaCollection');
const tpl = require('./ProfileCollectionView.hbs');

module.exports = Marionette.CompositeView.extend({
  childView: ProfileView,
  childViewContainer: '.profiles',
  template: tpl,

  ui: {
    'addCard': '.x-add-card'
  },

  events: {
    'click .x-add-card': 'onAddClick'
  },

  appendHtml(collectionView, childView, index) {
    collectionView.ui.addCard.before(childView.el);
  },

  onAddClick() {
    const self = this;
    const profileSchemaCollection = new ProfileSchemaCollection();
    profileSchemaCollection.fetch({
      success(collection) {
        const model = _.first(collection.models);
        model.set('id', undefined);
        model.set('name', '');
        model.collection = self.collection;
        const view = new EditProfileView({
          model,
          profileCollection: self.collection
        });

        vent.trigger(vent.Commands.OpenFullscreenModal, view);
      }
    });
  }
});
