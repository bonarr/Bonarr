import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import * as kinds from 'Helpers/kinds';
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
import ThingyFieldFormGroup from 'Components/Form/ThingyFieldFormGroup';
import styles from './EditIndexerModalContent.css';

class EditIndexerModalContent extends Component {

  //
  // Render

  render() {
    const {
      advancedSettings,
      fetching,
      error,
      item,
      onInputChange,
      onFieldChange,
      onSavePress,
      onModalClose,
      onDeleteIndexerPress,
      ...otherProps
    } = this.props;

    const {
      id,
      name,
      enableRss,
      enableSearch,
      supportsRss,
      supportsSearch,
      fields
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {id ? 'Edit Indexer' : 'Add Indexer'}
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new indexer, please try again.</div>
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
                  <FormLabel>Enable RSS</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="enableRss"
                    helpTextWarning={supportsRss.value ? undefined : 'RSS is not supported with this indexer'}
                    isDisabled={!supportsRss.value}
                    {...enableRss}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Enable Search</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="enableSearch"
                    helpTextWarning={supportsSearch.value ? undefined : 'Search is not supported with this indexer'}
                    isDisabled={!supportsSearch.value}
                    {...enableSearch}
                    onChange={onInputChange}
                  />
                </FormGroup>

                {
                  fields.map((field) => {
                    return (
                      <ThingyFieldFormGroup
                        key={field.name}
                        advancedSettings={advancedSettings}
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
                onPress={onDeleteIndexerPress}
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

EditIndexerModalContent.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteIndexerPress: PropTypes.func
};

export default EditIndexerModalContent;
