import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import inputTypes from 'Utilities/inputTypes';
import LoadingIndicator from 'Components/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

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
      saving,
      hasPendingChanges,
      onInputChange,
      ...otherProps
    } = this.props;

    const weekColumnOptions = [
      { 'ddd M/D': 'Tue 3/5' },
      { 'ddd MM/DD': 'Tue 03/05' },
      { 'ddd D/M': 'Tue 5/3' },
      { 'ddd DD/MM': 'Tue 05/03' }
    ];

    const shortDateFormatOptions = [
      { 'MMM D YYYY': 'Mar 5 2014' },
      { 'DD MMM YYYY': '5 Mar 2014' },
      { 'MM/D/YYYY': '03/5/2014' },
      { 'MM/DD/YYYY': '03/05/2014' },
      { 'DD/MM/YYYY': '05/03/2014' },
      { 'YYYY-MM-DD': '2014-03-05' }
    ];

    const longDateFormatOptions = [
      { 'dddd, MMMM D YYYY': 'Tuesday, March 5, 2014' },
      { 'dddd, D MMMM YYYY': 'Tuesday, 5 March, 2014' }
    ];

    const timeFormatOptions = [
      { 'h(:mm)a': '5pm/5:30pm' },
      { 'HH:mm': '17:00/17:30' }
    ];

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              iconName="icon-sonarr-save"
              animate={saving}
              isDisabled={!hasPendingChanges}
              onPress={this.onSubmit}
            />
          </PageToolbarSection>
        </PageToolbar>

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
              <Form
                id="uiSettings"
                {...otherProps}
                onSubmit={this.onSubmit}
              >
                <FieldSet
                  legend="Calendar"
                >
                  <FormGroup>
                    <FormLabel>First Day of Week</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="firstDayOfWeek"
                      values={[{ 0: 'Sunday' }, { 1: 'Monday' }]}
                      onChange={onInputChange}
                      {...settings.firstDayOfWeek}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Week Column Header</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="calendarWeekColumnHeader"
                      values={weekColumnOptions}
                      onChange={onInputChange}
                      helpText="Shown above each column when week is the active view"
                      {...settings.calendarWeekColumnHeader}
                    />
                  </FormGroup>
                </FieldSet>

                <FieldSet
                  legend="Dates"
                >
                  <FormGroup>
                    <FormLabel>Short Date Format</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="shortDateFormat"
                      values={shortDateFormatOptions}
                      onChange={onInputChange}
                      {...settings.shortDateFormat}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Long Date Format</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="longDateFormat"
                      values={longDateFormatOptions}
                      onChange={onInputChange}
                      {...settings.longDateFormat}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Time Format</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="timeFormat"
                      values={timeFormatOptions}
                      onChange={onInputChange}
                      {...settings.timeFormat}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Show Relative Dates</FormLabel>
                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="showRelativeDates"
                      helpText="Show relative (Today/Yesterday/etc) or absolute dates"
                      onChange={onInputChange}
                      {...settings.showRelativeDates}
                    />
                  </FormGroup>
                </FieldSet>

                <FieldSet
                  legend="Style"
                >
                  <FormGroup>
                    <FormLabel>Enable Color-Impaired mode</FormLabel>
                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="enableColorImpairedMode"
                      helpText="Altered style to allow color-impaired users to better distinguish color coded information"
                      onChange={onInputChange}
                      {...settings.enableColorImpairedMode}
                    />
                  </FormGroup>
                </FieldSet>
              </Form>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

UISettings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  hasPendingChanges: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default UISettings;
