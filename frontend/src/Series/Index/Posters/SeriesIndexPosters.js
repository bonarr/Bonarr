import React, { PropTypes } from 'react';
import SeriesIndexItemConnector from 'Series/Index/SeriesIndexItemConnector';
import SeriesIndexPoster from './SeriesIndexPoster';
import styles from './SeriesIndexPosters.css';

function SeriesIndexPosters(props) {
  const {
    items,
    showRelativeDates,
    shortDateFormat,
    timeFormat
  } = props;

  return (
    <div className={styles.posters}>
      {
        items.map((item) => {
          return (
            <SeriesIndexItemConnector
              key={item.id}
              component={SeriesIndexPoster}
              showRelativeDates={showRelativeDates}
              shortDateFormat={shortDateFormat}
              timeFormat={timeFormat}
              {...item}
            />
          );
        })
      }
    </div>
  );
}

SeriesIndexPosters.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default SeriesIndexPosters;
