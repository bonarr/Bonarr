import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import connectSection from 'Stores/connectSection';
import { fetchManualImportItems, setManualImportSort, clearManualImport } from 'Stores/Actions/manualImportActions';
import createClientSideCollectionSelector from 'Stores/Selectors/createClientSideCollectionSelector';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';
import InteractiveImportModalContent from './InteractiveImportModalContent';

function createMapStateToProps() {
  return createSelector(
    createClientSideCollectionSelector(),
    (manualImport) => {
      return manualImport;
    }
  );
}

const mapDispatchToProps = {
  fetchManualImportItems,
  setManualImportSort,
  clearManualImport,
  executeCommand
};

class InteractiveImportModalContentConnector extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      manualImportErrorMessage: null
    };
  }

  componentWillMount() {
    const {
      downloadId,
      folder
    } = this.props;

    this.props.fetchManualImportItems({ downloadId, folder });
  }

  componentWillUnmount() {
    this.props.clearManualImport();
  }

  //
  // Listeners

  onSortPress = (sortKey, sortDirection) => {
    this.props.setManualImportSort({ sortKey, sortDirection });
  }

  onImportSelectedPress = (selected, importMode) => {
    const files = [];

    _.forEach(this.props.items, (item) => {
      const isSelected = selected.indexOf(item.id) > -1;

      if (isSelected) {
        const {
          series,
          seasonNumber,
          episodes,
          quality
        } = item;

        if (!series) {
          this.setState({ manualImportErrorMessage: 'Series must be chosen for each selected file' });
          return false;
        }

        if (isNaN(seasonNumber)) {
          this.setState({ manualImportErrorMessage: 'Season must be chosen for each selected file' });
          return false;
        }

        if (!episodes || !episodes.length) {
          this.setState({ manualImportErrorMessage: 'One or more episodes must be chosen for each selected file' });
          return false;
        }

        files.push({
          path: item.path,
          seriesId: series.id,
          episodeIds: _.map(episodes, 'id'),
          quality,
          downloadId: this.props.downloadId
        });
      }
    });

    if (!files.length) {
      return;
    }

    this.props.executeCommand({
      name: commandNames.MANUAL_IMPORT,
      files,
      importMode
    });

    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <InteractiveImportModalContent
        {...this.props}
        manualImportErrorMessage={this.state.manualImportErrorMessage}
        onSortPress={this.onSortPress}
        onImportSelectedPress={this.onImportSelectedPress}
      />
    );
  }
}

InteractiveImportModalContentConnector.propTypes = {
  downloadId: PropTypes.string,
  folder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchManualImportItems: PropTypes.func.isRequired,
  setManualImportSort: PropTypes.func.isRequired,
  clearManualImport: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connectSection(
                createMapStateToProps,
                mapDispatchToProps,
                undefined,
                undefined,
                { section: 'manualImport' }
               )(InteractiveImportModalContentConnector);
