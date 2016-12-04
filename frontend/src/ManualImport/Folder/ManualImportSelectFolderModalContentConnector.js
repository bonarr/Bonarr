import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { addRecentFolder } from 'Stores/Actions/manualImportActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import commandNames from 'Commands/commandNames';
import ManualImportSelectFolderModalContent from './ManualImportSelectFolderModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.manualImport.recentFolders,
    (recentFolders) => {
      return {
        recentFolders
      };
    }
  );
}

const mapDispatchToProps = {
  addRecentFolder,
  executeCommand
};

class ManualImportSelectFolderModalContentConnector extends Component {

  //
  // Listeners

  onQuickImportPress = (folder) => {
    this.props.addRecentFolder({ folder });

    this.props.executeCommand({
      name: commandNames.DOWNLOADED_EPSIODES_SCAN,
      path: folder
    });

    this.props.onModalClose();
  }

  onInteractiveImportPress = (folder) => {
    this.props.addRecentFolder({ folder });
    this.props.onFolderSelect(folder);
  }

  //
  // Render

  render() {
    if (this.path) {
      return null;
    }

    return (
      <ManualImportSelectFolderModalContent
        {...this.props}
        onQuickImportPress={this.onQuickImportPress}
        onInteractiveImportPress={this.onInteractiveImportPress}
      />
    );
  }
}

ManualImportSelectFolderModalContentConnector.propTypes = {
  path: PropTypes.string,
  onFolderSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  addRecentFolder: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(ManualImportSelectFolderModalContentConnector);
