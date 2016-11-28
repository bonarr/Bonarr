import React, { PropTypes } from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/LoadingIndicator';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import styles from './DownloadClientOptions.css';

function DownloadClientOptions(props) {
  const {
    advancedSettings,
    fetching,
    error,
    settings,
    hasSettings,
    onInputChange
  } = props;

  return (
    <div>
      {
        fetching &&
          <LoadingIndicator />
      }

      {
        !fetching && error &&
          <div>Unable to load download client options</div>
      }

      {
        hasSettings && !fetching && !error &&
          <div>
            <FieldSet
              legend="Completed Download Handling"
            >
              <Form>
                <FormGroup>
                  <FormLabel>Enable</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="enableCompletedDownloadHandling"
                    helpText="Automatically import completed downloads from download client"
                    onChange={onInputChange}
                    {...settings.enableCompletedDownloadHandling}
                  />
                </FormGroup>

                <FormGroup
                  advancedSettings={advancedSettings}
                  isAdvanced={true}
                >
                  <FormLabel>Remove</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="removeCompletedDownloads"
                    helpText="Remove imported downloads from download client history"
                    onChange={onInputChange}
                    {...settings.removeCompletedDownloads}
                  />
                </FormGroup>
              </Form>
            </FieldSet>

            <FieldSet
              legend="Failed Download Handling"
            >
              <Form>
                <FormGroup>
                  <FormLabel>Redownload</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="autoRedownloadFailed"
                    helpText="Automatically search for and attempt to download a different release"
                    onChange={onInputChange}
                    {...settings.autoRedownloadFailed}
                  />
                </FormGroup>

                <FormGroup
                  advancedSettings={advancedSettings}
                  isAdvanced={true}
                >
                  <FormLabel>Remove</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="removeFailedDownloads"
                    helpText="Remove failed downloads from download client history"
                    onChange={onInputChange}
                    {...settings.removeFailedDownloads}
                  />
                </FormGroup>
              </Form>
            </FieldSet>

            {
              advancedSettings &&

                <FieldSet
                  legend="Drone Factory"
                >
                  <Alert
                    className={styles.droneFactoryAlert}
                    kind={kinds.WARNING}
                  >
                    Importing via Drone Factory is deprecated and will be removed in v3
                  </Alert>

                  <Form>
                    <FormGroup
                      advancedSettings={advancedSettings}
                      isAdvanced={true}
                    >
                      <FormLabel>Path</FormLabel>

                      <FormInputGroup
                        type={inputTypes.PATH}
                        name="downloadedEpisodesFolder"
                        helpText="Optional folder to periodically scan for possible imports"
                        helpTextWarning="Do not use the folder that contains some or all of your sorted and named TV shows - doing so could cause data loss
                        Download client history items that are stored in the drone factory will be ignored."
                        onChange={onInputChange}
                        {...settings.downloadedEpisodesFolder}
                      />
                    </FormGroup>

                    <FormGroup
                      advancedSettings={advancedSettings}
                      isAdvanced={true}
                    >
                      <FormLabel>Interval</FormLabel>

                      <FormInputGroup
                        type={inputTypes.NUMBER}
                        name="downloadedEpisodesScanInterval"
                        helpText="Interval in minutes to scan the Drone Factory. Set to zero to disable."
                        onChange={onInputChange}
                        {...settings.downloadedEpisodesScanInterval}
                      />
                    </FormGroup>
                  </Form>
                </FieldSet>
            }
          </div>
      }
    </div>
  );
}

DownloadClientOptions.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default DownloadClientOptions;
