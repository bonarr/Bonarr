import _ from 'lodash';
import { createSelector } from 'reselect';
import { sortDirections } from 'Helpers/Props';

function createClientSideCollectionSelector() {
  return createSelector(
    (state, { section }) => state[section],
    (sectionState) => {
      const {
        items,
        filterKey,
        filterValue,
        sortKey,
        sortDirection,
        sortPredicate
      } = sectionState;

      // Filter items
      // Sort items

      const sorted = _.orderBy(items, (item) => {
        if (sortPredicate) {
          return sortPredicate(item, sortDirection);
        }

        return item[sortKey];
      }, sortDirection === sortDirections.ASCENDING ? 'asc' : 'desc');

      return {
        ...sectionState,
        items: sorted
      };
    }
  );
}

export default createClientSideCollectionSelector;
