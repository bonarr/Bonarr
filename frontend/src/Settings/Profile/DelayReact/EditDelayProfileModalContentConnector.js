import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import selectSettings from 'Stores/Selectors/selectSettings';
import { setDelayProfileValue, saveDelayProfile } from 'Stores/Actions/settingsActions';
import EditDelayProfileModalContent from './EditDelayProfileModalContent';

const newDelayProfile = {
  enableUsenet: true,
  enableTorrent: true,
  preferredProtocol: 'usenet',
  usenetDelay: 0,
  torrentDelay: 0,
  tags: []
};

function createDelayProfileSelector() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.settings.delayProfiles,
    (id, delayProfiles) => {
      const {
        fetching,
        error,
        saving,
        saveError,
        pendingChanges,
        items
      } = delayProfiles;

      const profile = id ? _.find(items, { id }) : newDelayProfile;
      const settings = selectSettings(profile, pendingChanges, saveError);

      return {
        id,
        fetching,
        error,
        saving,
        saveError,
        item: settings.settings,
        ...settings
      };
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createDelayProfileSelector(),
    (delayProfile) => {
      const protocolOptions = [
        { 'preferUsenet': 'Prefer Usenet' },
        { 'preferTorrent': 'Prefer Torrent' },
        { 'onlyUsenet': 'Only Usenet' },
        { 'onlyTorrent': 'Only Torrent' }
      ];

      const enableUsenet = delayProfile.item.enableUsenet.value;
      const enableTorrent = delayProfile.item.enableTorrent.value;
      const preferredProtocol = delayProfile.item.preferredProtocol.value;
      let protocol = 'preferUsenet';

      if (preferredProtocol === 'usenet') {
        protocol = 'preferUsenet';
      } else {
        protocol = 'preferTorrent';
      }

      if (!enableUsenet) {
        protocol = 'onlyTorrent';
      }

      if (!enableTorrent) {
        protocol = 'onlyUsenet';
      }

      return {
        protocol,
        protocolOptions,
        ...delayProfile
      };
    }
  );
}

const mapDispatchToProps = {
  setDelayProfileValue,
  saveDelayProfile
};

class EditDelayProfileModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    if (!this.props.id) {
      Object.keys(newDelayProfile).forEach((name) => {
        this.props.setDelayProfileValue({
          name,
          value: newDelayProfile[name]
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saving && !this.props.saving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  @autobind
  onInputChange({ name, value }) {
    this.props.setDelayProfileValue({ name, value });
  }

  @autobind
  onProtocolChange({ value }) {
    switch (value) {
      case 'preferUsenet':
        this.props.setDelayProfileValue({ name: 'enableUsenet', value: true });
        this.props.setDelayProfileValue({ name: 'enableTorrent', value: true });
        this.props.setDelayProfileValue({ name: 'preferredProtocol', value: 'usenet' });
        break;
      case 'preferTorrent':
        this.props.setDelayProfileValue({ name: 'enableUsenet', value: true });
        this.props.setDelayProfileValue({ name: 'enableTorrent', value: true });
        this.props.setDelayProfileValue({ name: 'preferredProtocol', value: 'torrent' });
        break;
      case 'onlyUsenet':
        this.props.setDelayProfileValue({ name: 'enableUsenet', value: true });
        this.props.setDelayProfileValue({ name: 'enableTorrent', value: false });
        this.props.setDelayProfileValue({ name: 'preferredProtocol', value: 'usenet' });
        break;
      case 'onlyTorrent':
        this.props.setDelayProfileValue({ name: 'enableUsenet', value: false });
        this.props.setDelayProfileValue({ name: 'enableTorrent', value: true });
        this.props.setDelayProfileValue({ name: 'preferredProtocol', value: 'torrent' });
        break;
      default:
        throw Error(`Unknown protocol option: ${value}`);
    }
  }

  @autobind
  onSavePress() {
    this.props.saveDelayProfile({ id: this.props.id });
  }

  //
  // Render

  render() {
    return (
      <EditDelayProfileModalContent
        {...this.props}
        onSavePress={this.onSavePress}
        onInputChange={this.onInputChange}
        onProtocolChange={this.onProtocolChange}
      />
    );
  }
}

EditDelayProfileModalContentConnector.propTypes = {
  id: PropTypes.number,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setDelayProfileValue: PropTypes.func.isRequired,
  saveDelayProfile: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditDelayProfileModalContentConnector);
