import _ from 'lodash';

function toggleSelected(state, id, selected, shiftKey) {
  let allSelected = true;
  let allUnselected = true;

  const lastToggled = state.lastToggled;
  const selectedState = {
    ...state.selectedState,
    [id]: selected
  };

  if (shiftKey && state.lastToggled) {
    const items = this.props.items;

    const lastToggledIndex = _.findIndex(items, { id: lastToggled });
    const changedIndex = _.findIndex(items, { id });
    let lower = 0;
    let upper = 0;

    if (lastToggledIndex > changedIndex) {
      lower = changedIndex;
      upper = lastToggledIndex + 1;
    } else {
      lower = lastToggledIndex;
      upper = changedIndex;
    }

    for (let i = lower; i < upper; i++) {
      selectedState[items[i].id] = selected;
    }
  }

  Object.keys(selectedState).forEach((key) => {
    if (selectedState[key]) {
      allUnselected = false;
    } else {
      allSelected = false;
    }
  });

  return {
    allSelected,
    allUnselected,
    lastToggled: id,
    selectedState
  };
}

export default toggleSelected;
