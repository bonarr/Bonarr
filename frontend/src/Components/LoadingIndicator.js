import React, { Component, PropTypes } from 'react';
import styles from './LoadingIndicator.css'

class LoadingIndicator extends Component {

  //
  // Render

  render() {
    const {
      size,
      containerClassName
    } = this.props;

    const sizeInPx = size + 'px';
    const width = sizeInPx;
    const height = sizeInPx;

    return (
      <div
        className={containerClassName}
        style={{ height }}
      >
        <div className={styles.rippleContainer}>
          <div
            className={styles.ripple}
            style={{ width, height }}
          ></div>

          <div
            className={styles.ripple}
            style={{ width, height }}
          ></div>

          <div
            className={styles.ripple}
            style={{ width, height }}
          ></div>
        </div>
      </div>
    );
  }

}

LoadingIndicator.propTypes = {
  size: PropTypes.number,
  containerClassName: PropTypes.string
};

LoadingIndicator.defaultProps = {
  size: 50,
  containerClassName: styles.container
};

export default LoadingIndicator
