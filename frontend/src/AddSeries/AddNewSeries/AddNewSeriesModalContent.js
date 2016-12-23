import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { kinds, inputTypes, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import SpinnerButton from 'Components/SpinnerButton';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import CheckInput from 'Components/Form/CheckInput';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Popover from 'Components/Tooltip/Popover';
import SeriesPoster from 'Series/SeriesPoster';
import SeriesMonitoringOptionsPopoverContent from 'AddSeries/SeriesMonitoringOptionsPopoverContent';
import styles from './AddNewSeriesModalContent.css';

class AddNewSeriesModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchForMissingEpisodes: false
    };
  }

  componentDidMount() {
    const {
      qualityProfileId,
      qualityProfiles,
      rootFolder,
      rootFolders,
      onInputChange
    } = this.props;

    if ((!qualityProfileId || !_.find(qualityProfiles, { id: qualityProfileId })) && qualityProfiles.length) {
      onInputChange({ name: 'qualityProfileId', value: qualityProfiles[0].id });
    }

    if ((!rootFolder || !_.find(rootFolders, { path: rootFolder })) && rootFolders.length) {
      onInputChange({ name: 'rootFolder', value: rootFolders[0].path });
    }
  }

  //
  // Listeners

  onSearchForMissingEpisodesChange = ({ value }) => {
    this.setState({ searchForMissingEpisodes: value });
  }

  onQualityProfileIdChange = ({ value }) => {
    this.props.onInputChange({ name: 'qualityProfileId', value: parseInt(value) });
  }

  onAddSeriesPress = () => {
    this.props.onAddSeriesPress(this.state.searchForMissingEpisodes);
  }

  //
  // Render

  render() {
    const {
      title,
      year,
      overview,
      images,
      qualityProfiles,
      rootFolders,
      adding,
      addError,
      rootFolder,
      monitor,
      qualityProfileId,
      seriesType,
      seasonFolder,
      onModalClose,
      onInputChange
    } = this.props;

    const qualityProfileOptions = _.reduce(qualityProfiles, (acc, qualityProfile) => {
      acc.push({ [qualityProfile.id]: qualityProfile.name });

      return acc;
    }, []);

    const rootFolderOptions = _.reduce(rootFolders, (acc, r) => {
      acc.push({ [r.path]: r.path });

      return acc;
    }, []);

    const monitorOptions = [
      { 'all': 'All Episodes' },
      { 'future': 'Future Episodes' },
      { 'missing': 'Missing Episodes' },
      { 'existing': 'Existing Episodes' },
      { 'first': 'Only First Season' },
      { 'latest': 'Only Latest Season' },
      { 'none': 'None' }
    ];

    const seriesTypeOptions = [
      { 'standard': 'Standard' },
      { 'daily': 'Daily' },
      { 'anime': 'Anime' }
    ];

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {title}

          {
            !title.contains(year) &&
              <span className={styles.year}>({year})</span>
          }
        </ModalHeader>

        <ModalBody>
          <div className={styles.container}>
            <div className={styles.poster}>
              <SeriesPoster
                className={styles.poster}
                images={images}
                size={250}
              />
            </div>

            <div>
              <div className={styles.overview}>
                {overview}
              </div>

              <Form>
                <FormGroup>
                  <FormLabel>Path</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="rootFolder"
                    value={rootFolder}
                    values={rootFolderOptions}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Monitor

                    <Popover
                      anchor={
                        <Icon
                          className={styles.monitorDetailsIcon}
                          name="icon-sonarr-details"
                        />
                      }
                      title="Monitoring Options"
                      body={<SeriesMonitoringOptionsPopoverContent />}
                      position={tooltipPositions.RIGHT}
                    />
                  </FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="monitor"
                    value={monitor}
                    values={monitorOptions}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Quality Profile</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="qualityProfileId"
                    value={qualityProfileId}
                    values={qualityProfileOptions}
                    onChange={this.onQualityProfileIdChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Series Type</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="seriesType"
                    value={seriesType}
                    values={seriesTypeOptions}
                    onChange={onInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Season Folder</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="seasonFolder"
                    value={seasonFolder}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Form>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <label className={styles.searchForMissingEpisodesLabelContainer}>
            <span className={styles.searchForMissingEpisodesLabel}>
              Start search for missing episodes
            </span>

            <CheckInput
              containerClassName={styles.searchForMissingEpisodesContainer}
              className={styles.searchForMissingEpisodesInput}
              name="searchForMissingEpisodes"
              value={this.state.searchForMissingEpisodes}
              onChange={this.onSearchForMissingEpisodesChange}
            />
          </label>

          <SpinnerButton
            kind={kinds.SUCCESS}
            isSpinning={adding}
            onPress={this.onAddSeriesPress}
          >
            Add {title}
          </SpinnerButton>
        </ModalFooter>
      </ModalContent>
    );
  }
}

AddNewSeriesModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  overview: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  qualityProfiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  rootFolders: PropTypes.arrayOf(PropTypes.object).isRequired,
  adding: PropTypes.bool.isRequired,
  addError: PropTypes.object,
  rootFolder: PropTypes.string,
  monitor: PropTypes.string.isRequired,
  qualityProfileId: PropTypes.number,
  seriesType: PropTypes.string.isRequired,
  seasonFolder: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAddSeriesPress: PropTypes.func.isRequired
};

export default AddNewSeriesModalContent;
