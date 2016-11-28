import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import createSettingsSectionSelector from 'Stores/Selectors/createSettingsSectionSelector';
import { fetchIndexerOptions, setIndexerOptionsValue, saveIndexerOptions } from 'Stores/Actions/settingsActions';
import connectSection from 'Stores/connectSection';
import IndexerOptions from './IndexerOptions';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    createSettingsSectionSelector(),
    (advancedSettings, sectionSettings) => {
      return {
        advancedSettings,
        ...sectionSettings
      };
    }
  );
}

const mapDispatchToProps = {
  fetchIndexerOptions,
  setIndexerOptionsValue,
  saveIndexerOptions
};

class IndexerOptionsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchIndexerOptions();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hasPendingChanges !== nextProps.hasPendingChanges) {
      this.props.onHasPendingChange(nextProps.hasPendingChanges);
    }
  }

  //
  // Control

  save = () => {
    this.props.saveIndexerOptions();
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.setIndexerOptionsValue({ name, value });
  }

  //
  // Render

  render() {
    return (
      <IndexerOptions
        onInputChange={this.onInputChange}
        {...this.props}
      />
    );
  }
}

IndexerOptionsConnector.propTypes = {
  hasPendingChanges: PropTypes.bool.isRequired,
  fetchIndexerOptions: PropTypes.func.isRequired,
  setIndexerOptionsValue: PropTypes.func.isRequired,
  saveIndexerOptions: PropTypes.func.isRequired,
  onHasPendingChange: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                { withRef: true },
                { section: 'indexerOptions' }
               )(IndexerOptionsConnector);
