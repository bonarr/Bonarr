import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Button';
import SpinnerButton from 'Components/SpinnerButton';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ProviderFieldFormGroup from 'Components/Form/ProviderFieldFormGroup';
import styles from './EditMetadataModalContent.css';

class EditMetadataModalContent extends Component {

  //
  // Render

  render() {
    const {
      saving,
      item,
      onInputChange,
      onFieldChange,
      onModalClose,
      onSavePress,
      ...otherProps
    } = this.props;

    const {
      name,
      enable,
      fields
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Edit {name.value} Metadata
        </ModalHeader>

        <ModalBody className={styles.body}>
          <Form
            {...otherProps}
          >
            <FormGroup>
              <FormLabel>Enable</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="enable"
                kind={kinds.SUCCESS}
                helpText="Enable metadata file creation for this metadata type"
                {...enable}
                onChange={onInputChange}
              />
            </FormGroup>

            {
              enable.value &&
                <div>
                  {
                    fields.map((field) => {
                      return (
                        <ProviderFieldFormGroup
                          key={field.name}
                          provider="metadata"
                          {...field}
                          onChange={onFieldChange}
                        />
                      );
                    })
                  }
                </div>
            }

          </Form>
        </ModalBody>
        <ModalFooter>
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

EditMetadataModalContent.propTypes = {
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onDeleteMetadataPress: PropTypes.func
};

export default EditMetadataModalContent;
