import React, { PropTypes } from 'react';
import * as kinds from 'Helpers/kinds';
import Button from 'Components/Button';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';

function ConfirmModal(props) {
  const {
    isOpen,
    kind,
    title,
    message,
    confirmLabel,
    cancelLabel,
    hideCancelButton,
    onConfirm,
    onCancel
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onCancel}
    >
      <ModalContent onModalClose={onCancel}>
        <ModalHeader>{title}</ModalHeader>

        <ModalBody>
          {message}
        </ModalBody>

        <ModalFooter>
          {
            !hideCancelButton &&
              <Button
                kind={kinds.DEFAULT}
                onPress={onCancel}
              >
                {cancelLabel}
              </Button>
          }

          <Button
            data-autofocus={true}
            kind={kind}
            onPress={onConfirm}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  kind: PropTypes.oneOf(kinds.all),
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  hideCancelButton: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

ConfirmModal.defaultProps = {
  kind: kinds.PRIMARY,
  confirmLabel: 'OK',
  cancelLabel: 'Cancel'
};

export default ConfirmModal;
