import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import inputTypes from 'Utilities/inputTypes';
import LoadingIndicator from 'Components/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbar from 'Settings/SettingsToolbarConnector';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

class MediaManagement extends Component {

  //
  // Listeners

  @autobind
  onSavePress(event) {
    event.preventDefault();
    event.nativeEvent.preventDefault();

    this.props.onSavePress();
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      fetching,
      error,
      settings,
      hasSettings,
      onInputChange,
      ...otherProps
    } = this.props;

    const fileDateOptions = [
      { 'none': 'None' },
      { 'localAirDate': 'Local Air Date' },
      { 'utcAirDate': 'UTC Air Date' }
    ];

    return (
      <PageContent>
        <SettingsToolbar
          advancedSettings={advancedSettings}
          {...otherProps}
          onSavePress={this.onSavePress}
        />

        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && error &&
              <div>Unable to load Media Management settings</div>
          }

          {
            hasSettings && !fetching && !error &&
              <Form
                id="mediaManagementSettings"
                {...otherProps}
                onSubmit={this.onSubmit}
              >
                <FieldSet
                  legend="Episode Naming"
                >

                </FieldSet>

                {
                  advancedSettings &&
                    <FieldSet
                      legend="Folders"
                    >
                      <FormGroup>
                        <FormLabel>Create empty series folders</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="createEmptySeriesFolders"
                          helpText="Create missing series folders during disk scan"
                          onChange={onInputChange}
                          {...settings.createEmptySeriesFolders}
                        />
                      </FormGroup>
                    </FieldSet>
                }

                {
                  advancedSettings &&
                    <FieldSet
                      legend="Importing"
                    >
                      <FormGroup>
                        <FormLabel>Skip Free Space Check (mono only)</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="skipFreeSpaceCheckWhenImporting"
                          helpText="Use when drone is unable to detect free space from your series root folder"
                          onChange={onInputChange}
                          {...settings.skipFreeSpaceCheckWhenImporting}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Use Hardlinks instead of Copy</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="copyUsingHardlinks"
                          helpText="Use Hardlinks when trying to copy files from torrents that are still being seeded"
                          onChange={onInputChange}
                          {...settings.copyUsingHardlinks}
                          warnings={['Occasionally, file locks may prevent renaming files that are being seeded. You may temporarily disable seeding and use Sonarr\'s rename function as a work around.', ...settings.copyUsingHardlinks.warnings]}
                        />
                      </FormGroup>
                    </FieldSet>
                }

                <FieldSet
                  legend="File Management"
                >
                  <FormGroup>
                    <FormLabel>Ignore Deleted Episodes</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="autoUnmonitorPreviouslyDownloadedEpisodes"
                      helpText="Episodes deleted from disk are automatically unmonitored in Sonarr"
                      onChange={onInputChange}
                      {...settings.autoUnmonitorPreviouslyDownloadedEpisodes}
                    />
                  </FormGroup>

                  {
                    advancedSettings &&
                      <FormGroup>
                        <FormLabel>Download Propers</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="autoDownloadPropers"
                          helpText="Should Sonarr automatically upgrade to propers when available?"
                          onChange={onInputChange}
                          {...settings.autoDownloadPropers}
                        />
                      </FormGroup>
                  }

                  {
                    advancedSettings &&
                      <FormGroup>
                        <FormLabel>Analyse video files</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="enableMediaInfo"
                          helpText="Extract video information such as resolution, runtime and codec information from files. This requires Sonarr to read parts of the file which may cause high disk or network activity during scans."
                          onChange={onInputChange}
                          {...settings.enableMediaInfo}
                        />
                      </FormGroup>
                  }

                  {
                    advancedSettings &&
                      <FormGroup>
                        <FormLabel>Change File Date</FormLabel>

                        <FormInputGroup
                          type={inputTypes.SELECT}
                          name="fileDate"
                          helpText="Change file date on import/rescan"
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.fileDate}
                        />
                      </FormGroup>
                  }

                  {
                    advancedSettings &&
                      <FormGroup>
                        <FormLabel>Recycling Bin</FormLabel>

                        <FormInputGroup
                          type={inputTypes.PATH}
                          name="recycleBin"
                          helpText="Episode files will go here when deleted instead of being permanently deleted"
                          onChange={onInputChange}
                          {...settings.recycleBin}
                        />
                      </FormGroup>
                  }
                </FieldSet>

                {
                  advancedSettings &&
                    <FieldSet
                      legend="Permissions (mono only)"
                    >
                      <FormGroup>
                        <FormLabel>Set Permissions</FormLabel>

                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="setPermissionsLinux"
                          helpText="Should chmod/chown be run when files are imported/renamed?"
                          onChange={onInputChange}
                          {...settings.setPermissionsLinux}
                          warnings={['If you\'re unsure what these settings do, do not alter them.', ...settings.setPermissionsLinux.warnings]}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>File chmod mask</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="fileChmod"
                          helpText="Octal, applied to media files when imported/renamed by Sonarr"
                          onChange={onInputChange}
                          {...settings.fileChmod}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Folder chmod mask</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="folderChmod"
                          helpText="Octal, applied to series/season folders created by Sonarr"
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.folderChmod}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>chown User</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="chownUser"
                          helpText="Username or uid. Use uid for remote file systems."
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.chownUser}
                        />
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>chown Group</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="chownGroup"
                          helpText="Group name or gid. Use gid for remote file systems."
                          values={fileDateOptions}
                          onChange={onInputChange}
                          {...settings.chownGroup}
                        />
                      </FormGroup>
                    </FieldSet>
                }
              </Form>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

MediaManagement.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default MediaManagement;
