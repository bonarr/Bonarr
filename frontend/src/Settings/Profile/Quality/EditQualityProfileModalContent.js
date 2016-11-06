import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import { kinds } from 'Helpers/Props';
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
import QualityProfileItems from './QualityProfileItems';
import styles from './EditQualityProfileModalContent.css';

class EditQualityProfileModalContent extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      error,
      languages,
      qualities,
      item,
      onInputChange,
      onCutoffChange,
      onSavePress,
      onModalClose,
      onDeleteQualityProfilePress,
      ...otherProps
    } = this.props;

    const {
      id,
      name,
      language,
      cutoff,
      items
    } = item;

    const languageOptions = languages.map((l) => {
      return {
        [l.nameLower]: l.name
      };
    });

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {id ? 'Edit Quality Profile' : 'Add Quality Profile'}
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new quality profile, please try again.</div>
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
                  <FormLabel>Language</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="language"
                    values={languageOptions}
                    helpText="Series assigned this profile will look for episodes with the selected language"
                    {...language}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Cutoff</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="cutoff"
                    {...cutoff}
                    value={cutoff ? cutoff.value.id : 0}
                    values={qualities}
                    helpText="Once this quality is reached Sonarr will no longer download episodes"
                    onChange={onCutoffChange}
                  />
                </FormGroup>

                <QualityProfileItems
                  qualityProfileItems={items.value}
                  {...otherProps}
                />

              </Form>
          }
        </ModalBody>
        <ModalFooter>
          {
            id &&
              <Button
                className={styles.deleteButton}
                kind={kinds.DANGER}
                onPress={onDeleteQualityProfilePress}
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

EditQualityProfileModalContent.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCutoffChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteQualityProfilePress: PropTypes.func
};

export default EditQualityProfileModalContent;
