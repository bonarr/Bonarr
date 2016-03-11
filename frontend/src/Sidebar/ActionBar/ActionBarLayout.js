var _ = require('underscore');
var vent = require('vent');
var Marionette = require('marionette');
var ButtonCollection = require('./ButtonCollection');
var ButtonModel = require('./ButtonModel');
var ActionCollectionView = require('./Action/ActionCollectionView');
var RadioCollectionView = require('./Radio/RadioCollectionView');
var SortingCollectionView = require('./Sorting/SortingCollectionView');
var FilteringCollectionView = require('./Filtering/FilteringCollectionView');
var ResolutionUtility = require('../../Utilities/ResolutionUtility');

module.exports = Marionette.Layout.extend({
  template: 'Sidebar/ActionBar/ActionBarLayoutTemplate',
  className: 'aside-inner actionbar',

  regions: {
    actionsRegion: '.x-actions',
    viewsRegion: '.x-views',
    filteringRegion: '.x-filtering',
    sortingRegion: '.x-sorting'
  },

  ui: {
    options: '.x-options'
  },

  events: {
    'click .x-options': '_toggleOptions'
  },

  initialize(options) {
    if (!options) {
      throw 'options needs to be passed';
    }

    if (!options.parentView) {
      throw 'context needs to be passed';
    }

    this.parentView = options.parentView;
    this.collection = options.collection;
    this.actions = options.actions;
    this.views = options.views;
    this.filtering = options.filtering;
    this.sorting = options.sorting;

    this.listenTo(this.parentView, 'close', function() {
      vent.trigger(vent.Commands.CloseActionBarCommand);
    });
  },

  onShow() {
    if (!this.views && !this.filtering && !this.sorting) {
      this.ui.options.hide();
    }

    if (this.actions) {
      var actionCollection = this._buildCollection(this.actions);
      this.actionsRegion.show(new ActionCollectionView({
        menu: this.actions,
        collection: actionCollection
      }));
    }

    if (this.views) {
      var viewCollection = this._buildCollection(this.views);
      this.viewsRegion.show(new RadioCollectionView({
        menu: this.views,
        collection: viewCollection
      }));
    }

    if (this.filtering) {
      var filteringCollection = this._buildCollection(this.filtering);
      this.filteringRegion.show(new FilteringCollectionView({
        menu: this.filtering,
        collection: filteringCollection,
        viewCollection: this.collection
      }));
    }

    if (this.sorting) {
      var sortingCollection = this._buildCollection(this.sorting);
      this.sortingRegion.show(new SortingCollectionView({
        menu: this.sorting,
        collection: sortingCollection,
        viewCollection: this.collection
      }));
    }
  },

  _buildCollection(buttonGroup) {
    var collection = new ButtonCollection();

    _.each(buttonGroup.items, function(button) {
      if (buttonGroup.storeState && !button.key) {
        throw 'must provide key for all buttons when storeState is enabled';
      }

      var model = new ButtonModel(button);
      model.set('menuKey', buttonGroup.menuKey);
      model.ownerContext = this.parentView;
      collection.add(model);
    }, this);

    return collection;
  },

  _toggleOptions() {
    Marionette.$('body').toggleClass('actionbar-extended');

    if (ResolutionUtility.isMobile()) {
      Marionette.$('body').toggleClass('aside-collapsed');
    }
  }
});
