import React, { Component, PropTypes } from 'react';
import Modal from 'Components/Modal/Modal';
import ManualImportSelectFolderModalContentConnector from './Folder/ManualImportSelectFolderModalContentConnector';
import InteractiveImportModalContentConnector from './Interactive/InteractiveImportModalContentConnector';

class ManualImportModal extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      folder: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen && !nextProps.isOpen) {
      this.setState({ folder: null });
    }
  }

  //
  // Listeners

  onFolderSelect = (folder) => {
    this.setState({ folder });
  }

  //
  // Render

  render() {
    const {
      isOpen,
      folder,
      onModalClose,
      ...otherProps
    } = this.props;

    const folderPath = folder || this.state.folder;

    return (
      <Modal
        isOpen={isOpen}
        onModalClose={onModalClose}
      >
        {
          folderPath ?
            <InteractiveImportModalContentConnector
              folder={folderPath}
              {...otherProps}
              onModalClose={onModalClose}
            /> :
            <ManualImportSelectFolderModalContentConnector
              {...otherProps}
              onFolderSelect={this.onFolderSelect}
              onModalClose={onModalClose}
            />
        }
      </Modal>
    );
  }
}

ManualImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  folder: PropTypes.string,
  onModalClose: PropTypes.func.isRequired
};

export default ManualImportModal;
