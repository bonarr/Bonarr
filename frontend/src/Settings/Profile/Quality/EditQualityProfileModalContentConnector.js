import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import createProviderSettingsSelector from 'Stores/Selectors/createProviderSettingsSelector';
import { fetchQualityProfileSchema, setQualityProfileValue, saveQualityProfile } from 'Stores/Actions/settingsActions';
import connectSettingsSection from 'Settings/connectSettingsSection';
import EditQualityProfileModalContent from './EditQualityProfileModalContent';

function createQualitiesSelector() {
  return createSelector(
    createProviderSettingsSelector(),
    (qualityProfile) => {
      const items = qualityProfile.item.items;
      if (!items || !items.value) {
        return [];
      }

      return _.reduceRight(items.value, (result, { allowed, quality }) => {
        if (allowed) {
          result.push({ [quality.id]: quality.name });
        }

        return result;
      }, []);
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    (state) => state.languages.items,
    createProviderSettingsSelector(),
    createQualitiesSelector(),
    (advancedSettings, languages, qualityProfile, qualities) => {
      return {
        advancedSettings,
        languages,
        qualities,
        ...qualityProfile
      };
    }
  );
}

const mapDispatchToProps = {
  fetchQualityProfileSchema,
  setQualityProfileValue,
  saveQualityProfile
};

class EditQualityProfileModalContentConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      dragIndex: null,
      dropIndex: null
    };
  }

  componentWillMount() {
    if (!this.props.id) {
      this.props.fetchQualityProfileSchema();
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
    this.props.setQualityProfileValue({ name, value });
  }

  @autobind
  onCutoffChange({ name, value }) {
    const id = parseInt(value);
    const item = _.find(this.props.item.items, (i) => i.quality.id === id);

    this.props.setQualityProfileValue({ name, value: item.quality });
  }

  @autobind
  onSavePress() {
    this.props.saveQualityProfile({ id: this.props.id });
  }

  @autobind
  onQualityProfileItemAllowedChange(id, allowed) {
    const qualityProfile = _.cloneDeep(this.props.item);

    const item = _.find(qualityProfile.items.value, (i) => i.quality.id === id);
    item.allowed = allowed;

    this.props.setQualityProfileValue({
      name: 'items',
      value: qualityProfile.items.value
    });

    const cutoff = qualityProfile.cutoff.value;

    // If the cutoff isn't allowed anymore or there isn't a cutoff set one
    if (!cutoff || !_.find(qualityProfile.items.value, (i) => i.quality.id === cutoff.id).allowed) {
      const firstAllowed = _.find(qualityProfile.items.value, { allowed: true });

      this.props.setQualityProfileValue({ name: 'cutoff', value: firstAllowed ? firstAllowed.quality : null });
    }
  }

  @autobind
  onQualityProfileItemDragMove(dragIndex, dropIndex) {
    if (this.state.dragIndex !== dragIndex || this.state.dropIndex !== dropIndex) {
      this.setState({
        dragIndex,
        dropIndex
      });
    }
  }

  @autobind
  onQualityProfileItemDragEnd({ id }, didDrop) {
    const {
      dragIndex,
      dropIndex
    } = this.state;

    if (didDrop && dropIndex !== null) {
      const qualityProfile = _.cloneDeep(this.props.item);

      const items = qualityProfile.items.value.splice(dragIndex, 1);
      qualityProfile.items.value.splice(dropIndex, 0, items[0]);

      this.props.setQualityProfileValue({
        name: 'items',
        value: qualityProfile.items.value
      });
    }

    this.setState({
      dragIndex: null,
      dropIndex: null
    });
  }

  //
  // Render

  render() {
    if (_.isEmpty(this.props.item.items) && !this.props.fetching) {
      return null;
    }

    return (
      <EditQualityProfileModalContent
        {...this.state}
        {...this.props}
        onSavePress={this.onSavePress}
        onInputChange={this.onInputChange}
        onCutoffChange={this.onCutoffChange}
        onQualityProfileItemAllowedChange={this.onQualityProfileItemAllowedChange}
        onQualityProfileItemDragMove={this.onQualityProfileItemDragMove}
        onQualityProfileItemDragEnd={this.onQualityProfileItemDragEnd}
      />
    );
  }
}

EditQualityProfileModalContentConnector.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  setQualityProfileValue: PropTypes.func.isRequired,
  fetchQualityProfileSchema: PropTypes.func.isRequired,
  saveQualityProfile: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSettingsSection(
  createMapStateToProps,
  mapDispatchToProps,
  undefined,
  undefined,
  { section: 'qualityProfiles' }
)(EditQualityProfileModalContentConnector);
