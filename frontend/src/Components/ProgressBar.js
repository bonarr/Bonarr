import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { kinds, sizes } from 'Helpers/Props';
import styles from './ProgressBar.css';

function ProgressBar(props) {
  const {
    title,
    progress,
    precision,
    showValue,
    kind,
    size
  } = props;

  const progressPercent = `${progress.toFixed(precision)}%`;

  return (
    <div
      className={styles.progress}
      title={title}
    >
      <div
        className={classNames(
          styles.progressBar,
          styles[kind],
          styles[size]
        )}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: progressPercent }}
      >
        {showValue && progressPercent}
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  title: PropTypes.string,
  progress: PropTypes.number.isRequired,
  precision: PropTypes.number.isRequired,
  showValue: PropTypes.bool.isRequired,
  kind: PropTypes.oneOf(kinds.all).isRequired,
  size: PropTypes.oneOf(sizes.all).isRequired
};

ProgressBar.defaultProps = {
  precision: 1,
  showValue: false,
  kind: kinds.PRIMARY,
  size: sizes.MEDIUM
};

export default ProgressBar;
