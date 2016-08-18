import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import LoadingIndicator from 'Components/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import SelectInput from 'Components/Form/SelectInput';
import styles from './UISettings.css';

function getSettingValue(settings, pending, property) {
  if (pending.hasOwnProperty(property)) {
    return pending[property];
  }

  return settings[property];
}

class UISettings extends Component {

  //
  // Listeners

  @autobind
  onSubmit(event) {
    event.preventDefault();
    event.nativeEvent.preventDefault();

    this.props.onSubmit();
  }

  //
  // Render

  render() {
    const {
      fetching,
      error,
      settings,
      pending,
      saving,
      saveError,
      onSubmit,
      onInputChange
    } = this.props;

    const firstDayOfWeek = getSettingValue(settings, pending, 'firstDayOfWeek');
    const calendarWeekColumnHeader = getSettingValue(settings, pending, 'calendarWeekColumnHeader');

    const weekColumnOptions = [
      { 'ddd M/D': 'Tue 3/5' },
      { 'ddd MM/DD': 'Tue 03/05' },
      { 'ddd D/M': 'Tue 5/3' },
      { 'ddd DD/MM': 'Tue 05/03' }
    ];

    return (
      <PageContent>
        {/* <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              iconName="icon-sonarr-save"
              animate={backupExecuting}
              onPress={onSavePress}
            />
          </PageToolbarSection>
        </PageToolbar> */}

        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && error &&
              <div>Unable to load UI settings</div>
          }

          {
            !fetching && !error &&
              <form onSubmit={this.onSubmit}>
                <FieldSet
                  legend="Calendar"
                >
                  <FormGroup>
                    <FormLabel>First Day of Week</FormLabel>
                    <FormInputGroup>
                      <SelectInput
                        name="firstDayOfWeek"
                        value={firstDayOfWeek}
                        values={[{ 0: 'Sunday' }, { 1: 'Monday' }]}
                        onChange={onInputChange}
                      />
                    </FormInputGroup>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Week Column Header</FormLabel>
                    <FormInputGroup>
                      <SelectInput
                        name="calendarWeekColumnHeader"
                        value={calendarWeekColumnHeader}
                        values={weekColumnOptions}
                        onChange={onInputChange}
                      />
                    </FormInputGroup>
                  </FormGroup>
                </FieldSet>
                <button type="submit">Save</button>
              </form>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

UISettings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.array.isRequired,
  settings: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default UISettings;
