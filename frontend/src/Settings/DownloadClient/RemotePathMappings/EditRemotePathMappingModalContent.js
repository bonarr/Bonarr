import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import { kinds } from 'Helpers/Props';
import { stringSettingShape } from 'Helpers/Props/settingShape';
import Button from 'Components/Button';
import LoadingIndicator from 'Components/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import styles from './EditRemotePathMappingModalContent.css';

class EditRemotePathMappingModalContent extends Component {

  //
  // Render

  render() {
    const {
      id,
      fetching,
      error,
      item,
      onInputChange,
      onSavePress,
      onModalClose,
      onDeleteRemotePathMappingPress,
      ...otherProps
    } = this.props;

    const {
      host,
      remotePath,
      localPath
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {id ? 'Edit Remote Path Mapping' : 'Add Remote Path Mapping'}
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new remote path mapping, please try again.</div>
          }

          {
            !fetching && !error &&
              <Form
                {...otherProps}
              >
                <FormGroup>
                  <FormLabel>Host</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TEXT}
                    name="host"
                    helpText="The same host you specified for the remote Download Client"
                    {...host}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Remote Path</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TEXT}
                    name="remotePath"
                    helpText="Root path to the directory that the Download Client accesses"
                    {...remotePath}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Local Path</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TEXT}
                    name="localPath"
                    helpText="Path that Sonarr should use to access the remote path locally"
                    {...localPath}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Form>
          }
        </ModalBody>

        <ModalFooter>
          {
            id &&
              <Button
                className={styles.deleteButton}
                kind={kinds.DANGER}
                onPress={onDeleteRemotePathMappingPress}
              >
                Delete
              </Button>
          }

          <Button
            onPress={onModalClose}
          >
            Cancel
          </Button>

          <Button
            onPress={onSavePress}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

const remotePathMappingShape = {
  host: PropTypes.shape(stringSettingShape).isRequired,
  remotePath: PropTypes.shape(stringSettingShape).isRequired,
  localPath: PropTypes.shape(stringSettingShape).isRequired
};

EditRemotePathMappingModalContent.propTypes = {
  id: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  item: PropTypes.shape(remotePathMappingShape).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteRemotePathMappingPress: PropTypes.func
};

export default EditRemotePathMappingModalContent;
