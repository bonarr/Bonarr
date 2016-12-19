import _ from 'lodash';
import { createSelector } from 'reselect';
import { filterTypes, sortDirections } from 'Helpers/Props';

const filterTypePredicates = {
  [filterTypes.CONTAINS]: function(value, filterValue) {
    return value.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
  },

  [filterTypes.EQUAL]: function(value, filterValue) {
    return value === filterValue;
  },

  [filterTypes.GREATER_THAN]: function(value, filterValue) {
    return value > filterValue;
  },

  [filterTypes.GREATER_THAN_OR_EQUAL]: function(value, filterValue) {
    return value >= filterValue;
  },

  [filterTypes.LESS_THAN]: function(value, filterValue) {
    return value < filterValue;
  },

  [filterTypes.LESS_THAN_OR_EQUAL]: function(value, filterValue) {
    return value <= filterValue;
  },

  [filterTypes.NOT_EQUAL]: function(value, filterValue) {
    return value !== filterValue;
  }
};

function filter(items, state) {
  const {
    filterKey,
    filterValue,
    filterType,
    filterPredicates
  } = state;

  if (!filterKey || !filterValue) {
    return items;
  }

  return _.filter(items, (item) => {
    if (filterPredicates && filterPredicates.hasOwnProperty(filterKey)) {
      return filterPredicates[filterKey](item);
    }

    if (item.hasOwnProperty(filterKey)) {
      return filterTypePredicates[filterType](item[filterKey], filterValue);
    }

    return false;
  });
}

function createClientSideCollectionSelector() {
  return createSelector(
    (state, { section }) => state[section],
    (state, { uiSection }) => state[uiSection],
    (sectionState, uiSectionState = {}) => {
      const state = Object.assign({}, sectionState, uiSectionState);

      const {
        items,
        sortKey,
        sortDirection,
        sortPredicates
      } = state;

      const filtered = filter(items, state);

      const sorted = _.orderBy(filtered, (item) => {
        if (sortPredicates && sortPredicates.hasOwnProperty(sortKey)) {
          return sortPredicates[sortKey](item, sortDirection);
        }

        return item[sortKey];
      }, sortDirection === sortDirections.ASCENDING ? 'asc' : 'desc');

      return {
        ...sectionState,
        ...uiSectionState,
        items: sorted
      };
    }
  );
}

export default createClientSideCollectionSelector;
