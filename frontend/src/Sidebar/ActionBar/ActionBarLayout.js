const _ = require('underscore');
const $ = require('jquery');
const vent = require('vent');
const Marionette = require('marionette');
const ButtonCollection = require('./ButtonCollection');
const ButtonModel = require('./ButtonModel');
const ActionCollectionView = require('./Action/ActionCollectionView');
const RadioCollectionView = require('./Radio/RadioCollectionView');
const SortingCollectionView = require('./Sorting/SortingCollectionView');
const FilteringCollectionView = require('./Filtering/FilteringCollectionView');
const ResolutionUtility = require('../../Utilities/ResolutionUtility');
const tpl = require('./ActionBarLayout.hbs');

const ActionBarLayout = Marionette.LayoutView.extend({
  template: tpl,
  className: 'actionbar',

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
      throw new Error('options needs to be passed');
    }

    if (!options.parentView) {
      throw new Error('context needs to be passed');
    }

    this.parentView = options.parentView;
    this.collection = options.collection;
    this.actions = options.actions;
    this.views = options.views;
    this.filtering = options.filtering;
    this.sorting = options.sorting;

    this.listenTo(this.parentView, 'destroy', () => {
      vent.trigger(vent.Commands.CloseActionBarCommand);
    });
  },

  onShow() {
    if (!this.views && !this.filtering && !this.sorting) {
      this.ui.options.hide();
    }

    if (this.actions) {
      const actionCollection = this._buildCollection(this.actions);
      this.actionsRegion.show(new ActionCollectionView({
        collection: actionCollection
      }));
    }

    if (this.views) {
      const viewCollection = this._buildCollection(this.views);
      this.viewsRegion.show(new RadioCollectionView({
        menu: this.views,
        collection: viewCollection
      }));
    }

    if (this.filtering) {
      const filteringCollection = this._buildCollection(this.filtering);
      this.filteringRegion.show(new FilteringCollectionView({
        menu: this.filtering,
        collection: filteringCollection,
        viewCollection: this.collection
      }));
    }

    if (this.sorting) {
      const sortingCollection = this._buildCollection(this.sorting);
      this.sortingRegion.show(new SortingCollectionView({
        menu: this.sorting,
        collection: sortingCollection,
        viewCollection: this.collection
      }));
    }
  },

  _buildCollection(buttonGroup) {
    const collection = new ButtonCollection();

    _.each(buttonGroup.items, (button) => {
      if (buttonGroup.storeState && !button.key) {
        throw new Error('must provide key for all buttons when storeState is enabled');
      }

      const model = new ButtonModel(button);
      model.set('menuKey', buttonGroup.menuKey);
      model.ownerContext = this.parentView;
      collection.add(model);
    }, this);

    return collection;
  },

  _toggleOptions() {
    $('body').toggleClass('actionbar-extended');

    if (ResolutionUtility.isMobile()) {
      $('body').toggleClass('aside-collapsed');
    }
  }
});

module.exports = ActionBarLayout;
