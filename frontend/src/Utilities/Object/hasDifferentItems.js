import _ from 'lodash';

function hasDifferentItems(nextItems, currentItems, idProp = 'id') {
  return !!_.differenceBy(nextItems, currentItems, (item) => item[idProp]).length;
}

export default hasDifferentItems;
