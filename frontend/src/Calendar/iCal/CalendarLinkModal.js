import React, { PropTypes } from 'react';
import Modal from 'Components/Modal/Modal';
import CalendarLinkModalContentConnector from './CalendarLinkModalContentConnector';

function CalendarLinkModal(props) {
  const {
    isOpen,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <CalendarLinkModalContentConnector
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

CalendarLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default CalendarLinkModal;
