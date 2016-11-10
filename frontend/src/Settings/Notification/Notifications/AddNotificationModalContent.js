import React, { Component, PropTypes } from 'react';
import Button from 'Components/Button';
import LoadingIndicator from 'Components/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import AddNotificationItem from './AddNotificationItem';
import styles from './AddNotificationModalContent.css';

class AddNotificationModalContent extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      error,
      populated,
      schema,
      onNotificationSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Add Notification
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new notification, please try again.</div>
          }

          {
            !fetching && !error &&
              <div>
                <div className={styles.notifications}>
                  {
                    schema.map((notification) => {
                      return (
                        <AddNotificationItem
                          key={notification.implementation}
                          implementation={notification.implementation}
                          {...notification}
                          onNotificationSelect={onNotificationSelect}
                        />
                      );
                    })
                  }
                </div>
              </div>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

AddNotificationModalContent.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  populated: PropTypes.bool.isRequired,
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNotificationSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AddNotificationModalContent;
