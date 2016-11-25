import { createSelector } from 'reselect';

// TODO: Get UI Settings from the state tree
import UiSettingsModel from 'Shared/UiSettingsModel';

function createUISettingsSelector() {
  return createSelector(
    () => {
      return UiSettingsModel.toJSON();
    }
  );
}

export default createUISettingsSelector;
