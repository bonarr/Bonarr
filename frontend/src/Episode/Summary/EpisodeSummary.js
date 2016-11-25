import React, { Component, PropTypes } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { kinds, sizes } from 'Helpers/Props';
import IconButton from 'Components/IconButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import Label from 'Components/Label';
import QualityProfileNameConnector from 'Settings/Profile/Quality/QualityProfileNameConnector';
import EpisodeAiringConnector from './EpisodeAiringConnector';
import styles from './EpisodeSummary.css';

class EpisodeSummary extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isRemoveEpisodeFileModalOpen: false
    };
  }

  //
  // Listeners

  onRemoveEpisodeFilePress = () => {
    this.setState({ isRemoveEpisodeFileModalOpen: true });
  }

  onConfirmRemoveEpisodeFile = () => {
    this.props.onDeleteEpisodeFilePress();
    this.setState({ isRemoveEpisodeFileModalOpen: false });
  }

  onRemoveEpisodeFileModalClose = () => {
    this.setState({ isRemoveEpisodeFileModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      qualityProfileId,
      network,
      overview,
      airDateUtc,
      path,
      size,
      quality
    } = this.props;

    const hasOverview = !!overview;

    return (
      <div>
        <div>
          <span className={styles.infoTitle}>Airs</span>

          <EpisodeAiringConnector
            airDateUtc={airDateUtc}
            network={network}
          />
        </div>

        <div>
          <span className={styles.infoTitle}>Quality Profile</span>

          <Label
            kind={kinds.PRIMARY}
            size={sizes.MEDIUM}
          >
            <QualityProfileNameConnector
              qualityProfileId={qualityProfileId}
            />
          </Label>
        </div>

        <div className={styles.overview}>
          {
            hasOverview ?
            overview :
            'No episode overview.'
          }
        </div>

        {
          path &&
            <div className={styles.files}>
              <div className={styles.filesHeader}>
                <div className={styles.path}>
                  Path
                </div>

                <div className={styles.size}>
                  Size
                </div>

                <div className={styles.quality}>
                  Quality
                </div>

                <div className={styles.actions}></div>
              </div>

              <div className={styles.fileRow}>
                <div className={styles.path}>
                  {path}
                </div>

                <div className={styles.size}>
                  {formatBytes(size)}
                </div>

                <div className={styles.quality}>
                  {quality.name}
                </div>

                <div className={styles.actions}>
                  <IconButton
                    name="icon-sonarr-delete-row"
                    onPress={this.onConfirmRemoveEpisodeFile}
                  />
                </div>
              </div>
            </div>
        }

        <ConfirmModal
          isOpen={this.state.isRemoveEpisodeFileModalOpen}
          kind={kinds.DANGER}
          title="Delete Episode File"
          message={`Are you sure you want to delete '${path}'?`}
          confirmLabel="Delete"
          onConfirm={this.onConfirmRemoveEpisodeFile}
          onCancel={this.onRemoveEpisodeFileModalClose}
        />
      </div>
    );
  }
}

EpisodeSummary.propTypes = {
  episodeFileId: PropTypes.number.isRequired,
  qualityProfileId: PropTypes.number.isRequired,
  network: PropTypes.string.isRequired,
  overview: PropTypes.string,
  airDateUtc: PropTypes.string.isRequired,
  path: PropTypes.string,
  size: PropTypes.string,
  quality: PropTypes.object,
  onDeleteEpisodeFilePress: PropTypes.func.isRequired
};

export default EpisodeSummary;
