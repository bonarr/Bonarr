import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createQueueItemSelector from 'Stores/Selectors/createQueueItemSelector';
import createUISettingsSelector from 'Stores/Selectors/createUISettingsSelector';
import CalendarEvent from './CalendarEvent';

function createMapStateToProps() {
  return createSelector(
    createQueueItemSelector(),
    createUISettingsSelector(),
    (queueItem, uiSettings) => {
      return {
        queueItem,
        timeFormat: uiSettings.timeFormat
      };
    }
  );
}

export default connect(createMapStateToProps)(CalendarEvent);
