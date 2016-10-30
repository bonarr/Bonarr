import React, { PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import LoadingIndicator from 'Components/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

function IndexerOptions(props) {
  const {
    advancedSettings,
    fetching,
    error,
    settings,
    hasSettings,
    onInputChange
  } = props;

  return (
    <FieldSet
      legend="Options"
    >
      {
        fetching &&
          <LoadingIndicator />
      }

      {
        !fetching && error &&
          <div>Unable to load indexer options</div>
      }

      {
        hasSettings && !fetching && !error &&
          <Form>
            <FormGroup>
              <FormLabel>Minimum Age</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="minimumAge"
                helpText="Usenet only: Minimum age in minutes of NZBs before they are grabbed. Use this to give new releases time to propagate to your usenet provider."
                onChange={onInputChange}
                {...settings.minimumAge}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Retention</FormLabel>

              <FormInputGroup
                type={inputTypes.NUMBER}
                name="retention"
                helpText="Usenet only: Set to zero to set for unlimited retention"
                onChange={onInputChange}
                {...settings.retention}
              />
            </FormGroup>

            {
              advancedSettings &&
                <FormGroup>
                  <FormLabel>RSS Sync Interval</FormLabel>

                  <FormInputGroup
                    type={inputTypes.NUMBER}
                    name="rssSyncInterval"
                    helpText="Interval in minutes. Set to zero to disable (this will stop all automatic release grabbing)"
                    helpTextWarning="This will apply to all indexers, please follow the rules set forth by them"
                    onChange={onInputChange}
                    {...settings.rssSyncInterval}
                  />
                </FormGroup>
            }
          </Form>
      }
    </FieldSet>
  );
}

IndexerOptions.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default IndexerOptions;
