var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
var AppLayout = require('AppLayout');
var HealthView = require('../Health/HealthView');
var QueueView = require('Activity/Queue/QueueView');
var ResolutionUtility = require('../Utilities/ResolutionUtility');
var items = require('./MenuItems');

module.exports = Marionette.Layout.extend({
  template: 'Sidebar/SidebarLayout',

  className: 'aside-inner',

  regions: {
    health: '.x-health',
    queue: '.x-queue'
  },

  ui: {
    sidebar: '.sidebar',
    collapse: '.x-navbar-collapse',
    lists: 'ul',
    listItems: 'li'
  },

  events: {
    'click a': '_onClick',
    'mouseenter .x-nav-root': '_onRootHover'
  },

  initialize() {
    var self = this;

    $('[data-toggle-state]').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $target = $(this);
      var toggleState = $target.data('toggleState');

      if (toggleState) {
        self.$body.toggleClass(toggleState);

        // Remove the floating navbar and the aside-collapsed class
        if (toggleState === 'aside-toggled') {
          self.$aside.children('.nav-floating').remove();
          self.$body.removeClass('aside-collapsed');
        }
      }
      // some elements may need this when toggled class change the content size
      // e.g. sidebar collapsed mode and jqGrid
      $(window).resize();
    });

    this.listenTo(AppLayout.mainRegion, 'show', this._onMainRegionShow);
  },

  serializeData() {
    return items;
  },

  onShow() {
    this.health.show(new HealthView());
    this.queue.show(new QueueView());

    this._setActiveBasedOnUri();

    this.$body = $('body');
    this.$aside = $('.aside');
    this.$asideInner = this.$el;
  },

  _onMainRegionShow() {
    this._setActiveBasedOnUri();
  },

  _onClick(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $li = $target.closest('li');
    this._closeSidebar($li);
    this._setActive($li);
  },

  _onRootHover(event) {
    this._removeFloatingNav();

    if (!this.$body.hasClass('aside-collapsed')) {
      return;
    }

    var $navRoot = $(event.target).closest('.x-nav-root');
    var $subNav = $navRoot.children('.x-nav-sub');
    if (!$subNav.length) {
      return;
    }

    event.stopPropagation();

    var marginTop = parseInt(this.$asideInner.css('padding-top'), 0) + parseInt(this.$aside.css('padding-top'), 0);
    var itemTop = $navRoot.position().top + marginTop - this.ui.sidebar.scrollTop();

    var $subNavClone = $subNav.clone().addClass('nav-floating').css({
      position: 'fixed',
      top: itemTop
    }).appendTo(this.$aside);

    $subNavClone.on('mouseleave click', _.bind(function() {
      $subNavClone.remove();
      this._closeSidebar($subNavClone);
    }, this));
  },

  _setActiveBasedOnUri() {
    var location = window.location.pathname;
    var $href = this.$('a[href="' + location + '"]');
    var $li = $href.closest('li');
    this._setActive($li);
  },

  _setActive(element) {
    var $root = element.closest('.x-nav-root');
    var $subnav = $root.find('.sidebar-subnav');

    if (!$subnav.hasClass('in')) {
      this.ui.lists.removeClass('in');
      $subnav.addClass('in');
    }

    this.ui.listItems.removeClass('active');
    element.addClass('active');
    $root.addClass('active');
  },

  _removeFloatingNav() {
    $('.sidebar-subnav.nav-floating').remove();
    this.ui.listItems.find('.open').removeClass('open');
  },

  _closeSidebar(element) {
    if (element.hasClass('x-nav-root') && element.children('.x-nav-sub').length > 0 && !element.hasClass('active')) {
      return;
    }

    if (ResolutionUtility.isMobile()) {
      this.$aside.children('.nav-floating').remove();
      Marionette.$('body').removeClass('actionbar-extended aside-toggled aside-collapsed');
    }
  }
});
