import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import LoadingIndicator from 'Components/LoadingIndicator';
import FieldSet from 'Components/FieldSet';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import SettingsToolbarConnector from 'Settings/SettingsToolbarConnector';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

class GeneralSettings extends Component {

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
      onSavePress,
      ...otherProps
    } = this.props;

    const {
      bindAddress,
      port,
      urlBase,
      enableSsl,
      sslPort,
      sslCertHash,
      launchBrowser,
      authenticationMethod,
      username,
      password,
      apiKey,
      logLevel,
      analyticsEnabled,
      branch,
      updateAutomatically,
      updateMechanism,
      updateScriptPath
    } = settings;

    const authenticationMethodOptions = [
      { 'none': 'None' },
      { 'basic': 'Basic (Browser Popup)' },
      { 'forms': 'Forms (Login Page)' }
    ];

    const logLevelOptions = [
      { 'info': 'Info' },
      { 'debug': 'Debug' },
      { 'trace': 'Trace' }
    ];

    const updateOptions = [
      { 'builtIn': 'Built-In' },
      { 'script': 'Script' }
    ];

    const authenticationEnabled = authenticationMethod && authenticationMethod.value !== 'none';

    return (
      <PageContent>
        <SettingsToolbarConnector
          {...otherProps}
          onSavePress={onSavePress}
        />

        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && error &&
              <div>Unable to load General settings</div>
          }

          {
            hasSettings && !fetching && !error &&
              <Form
                id="generalSettings"
                {...otherProps}
              >
                <FieldSet
                  legend="Start-Up"
                >
                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Bind Address</FormLabel>

                    <FormInputGroup
                      type={inputTypes.TEXT}
                      name="bindAddress"
                      helpText="Valid IP4 address or '*' for all interfaces"
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...bindAddress}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Port Number</FormLabel>

                    <FormInputGroup
                      type={inputTypes.NUMBER}
                      name="port"
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...port}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>URL Base</FormLabel>

                    <FormInputGroup
                      type={inputTypes.TEXT}
                      name="urlBase"
                      helpText="For reverse proxy support, default is empty"
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...urlBase}
                    />
                  </FormGroup>

                  <FormGroup
                    advancedSettings={advancedSettings}
                    isAdvanced={true}
                  >
                    <FormLabel>Enable SSL</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="enableSsl"
                      helpText=" Requires restart running as administrator to take effect"
                      onChange={onInputChange}
                      {...enableSsl}
                    />
                  </FormGroup>

                  {
                    enableSsl.value &&
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>SSL Port</FormLabel>

                        <FormInputGroup
                          type={inputTypes.NUMBER}
                          name="sslPort"
                          helpTextWarning="Requires restart to take effect"
                          onChange={onInputChange}
                          {...sslPort}
                        />
                      </FormGroup>
                  }

                  {
                    enableSsl.value &&
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>SSL Cert Hash (Windows Only)</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="sslCertHash"
                          helpTextWarning="Requires restart to take effect"
                          onChange={onInputChange}
                          {...sslCertHash}
                        />
                      </FormGroup>
                  }

                  <FormGroup>
                    <FormLabel>Open browser on start (Hide if Windows service)</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="launchBrowser"
                      helpText=" Open a web browser and navigate to Sonarr homepage on app start."
                      onChange={onInputChange}
                      {...launchBrowser}
                    />
                  </FormGroup>

                </FieldSet>

                <FieldSet
                  legend="Security"
                >
                  <FormGroup>
                    <FormLabel>Authentication</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="authenticationMethod"
                      values={authenticationMethodOptions}
                      helpText="Require Username and Password to access Sonarr"
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...authenticationMethod}
                    />
                  </FormGroup>

                  {
                    authenticationEnabled &&
                      <FormGroup>
                        <FormLabel>Username</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="username"
                          helpTextWarning="Requires restart to take effect"
                          onChange={onInputChange}
                          {...username}
                        />
                      </FormGroup>
                  }

                  {
                    authenticationEnabled &&
                      <FormGroup>
                        <FormLabel>Password</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="password"
                          helpTextWarning="Requires restart to take effect"
                          onChange={onInputChange}
                          {...password}
                        />
                      </FormGroup>
                  }

                  <FormGroup>
                    <FormLabel>API Key (Needs reset button)</FormLabel>

                    <FormInputGroup
                      type={inputTypes.TEXT}
                      name="apiKey"
                      readOnly={true}
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...apiKey}
                    />
                  </FormGroup>
                </FieldSet>

                <FieldSet
                  legend="Logging"
                >
                  <FormGroup>
                    <FormLabel>Log Level</FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="logLevel"
                      values={logLevelOptions}
                      helpTextWarning={logLevel.value === 'trace' && 'Trace logging should only be enabled temporarily'}
                      onChange={onInputChange}
                      {...logLevel}
                    />
                  </FormGroup>
                </FieldSet>

                <FieldSet
                  legend="Analytics"
                >
                  <FormGroup>
                    <FormLabel>Send Anonymous Usage Data</FormLabel>

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="analyticsEnabled"
                      helpText="Send anonymous information about your browser and which parts of the web interface you use to Sonarr servers. We use this information to prioritize features and browser support. We will NEVER include any personal information or any information that could identify you."
                      helpTextWarning="Requires restart to take effect"
                      onChange={onInputChange}
                      {...analyticsEnabled}
                    />
                  </FormGroup>
                </FieldSet>

                {
                  advancedSettings &&
                    <FieldSet
                      legend="Updates"
                    >
                      <FormGroup
                        advancedSettings={advancedSettings}
                        isAdvanced={true}
                      >
                        <FormLabel>Branch</FormLabel>

                        <FormInputGroup
                          type={inputTypes.TEXT}
                          name="branch"
                          helpText="Branch to use to update Sonarr"
                          helpLink="https://github.com/Sonarr/Sonarr/wiki/Release-Branches"
                          onChange={onInputChange}
                          {...branch}
                        />
                      </FormGroup>
                    </FieldSet>
                }

                {
                  advancedSettings &&
                    <FormGroup
                      advancedSettings={advancedSettings}
                      isAdvanced={true}
                    >
                      <FormLabel>Automatic</FormLabel>

                      <FormInputGroup
                        type={inputTypes.CHECK}
                        name="updateAutomatically"
                        helpText="Automatically download and install updates. You will still be able to install from System: Updates"
                        onChange={updateAutomatically}
                        {...analyticsEnabled}
                      />
                    </FormGroup>
                }

                {
                  advancedSettings &&
                    <FormGroup
                      advancedSettings={advancedSettings}
                      isAdvanced={true}
                    >
                      <FormLabel>Mechanism</FormLabel>

                      <FormInputGroup
                        type={inputTypes.SELECT}
                        name="updateMechanism"
                        values={updateOptions}
                        helpText="Use Sonarr's built-in updater or a script"
                        helpLink="https://github.com/Sonarr/Sonarr/wiki/Updating"
                        onChange={onInputChange}
                        {...updateMechanism}
                      />
                    </FormGroup>
                }

                {
                  advancedSettings && updateMechanism.value === 'script' &&
                    <FormGroup
                      advancedSettings={advancedSettings}
                      isAdvanced={true}
                    >
                      <FormLabel>Script Path</FormLabel>

                      <FormInputGroup
                        type={inputTypes.TEXT}
                        name="updateScriptPath"
                        helpText="Path to a custom script that takes an extracted update package and handle the remainder of the update process"
                        onChange={onInputChange}
                        {...updateScriptPath}
                      />
                    </FormGroup>
                }
              </Form>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

GeneralSettings.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default GeneralSettings;
