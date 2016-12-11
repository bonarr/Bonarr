import React, { PropTypes } from 'react';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Button';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import HistoryDetails from './HistoryDetails';
import styles from './HistoryDetailsModal.css';

function getHeaderTitle(eventType) {
  switch (eventType) {
    case 'grabbed':
      return 'Grabbed';
    case 'downloadFailed':
      return 'Download Failed';
    case 'downloadFolderImported':
      return 'Episode Imported';
    case 'episodeFileDeleted':
      return 'Episode File Deleted';
    default:
      return 'Unknown';
  }
}

function HistoryDetailsModal(props) {
  const {
    isOpen,
    eventType,
    sourceTitle,
    data,
    shortDateFormat,
    timeFormat,
    onMarkAsFailedPress,
    onModalClose
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {getHeaderTitle(eventType)}
        </ModalHeader>

        <ModalBody>
          <HistoryDetails
            eventType={eventType}
            sourceTitle={sourceTitle}
            data={data}
            shortDateFormat={shortDateFormat}
            timeFormat={timeFormat}
          />
        </ModalBody>

        <ModalFooter>
          {
            eventType === 'grabbed' &&
              <Button
                className={styles.markAsFailedButton}
                kind={kinds.DANGER}
                onPress={onMarkAsFailedPress}
              >
                Mark as Failed
              </Button>
          }

          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

HistoryDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  eventType: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  onMarkAsFailedPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default HistoryDetailsModal;
