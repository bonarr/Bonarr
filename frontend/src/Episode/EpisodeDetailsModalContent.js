import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classNames';
import Button from 'Components/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import EpisodeSummaryConnector from './Summary/EpisodeSummaryConnector';
import EpisodeHistoryConnector from './History/EpisodeHistoryConnector';
import SeasonEpisodeNumber from './SeasonEpisodeNumber';
import styles from './EpisodeDetailsModalContent.css';

const tabs = [
  'details',
  'history',
  'search'
];

class EpisodeDetailsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedTab: 'details'
    };
  }

  componentWillMount() {
    this.setState({ selectedTab: this.props.selectedTab });
    Tabs.setUseDefaultStyles(false);
  }

  //
  // Listeners

  onTabSelect = (index, lastIndex) => {
    this.setState({ selectedTab: tabs[index] });
  }

  //
  // Render

  render() {
    const {
      episodeId,
      episodeEntity,
      episodeFileId,
      seriesId,
      seriesTitle,
      titleSlug,
      seriesType,
      seasonNumber,
      episodeNumber,
      absoluteEpisodeNumber,
      episodeTitle,
      airDate,
      monitored,
      isSaving,
      showOpenSeriesButton,
      onMonitorEpisodePress,
      onModalClose
    } = this.props;

    const seriesLink = `/series/${titleSlug}`;

    return (
      <ModalContent
        onModalClose={onModalClose}
      >
        <ModalHeader>
          <MonitorToggleButton
            className={styles.toggleButton}
            id={episodeId}
            monitored={monitored}
            isSaving={isSaving}
            onPress={onMonitorEpisodePress}
          />

          {seriesTitle}

          <span className={styles.separator}>-</span>

          <SeasonEpisodeNumber
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
            absoluteEpisodeNumber={absoluteEpisodeNumber}
            airDate={airDate}
            seriesType={seriesType}
          />

          <span className={styles.separator}>-</span>

          {episodeTitle}
        </ModalHeader>

        <ModalBody>
          <Tabs
            className={styles.tabs}
            selectedIndex={tabs.indexOf(this.state.selectedTab)}
            onSelect={this.onTabSelect}
          >
            <TabList
              className={styles.tabList}
              activeTabClassName={styles.selectedTab}
            >
              <Tab className={styles.tab}>
                Details
              </Tab>

              <Tab className={styles.tab}>
                History
              </Tab>

              <Tab className={styles.tab}>
                Search
              </Tab>
            </TabList>

            <TabPanel className={styles.tabPanel}>
              <EpisodeSummaryConnector
                episodeId={episodeId}
                episodeEntity={episodeEntity}
                episodeFileId={episodeFileId}
                seriesId={seriesId}
              />
            </TabPanel>

            <TabPanel className={styles.tabPanel}>
              <EpisodeHistoryConnector
                episodeId={episodeId}
              />
            </TabPanel>

            <TabPanel className={styles.tabPanel}>
              <h2>Search goes here</h2>
            </TabPanel>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          {
            showOpenSeriesButton &&
              <Button
                className={styles.openSeriesButton}
                to={seriesLink}
                onPress={onModalClose}
              >
                Open Series
              </Button>
          }

          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

EpisodeDetailsModalContent.propTypes = {
  episodeId: PropTypes.number.isRequired,
  episodeEntity: PropTypes.string.isRequired,
  episodeFileId: PropTypes.number.isRequired,
  seriesId: PropTypes.number.isRequired,
  seriesTitle: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  seriesType: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  airDate: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool,
  showOpenSeriesButton: PropTypes.bool,
  selectedTab: PropTypes.string.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

EpisodeDetailsModalContent.defaultProps = {
  selectedTab: 'details'
};

export default EpisodeDetailsModalContent;
