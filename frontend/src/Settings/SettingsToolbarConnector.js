import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleAdvancedSettings } from 'Stores/Actions/settingsActions';
import SettingsToolbar from './SettingsToolbar';

function mapStateToProps(state) {
  return {
    advancedSettings: state.settings.advancedSettings
  };
}

const mapDispatchToProps = {
  toggleAdvancedSettings
};

class SettingsToolbarConnector extends Component {

  //
  // Listeners

  onAdvancedSettingsPress = () => {
    this.props.toggleAdvancedSettings();
  }

  //
  // Render

  render() {
    return (
      <SettingsToolbar
        onSavePress={this.props.onSavePress}
        onAdvancedSettingsPress={this.onAdvancedSettingsPress}
        {...this.props}
      />
    );
  }
}

SettingsToolbarConnector.propTypes = {
  onSavePress: PropTypes.func,
  toggleAdvancedSettings: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsToolbarConnector);
