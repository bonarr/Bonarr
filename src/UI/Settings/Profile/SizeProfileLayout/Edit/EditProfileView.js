var _ = require('underscore');
var Marionette = require('marionette');
// var LanguageCollection = require('../Language/LanguageCollection');
// var Config = require('../../../Config');
var AsModelBoundView = require('../../../../Mixins/AsModelBoundView');
var AsValidatedView = require('../../../../Mixins/AsValidatedView');
var QualityDefinitions = require("../../../Quality/QualityLayout.js");
//require('../../../Mixins/TagInput');
require('bootstrap');
//require('bootstrap.tagsinput');

module.exports = Marionette.Layout.extend({
		template : 'Settings/Profile/SizeProfileLayout/Edit/EditProfileLayoutTemplate',

		ui : { cutoff : '.x-cutoff',
					preferred : '.x-preferred',
				},

		regions : {
			definitions : "#quality-pr-definitions"
		},

		onRender : function() {
			this.definitions.show(new QualityDefinitions());
		},

		templateHelpers : function() {
		},

		getCutoff : function() {

		}
});

//AsValidatedView.call(view);

//module.exports = AsModelBoundView.call(view);
