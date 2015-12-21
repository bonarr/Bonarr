var Marionette = require('marionette');
var RadioView = require('./RadioView');
var Config = require('Config');

module.exports = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'actionbar-list actionbar-radio-list',
  itemView: RadioView,

  attributes: {
    'data-toggle': 'buttons'
  },

  initialize: function(options) {
    this.menu = options.menu;

    this.setActive();

    this.listenTo(this, 'itemview:click', this.itemViewClicked);
  },

  setActive: function() {
    var storedKey = this.menu.defaultAction;

    if (this.menu.storeState) {
      storedKey = Config.getValue(this.menu.menuKey, storedKey);
    }

    if (!storedKey) {
      return;
    }
    this.collection.each(function(model) {
      if (model.get('key').toLocaleLowerCase() === storedKey.toLowerCase()) {
        model.set('active', true);
      } else {
        model.set('active', false);
      }
    });
  },

  itemViewClicked: function(itemView) {
    this.children.each(function(view) {
      if (view.model.get('key').toLocaleLowerCase() === itemView.model.get('key').toLowerCase()) {
        view.model.set('active', true);
        view.$el.addClass('active');
      } else {
        view.model.set('active', false);
        view.$el.removeClass('active');
      }
    });
  }
});