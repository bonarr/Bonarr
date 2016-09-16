import React, { Component, PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import * as kinds from 'Helpers/kinds';
import Button from 'Components/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import PageSectionContent from 'Components/Page/PageSectionContent';
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
          <PageSectionContent
            errorMessage="Unable to add a new quality profile, please try again."
            {...otherProps}
          >
            <Form
              validationWarnings={[]}
              validationErrors={[]}
            >
              <FormGroup>
                <FormLabel>Name</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="name"
                  value={name}
                  validationWarnings={[]}
                  validationErrors={[]}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Language</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="language"
                  value={language}
                  values={languageOptions}
                  helpText="Series assigned this profile will look for episodes with the selected language"
                  validationWarnings={[]}
                  validationErrors={[]}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Cutoff</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="cutoff"
                  value={cutoff ? cutoff.id : 0}
                  values={qualities}
                  helpText="Once this quality is reached Sonarr will no longer download episodes"
                  validationWarnings={[]}
                  validationErrors={[]}
                  onChange={onCutoffChange}
                />
              </FormGroup>

              <QualityProfileItems
                qualityProfileItems={items}
                {...otherProps}
              />

            </Form>
          </PageSectionContent>
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
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  saving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCutoffChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteQualityProfilePress: PropTypes.func.isRequired
};

export default EditQualityProfileModalContent;
