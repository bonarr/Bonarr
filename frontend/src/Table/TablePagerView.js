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
    return this.collection.state.toJSON();
  },

  onRender() {
    this.listenTo(this.collection.state, 'change', _.debounce(this._update, 10));
    this._update();
  },

  _goToPage(e, page) {
    e.preventDefault();

    this.collection.state.set('page', page);
    const promise = this.collection.fetch();

    $(e.target).spinForPromise(promise);
  },

  _update() {
    const state = this.collection.state;
    const page = state.get('page');
    const totalPages = state.get('totalPages');
    const totalRecords = state.get('totalRecords');

    this.ui.page.text(page);
    this.ui.totalPages.text(totalPages);
    this.ui.totalRecords.text(FormatHelpers.number(totalRecords));

    this.ui.firstPageBtn.toggleClass('disabled', page === 1);
    this.ui.previousPageBtn.toggleClass('disabled', page === 1);
    this.ui.nextPageBtn.toggleClass('disabled', page === totalPages);
    this.ui.lastPageBtn.toggleClass('disabled', page === totalPages);
  },

  onFirstPageClick(e) {
    const promise = this.collection.firstPage();

    $(e.target).spinForPromise(promise);
  },

  onPreviousPageClick(e) {
    const promise = this.collection.previousPage();

    $(e.target).spinForPromise(promise);
  },

  onNextPageClick(e) {
    const promise = this.collection.nextPage();

    $(e.target).spinForPromise(promise);
  },

  onLastPageClick(e) {
    const promise = this.collection.lastPage();

    $(e.target).spinForPromise(promise);
  },

  onPageInfoClick(e) {
    e.preventDefault();

    const state = this.collection.state;
    const select = $('<select class="x-page-selector"></select>');

    for (var i = 0; i < state.get('totalPages'); i++) {
      const page = i + 1;

      if (page === state.get('page')) {
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

    const selectedPage = $(e.target).val();
    const promise = this.collection.page(selectedPage);
    this.ui.pageSelectorSpinner.show();
    this.ui.pageSelectorContainer.empty();

    promise.always(() => {
      this.ui.pageSelectorSpinner.hide();
      this.ui.pageInfo.show();
    });
  }

});

module.exports = TablePagerView;
