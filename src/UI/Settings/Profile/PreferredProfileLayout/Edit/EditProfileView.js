var _ = require('underscore');
var Marionette = require('marionette');
// var LanguageCollection = require('../Language/LanguageCollection');
// var Config = require('../../../Config');
var AsModelBoundView = require('../../../../Mixins/AsModelBoundView');
var AsValidatedView = require('../../../../Mixins/AsValidatedView');
//require('../../../Mixins/TagInput');
require('bootstrap');
//require('bootstrap.tagsinput');

module.exports = Marionette.ItemView.extend({
		template : 'Settings/Profile/PreferredProfileLayout/Edit/EditProfileLayoutTemplate',

		ui : { cutoff : '.x-cutoff',
					preferred : '.x-preferred',
				},

		onRender : function() {

		},

		templateHelpers : function() {
		},

		getCutoff : function() {

		}
});

//AsValidatedView.call(view);

//module.exports = AsModelBoundView.call(view);
