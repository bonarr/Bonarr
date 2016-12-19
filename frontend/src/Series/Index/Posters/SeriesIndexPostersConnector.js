import { createSelector } from 'reselect';
import connectSection from 'Stores/connectSection';
import createClientSideCollectionSelector from 'Stores/Selectors/createClientSideCollectionSelector';
import createUISettingsSelector from 'Stores/Selectors/createUISettingsSelector';
import SeriesIndexPosters from './SeriesIndexPosters';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector(),
    createUISettingsSelector(),
    (series, uiSettings) => {
      return {
        showRelativeDates: uiSettings.showRelativeDates,
        shortDateFormat: uiSettings.shortDateFormat,
        timeFormat: uiSettings.timeFormat,
        ...series

      };
    }
  );
}

export default connectSection(
                createMapStateToProps,
                undefined,
                undefined,
                undefined,
                { section: 'series', uiSection: 'seriesIndex' }
              )(SeriesIndexPosters);
