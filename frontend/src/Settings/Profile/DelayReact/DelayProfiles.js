import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import FieldSet from 'Components/FieldSet';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import PageSectionContent from 'Components/Page/PageSectionContent';
import DelayProfile from './DelayProfile';
import EditDelayProfileModalConnector from './EditDelayProfileModalConnector';
import styles from './DelayProfiles.css';

class DelayProfiles extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddDelayProfileModalOpen: false
    };
  }

  //
  // Listeners

  @autobind
  onAddDelayProfilePress() {
    this.setState({ isAddDelayProfileModalOpen: true });
  }

  @autobind
  onModalClose() {
    this.setState({ isAddDelayProfileModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      defaultProfile,
      items,
      tagList,
      onConfirmDeleteDelayProfile,
      ...otherProps
    } = this.props;

    return (
      <FieldSet
        legend="Delay Profiles"
      >
        <PageSectionContent
          errorMessage="Unable to load Delay Profiles"
          {...otherProps}
        >
          <div className={styles.delayProfilesHeader}>
            <div className={styles.column}>Protocol</div>
            <div className={styles.column}>Usenet Delay</div>
            <div className={styles.column}>Torrent Delay</div>
            <div className={styles.tags}>Tags</div>
          </div>

          <div>
            {
              items.map((item) => {
                return (
                  <DelayProfile
                    key={item.id}
                    tagList={tagList}
                    {...item}
                    onConfirmDeleteDelayProfile={onConfirmDeleteDelayProfile}
                  />
                );
              })
            }
          </div>

          {
            defaultProfile &&
              <div>
                <DelayProfile
                  tagList={tagList}
                  onConfirmDeleteDelayProfile={onConfirmDeleteDelayProfile}
                  {...defaultProfile}
                />
              </div>
          }

          <div className={styles.addDelayProfile}>
            <Link
              onPress={this.onAddDelayProfilePress}
            >
              <Icon name="icon-sonarr-add" />
            </Link>
          </div>

          <EditDelayProfileModalConnector
            isOpen={this.state.isAddDelayProfileModalOpen}
            onModalClose={this.onModalClose}
          />
        </PageSectionContent>
      </FieldSet>
    );
  }
}

DelayProfiles.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  defaultProfile: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteDelayProfile: PropTypes.func.isRequired
};

export default DelayProfiles;
