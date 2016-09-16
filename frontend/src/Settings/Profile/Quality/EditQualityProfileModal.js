import React, { PropTypes } from 'react';
import Modal from 'Components/Modal/Modal';
import EditQualityProfileModalContentConnector from './EditQualityProfileModalContentConnector';

function EditQualityProfileModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <EditQualityProfileModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

EditQualityProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default EditQualityProfileModal;
