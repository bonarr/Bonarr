import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Button';
import SpinnerButton from 'Components/SpinnerButton';
import LoadingIndicator from 'Components/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ProviderFieldFormGroup from 'Components/Form/ProviderFieldFormGroup';
import styles from './EditNotificationModalContent.css';

class EditNotificationModalContent extends Component {

  //
  // Render

  render() {
    const {
      advancedSettings,
      fetching,
      error,
      saving,
      testing,
      item,
      onInputChange,
      onFieldChange,
      onModalClose,
      onSavePress,
      onTestPress,
      onDeleteNotificationPress,
      ...otherProps
    } = this.props;

    const {
      id,
      name,
      onGrab,
      onDownload,
      onUpgrade,
      onRename,
      supportsOnGrab,
      supportsOnDownload,
      supportsOnUpgrade,
      supportsOnRename,
      tags,
      fields
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {id ? 'Edit Notification' : 'Add Notification'}
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
              <Form
                {...otherProps}
              >
                <FormGroup>
                  <FormLabel>Name</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TEXT}
                    name="name"
                    {...name}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>On Grab</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="onGrab"
                    helpText="Be notified when episodes are available for download and has been sent to a download client"
                    isDisabled={!supportsOnGrab.value}
                    {...onGrab}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>On Download</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="onDownload"
                    helpText="Be notified when episodes are successfully downloaded"
                    isDisabled={!supportsOnDownload.value}
                    {...onDownload}
                    onChange={onInputChange}
                  />
                </FormGroup>

                {
                  onDownload.value &&
                    <FormGroup>
                      <FormLabel>On Upgrade</FormLabel>
                      
                      <FormInputGroup
                        type={inputTypes.CHECK}
                        name="onUpgrade"
                        helpText="Be notified when episodes are upgraded to a better quality"
                        isDisabled={!supportsOnUpgrade.value}
                        {...onUpgrade}
                        onChange={onInputChange}
                      />
                    </FormGroup>
                }

                <FormGroup>
                  <FormLabel>On Rename</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="onRename"
                    helpText="Be notified when episodes are renamed"
                    isDisabled={!supportsOnRename.value}
                    {...onRename}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tags</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TAG}
                    name="tags"
                    helpText="Only send notifications for series with matching tags"
                    {...tags}
                    onChange={onInputChange}
                  />
                </FormGroup>

                {
                  fields.map((field) => {
                    return (
                      <ProviderFieldFormGroup
                        key={field.name}
                        advancedSettings={advancedSettings}
                        provider="notification"
                        providerData={item}
                        {...field}
                        onChange={onFieldChange}
                      />
                    );
                  })
                }

              </Form>
          }
        </ModalBody>
        <ModalFooter>
          {
            id &&
              <Button
                className={styles.deleteButton}
                kind={kinds.DANGER}
                onPress={onDeleteNotificationPress}
              >
                Delete
              </Button>
          }

          <SpinnerButton
            isSpinning={testing}
            onPress={onTestPress}
          >
            Test
          </SpinnerButton>

          <Button
            onPress={onModalClose}
          >
            Cancel
          </Button>

          <SpinnerButton
            isSpinning={saving}
            onPress={onSavePress}
          >
            Save
          </SpinnerButton>
        </ModalFooter>
      </ModalContent>
    );
  }
}

EditNotificationModalContent.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  testing: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onTestPress: PropTypes.func.isRequired,
  onDeleteNotificationPress: PropTypes.func
};

export default EditNotificationModalContent;
