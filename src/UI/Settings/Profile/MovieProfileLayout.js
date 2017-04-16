var $ = require('jquery');
var _ = require('underscore');
var vent = require('vent');
var Marionette = require('marionette');
var Backbone = require('backbone');
var MovieProfileLayout = require("./MovieProfileLayout/MovieProfileLayout");
var ProfileLayout = require("./ProfileLayout");
var PreferredProfileLayout = require("./PreferredProfileLayout/PreferredProfileLayout");
var SizeProfileLayout = require("./SizeProfileLayout/SizeProfileLayout");
var FlagsProfileLayout = require("./FlagsProfileLayout/FlagsProfileLayout");

module.exports = Marionette.Layout.extend({
		template : 'Settings/Profile/MovieProfileLayout',

		regions : {
				movie : '#movie-pr',
				quality        : '#quality-pr',
				preferred         : '#preferred',
				size        : '#size',
				flags  : '#flags',
		},

		ui : {
				movieTab : '.x-movie-pr-tab',
				qualityTab        : '.x-quality-pr-tab',
				preferredTab         : '.x-preferred-tab',
				sizeTab        : '.x-size-tab',
				flagsTab  : '.x-flags-tab',
		},

		events : {
				'click .x-movie-pr-tab' : '_showMovieProfiles',
				'click .x-quality-pr-tab'         : '_showQualityProfiles',
				'click .x-preferred-tab'          : '_showPreferredWords',
				'click .x-size-tab'         : '_showSizeProfiles',
				'click .x-flags-tab'  : '_showIndexerFlags',
		},

		initialize : function(options) {
				if (options.action) {
						this.action = options.action.toLowerCase();
				}

				this.listenTo(vent, vent.Hotkeys.SaveSettings, this._save);
		},

		onRender : function() {
				/*var self = this;

				this.mediaManagementSettings = new MediaManagementSettingsModel();
				this.namingSettings = new NamingModel();
				this.indexerSettings = new IndexerSettingsModel();
				this.netImportSettings = new NetImportSettingsModel();
				this.downloadClientSettings = new DownloadClientSettingsModel();
				this.notificationCollection = new NotificationCollection();
				this.generalSettings = new GeneralSettingsModel();
				this.uiSettings = new UiSettingsModel();
				Backbone.$.when(this.mediaManagementSettings.fetch(), this.namingSettings.fetch(), this.indexerSettings.fetch(), this.downloadClientSettings.fetch(),
						this.notificationCollection.fetch(), this.generalSettings.fetch(), this.uiSettings.fetch(), this.netImportSettings.fetch()).done(function() {
								if (!self.isClosed) {
										self.loading.$el.hide();
										self.mediaManagement.show(new MediaManagementLayout({
												settings       : self.mediaManagementSettings,
												namingSettings : self.namingSettings
										}));
										self.profiles.show(new ProfileLayout());
										self.quality.show(new QualityLayout());
										self.indexers.show(new IndexerLayout({ model : self.indexerSettings }));
										self.downloadClient.show(new DownloadClientLayout({ model : self.downloadClientSettings }));
										self.netImport.show(new NetImportLayout({model : self.netImportSettings}));
										self.notifications.show(new NotificationCollectionView({ collection : self.notificationCollection }));
										self.metadata.show(new MetadataLayout());
										self.general.show(new GeneralView({ model : self.generalSettings }));
										self.uiRegion.show(new UiView({ model : self.uiSettings }));
								}
						});

				this._setAdvancedSettingsState();*/

        this.movie.show(new MovieProfileLayout());
        this.quality.show(new ProfileLayout());
        this.preferred.show(new PreferredProfileLayout());
        this.size.show(new SizeProfileLayout());
        this.flags.show(new FlagsProfileLayout());
        this._showMovieProfiles();
		},

		onShow : function() {
				switch (this.action) {
						case 'movie-pr':
								this._showMovieProfiles();
								break;
						case 'quality-pr':
								this._showQualityProfiles();
								break;
						case 'preferred':
								this._showPreferredWords();
								break;
						case 'size':
								this._showSizeProfiles();
								break;
						case "flags":
								this._showIndexerFlags();
								break;
						default:
								this._showMovieProfiles();
				}
		},

		_showMovieProfiles : function(e) {
				if (e) {
						e.preventDefault();
				}

				this.ui.movieTab.tab('show');
				this._navigate('settings/profiles/movie');
		},

		_showQualityProfiles : function(e) {
				if (e) {
						e.preventDefault();
				}

				this.ui.qualityTab.tab('show');
				this._navigate('settings/profiles/quality');
		},

		_showPreferredWords : function(e) {
				if (e) {
						e.preventDefault();
				}

				this.ui.preferredTab.tab('show');
				this._navigate('settings/profiles/preferred');
		},

		_showSizeProfiles : function(e) {
				if (e) {
						e.preventDefault();
				}

				this.ui.sizeTab.tab('show');
				this._navigate('settings/profiles/size');
		},

		_showIndexerFlags : function(e) {
				if (e) {
						e.preventDefault();
				}

				this.ui.flagsTab.tab('show');
				this._navigate('settings/profiles/indexerflags');
		},

		_navigate : function(route) {
				Backbone.history.navigate(route, {
						trigger : false,
						replace : true
				});
		},

		_save : function() {
				vent.trigger(vent.Commands.SaveSettings);
		},

		/*_setAdvancedSettingsState : function() {
				var checked = Config.getValueBoolean(Config.Keys.AdvancedSettings);
				this.ui.advancedSettings.prop('checked', checked);

				if (checked) {
						$('body').addClass('show-advanced-settings');
				}
		},*/

		/*_toggleAdvancedSettings : function() {
				var checked = this.ui.advancedSettings.prop('checked');
				Config.setValue(Config.Keys.AdvancedSettings, checked);

				if (checked) {
						$('body').addClass('show-advanced-settings');
				} else {
						$('body').removeClass('show-advanced-settings');
				}
		}*/
});
