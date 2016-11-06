import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { kinds } from 'Helpers/Props';
import titleCase from 'Utilities/String/titleCase';
import Card from 'Components/Card';
import Label from 'Components/Label';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import EditQualityProfileModalConnector from './EditQualityProfileModalConnector';
import styles from './QualityProfile.css';

class QualityProfile extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditQualityProfileModalOpen: false,
      isDeleteQualityProfileModalOpen: false
    };
  }

  //
  // Listeners

  @autobind
  onEditQualityProfilePress() {
    this.setState({ isEditQualityProfileModalOpen: true });
  }

  @autobind
  onEditQualityProfileModalClose() {
    this.setState({ isEditQualityProfileModalOpen: false });
  }

  @autobind
  onDeleteQualityProfilePress() {
    this.setState({
      isEditQualityProfileModalOpen: false,
      isDeleteQualityProfileModalOpen: true
    });
  }

  @autobind
  onDeleteQualityProfileModalClose() {
    this.setState({ isDeleteQualityProfileModalOpen: false });
  }

  @autobind
  onConfirmDeleteQualityProfile() {
    this.props.onConfirmDeleteQualityProfile(this.props.id);
  }

  //
  // Render

  render() {
    const {
      id,
      name,
      language,
      cutoff,
      items
    } = this.props;

    return (
      <Card
        className={styles.qualityProfile}
        onPress={this.onEditQualityProfilePress}
      >
        <div className={styles.name}>
          {name}
        </div>

        <Label kind={kinds.PRIMARY}>
          {titleCase(language)}
        </Label>

        <div className={styles.qualities}>
          {
            items.map((item) => {
              if (!item.allowed) {
                return null;
              }

              const isCutoff = item.quality.id === cutoff.id;

              return (
                <Label
                  key={item.quality.id}
                  kind={isCutoff ? kinds.INFO : kinds.default}
                  title={isCutoff ? 'Cutoff' : null}
                >
                  {item.quality.name}
                </Label>
              );
            })
          }
        </div>

        <EditQualityProfileModalConnector
          id={id}
          isOpen={this.state.isEditQualityProfileModalOpen}
          onModalClose={this.onEditQualityProfileModalClose}
          onDeleteQualityProfilePress={this.onDeleteQualityProfilePress}
        />

        <ConfirmModal
          isOpen={this.state.isDeleteQualityProfileModalOpen}
          kind={kinds.DANGER}
          title="Delete Quality Profile"
          message={`Are you sure you want to delete the quality profile '${name}'?`}
          confirmLabel="Delete"
          onConfirm={this.onConfirmDeleteQualityProfile}
          onCancel={this.onDeleteQualityProfileModalClose}
        />
      </Card>
    );
  }
}

QualityProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  cutoff: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteQualityProfile: PropTypes.func.isRequired
};

export default QualityProfile;
