const _ = require('underscore');
const $ = require('jquery');
const Marionette = require('marionette');
const FormatHelpers = require('Shared/FormatHelpers');
const tpl = require('./TablePagerView.hbs');

const TablePagerView = Marionette.ItemView.extend({
  className: 'table-pager',
  template: tpl,

  ui: {
    page: '.x-page',
    totalPages: '.x-total-pages',
    totalRecords: '.x-total-records',
    firstPageBtn: '.x-first-page-btn',
    previousPageBtn: '.x-previous-page-btn',
    nextPageBtn: '.x-next-page-btn',
    lastPageBtn: '.x-last-page-btn',
    pageInfo: '.x-page-info',
    pageSelector: '.x-page-selector',
    pageSelectorContainer: '.x-page-selector-container',
    pageSelectorSpinner: '.x-page-selector-spinner'
  },

  events: {
    'click .x-first-page-btn': 'onFirstPageClick',
    'click .x-previous-page-btn': 'onPreviousPageClick',
    'click .x-next-page-btn': 'onNextPageClick',
    'click .x-last-page-btn': 'onLastPageClick',
    'click .x-page-info': 'onPageInfoClick',
    'change .x-page-selector': 'onPageSelectorChange'
  },

  initialize(options = {}) {
    this.collection = options.collection;
  },

  serializeData() {
    return this.collection.state;
  },

  onRender() {
    this.listenTo(this.collection || this.collection.fullCollection, 'reset sync', _.debounce(this._update, 10));
    this._update();
  },

  _gotToPage(e, page) {
    e.preventDefault();

    this.collection.state.page = page;
    const promise = this.collection.fetch();

    $(e.target).spinForPromise(promise);
  },

  _update() {
    const state = this.collection.state;
    this.ui.page.text(state.page);
    this.ui.totalPages.text(state.totalPages);
    this.ui.totalRecords.text(FormatHelpers.number(state.totalRecords));

    this.ui.firstPageBtn.toggleClass('disabled', state.page === 1);
    this.ui.previousPageBtn.toggleClass('disabled', state.page === 1);
    this.ui.nextPageBtn.toggleClass('disabled', state.page === state.totalPages);
    this.ui.lastPageBtn.toggleClass('disabled', state.page === state.totalPages);
  },

  onFirstPageClick(e) {
    this._gotToPage(e, 1);
  },

  onPreviousPageClick(e) {
    this._gotToPage(e, this.collection.state.page - 1);
  },

  onNextPageClick(e) {
    this._gotToPage(e, this.collection.state.page + 1);
  },

  onLastPageClick(e) {
    this._gotToPage(e, this.collection.state.totalPages);
  },

  onPageInfoClick(e) {
    e.preventDefault();

    const state = this.collection.state;
    const select = $('<select class="x-page-selector"></select>');

    for (var i = 0; i < state.totalPages; i++) {
      const page = i + 1;

      if (page === state.page) {
        select.append(`<option value="${page}" selected>${page}</option>`);
      } else {
        select.append(`<option value="${page}">${page}</option>`);
      }
    }

    this.ui.pageInfo.hide();
    this.ui.pageSelectorContainer.html(select);
  },

  onPageSelectorChange(e) {
    e.preventDefault();

    this.collection.state.page = $(e.target).val();
    this.ui.pageSelectorSpinner.show();
    this.ui.pageSelectorContainer.empty();

    const promise = this.collection.fetch();

    promise.always(() => {
      this.ui.pageSelectorSpinner.hide();
      this.ui.pageInfo.show();
    });
  }

});

module.exports = TablePagerView;
