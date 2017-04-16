var Marionette = require('marionette');
var EditView = require("./Edit/EditProfileView");
var AppLayout = require('../../../AppLayout');
/*var ProfileCollection = require('../../Profile/ProfileCollection');
var ProfileCollectionView = require('./ProfileCollectionView');
var DelayProfileLayout = require('./Delay/DelayProfileLayout');
var DelayProfileCollection = require('./Delay/DelayProfileCollection');
var LanguageCollection = require('./Language/LanguageCollection');*/

module.exports = Marionette.Layout.extend({
    template : 'Settings/Profile/PreferredProfileLayout/PreferredProfileLayoutTemplate',

    regions : {
        profile      : '#profile',
        delayProfile : '#delay-profile'
    },

    events : {
      "click .profile-item" : "_edit"
    },

    initialize : function() {
        //this.settings = options.settings;
        /*ProfileCollection.fetch();

        this.delayProfileCollection = new DelayProfileCollection();
        this.delayProfileCollection.fetch();*/
    },

    _edit : function() {
      AppLayout.modalRegion.show(new EditView());
    },

    onShow : function() {
      /*  this.profile.show(new ProfileCollectionView({ collection : ProfileCollection }));
        this.delayProfile.show(new DelayProfileLayout({ collection : this.delayProfileCollection }));*/
    }
});
