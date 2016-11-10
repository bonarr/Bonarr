import React, { Component, PropTypes } from 'react';
import FieldSet from 'Components/FieldSet';
import Card from 'Components/Card';
import Icon from 'Components/Icon';
import PageSectionContent from 'Components/Page/PageSectionContent';
import Notification from './Notification';
import AddNotificationModal from './AddNotificationModal';
import EditNotificationModalConnector from './EditNotificationModalConnector';
import styles from './Notifications.css';

class Notifications extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddNotificationModalOpen: false,
      isEditNotificationModalOpen: false
    };
  }

  //
  // Listeners

  onAddNotificationPress = () => {
    this.setState({ isAddNotificationModalOpen: true });
  }

  onAddNotificationModalClose = ({ notificationSelected = false } = {}) => {
    this.setState({
      isAddNotificationModalOpen: false,
      isEditNotificationModalOpen: notificationSelected
    });
  }

  onEditNotificationModalClose = () => {
    this.setState({ isEditNotificationModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      items,
      onConfirmDeleteNotification,
      ...otherProps
    } = this.props;

    const {
      isAddNotificationModalOpen,
      isEditNotificationModalOpen
    } = this.state;

    return (
      <FieldSet
        legend="Notifications"
      >
        <PageSectionContent
          errorMessage="Unable to load Notifications"
          {...otherProps}
        >
          <div className={styles.notifications}>
            <Card
              className={styles.addNotification}
              onPress={this.onAddNotificationPress}
            >
              <div className={styles.center}>
                <Icon name="icon-sonarr-add" />
              </div>
            </Card>

            {
              items.map((item) => {
                return (
                  <Notification
                    key={item.id}
                    {...item}
                    onConfirmDeleteNotification={onConfirmDeleteNotification}
                  />
                );
              })
            }
          </div>

          <AddNotificationModal
            isOpen={isAddNotificationModalOpen}
            onModalClose={this.onAddNotificationModalClose}
          />

          <EditNotificationModalConnector
            isOpen={isEditNotificationModalOpen}
            onModalClose={this.onEditNotificationModalClose}
          />
        </PageSectionContent>
      </FieldSet>
    );
  }
}

Notifications.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteNotification: PropTypes.func.isRequired
};

export default Notifications;
