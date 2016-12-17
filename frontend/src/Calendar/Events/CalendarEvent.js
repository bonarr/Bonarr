import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import formatTime from 'Utilities/Date/formatTime';
import padNumber from 'Utilities/Number/padNumber';
import getStatusStyle from 'Calendar/getStatusStyle';
import episodeEntities from 'Episode/episodeEntities';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import EpisodeDetailsModal from 'Episode/EpisodeDetailsModal';
import CalendarEventQueueDetails from './CalendarEventQueueDetails';
import styles from './CalendarEvent.css';

class CalendarEvent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onDetailsModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      series,
      title,
      seasonNumber,
      episodeNumber,
      absoluteEpisodeNumber,
      airDateUtc,
      monitored,
      hasFile,
      grabbed,
      queueItem,
      timeFormat
    } = this.props;

    const startTime = moment(airDateUtc);
    const endTime = startTime.add(series.runtime, 'minutes');
    const downloading = !!(queueItem || grabbed);
    const isMonitored = series.monitored && monitored;
    const statusStyle = getStatusStyle(episodeNumber, hasFile, downloading, startTime, endTime, isMonitored);

    return (
      <div>
        <Link
          className={classNames(
            styles.event,
            styles[statusStyle]
          )}
          component="div"
          onPress={this.onPress}
        >
          <div className={styles.info}>
            <div className={styles.seriesTitle}>
              {series.title}
            </div>

            {
              !!queueItem &&
                <CalendarEventQueueDetails
                  seriesType={series.seriesType}
                  seasonNumber={seasonNumber}
                  absoluteEpisodeNumber={absoluteEpisodeNumber}
                  {...queueItem}
                />
            }

            {
              !queueItem && grabbed &&
                <Icon
                  name="icon-sonarr-downloading"
                  title="Episode is downloading"
                />
            }
          </div>

          <div className={styles.episodeInfo}>
            <div className={styles.episodeTitle}>
              {title}
            </div>

            <div>
              {seasonNumber}x{padNumber(episodeNumber, 2)}

              {
                series.seriesType === 'anime' && absoluteEpisodeNumber &&
                  <span className={styles.absoluteEpisodeNumber}>({absoluteEpisodeNumber})</span>
              }
            </div>
          </div>

          <div>
            {formatTime(airDateUtc, timeFormat)} - {formatTime(endTime.toISOString(), timeFormat, { includeMinuteZero: true })}
          </div>
        </Link>

        <EpisodeDetailsModal
          isOpen={this.state.isDetailsModalOpen}
          episodeId={id}
          episodeEntity={episodeEntities.CALENDAR}
          seriesId={series.id}
          episodeTitle={title}
          showOpenSeriesButton={true}
          onModalClose={this.onDetailsModalClose}
        />
      </div>
    );
  }
}

CalendarEvent.propTypes = {
  id: PropTypes.number.isRequired,
  series: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  airDateUtc: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  hasFile: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool,
  queueItem: PropTypes.object,
  timeFormat: PropTypes.string.isRequired
};

export default CalendarEvent;
