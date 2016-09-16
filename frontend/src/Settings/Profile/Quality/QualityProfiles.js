import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import FieldSet from 'Components/FieldSet';
import Card from 'Components/Card';
import Icon from 'Components/Icon';
import PageSectionContent from 'Components/Page/PageSectionContent';
import QualityProfile from './QualityProfile';
import EditQualityProfileModalConnector from './EditQualityProfileModalConnector';
import styles from './QualityProfiles.css';

class QualityProfiles extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isQualityProfileModalOpen: false
    };
  }

  //
  // Listeners

  @autobind
  onEditQualityProfilePress() {
    this.setState({ isQualityProfileModalOpen: true });
  }

  @autobind
  onModalClose() {
    this.setState({ isQualityProfileModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      items,
      onConfirmDeleteQualityProfile,
      ...otherProps
    } = this.props;

    return (
      <FieldSet
        legend="Quality Profiles"
      >
        <PageSectionContent
          errorMessage="Unable to load Quality Profiles"
          {...otherProps}
        >
          <div className={styles.qualityProfiles}>
            <Card
              className={styles.addQualityProfile}
              onPress={this.onEditQualityProfilePress}
            >
              <div className={styles.center}>
                <Icon name="icon-sonarr-add" />
              </div>
            </Card>

            {
              items.map((item) => {
                return (
                  <QualityProfile
                    key={item.id}
                    {...item}
                    onConfirmDeleteQualityProfile={onConfirmDeleteQualityProfile}
                  />
                );
              })
            }
          </div>

          <EditQualityProfileModalConnector
            isOpen={this.state.isQualityProfileModalOpen}
            onModalClose={this.onModalClose}
          />
        </PageSectionContent>
      </FieldSet>
    );
  }
}

QualityProfiles.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteQualityProfile: PropTypes.func.isRequired
};

export default QualityProfiles;
