import React, { PropTypes } from 'react';
import Modal from 'Components/Modal/Modal';
import EditRemotePathMappingModalContentConnector from './EditRemotePathMappingModalContentConnector';

function EditRemotePathMappingModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <EditRemotePathMappingModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

EditRemotePathMappingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default EditRemotePathMappingModal;
