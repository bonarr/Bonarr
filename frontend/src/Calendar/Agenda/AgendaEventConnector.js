import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createQueueItemSelector from 'Stores/Selectors/createQueueItemSelector';
import createUISettingsSelector from 'Stores/Selectors/createUISettingsSelector';
import AgendaEvent from './AgendaEvent';

function createMapStateToProps() {
  return createSelector(
    createQueueItemSelector(),
    createUISettingsSelector(),
    (queueItem, uiSettings) => {
      return {
        queueItem,
        timeFormat: uiSettings.timeFormat,
        longDateFormat: uiSettings.longDateFormat
      };
    }
  );
}

export default connect(createMapStateToProps)(AgendaEvent);
