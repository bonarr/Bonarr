import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { fetchNamingSettings, setNamingSettingsValue, fetchNamingExamples } from 'Stores/Actions/settingsActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import Naming from './Naming';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    (state) => state.settings.namingExamples,
    createSettingsSectionSelector(),
    (advancedSettings, examples, sectionSettings) => {
      return {
        advancedSettings,
        examples: examples.item,
        examplesPopulated: !_.isEmpty(examples.item),
        ...sectionSettings
      };
    }
  );
}

const mapDispatchToProps = {
  fetchNamingSettings,
  setNamingSettingsValue,
  fetchNamingExamples
};

class NamingConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._namingExampleTimeout = null;
  }

  componentWillMount() {
    this.props.fetchNamingSettings();
    this.props.fetchNamingExamples();
  }

  //
  // Control

  @autobind
  _fetchNamingExamples() {
    this.props.fetchNamingExamples();
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setNamingSettingsValue({ name, value });

    if (this._namingExampleTimeout) {
      clearTimeout(this._namingExampleTimeout);
    }

    this._namingExampleTimeout = setTimeout(this._fetchNamingExamples, 1000);
  }

  //
  // Render

  render() {
    return (
      <Naming
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        {...this.props}
      />
    );
  }
}

NamingConnector.propTypes = {
  fetchNamingSettings: PropTypes.func.isRequired,
  setNamingSettingsValue: PropTypes.func.isRequired,
  fetchNamingExamples: PropTypes.func.isRequired
};

export default connectSettingsSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'naming' }
               )(NamingConnector);
