import _ from 'lodash';

function getSelectedIds(selectedState) {
  return _.reduce(selectedState, (result, value, id) => {
    if (value) {
      result.push(parseInt(id));
    }

    return result;
  }, []);
}

export default getSelectedIds;
