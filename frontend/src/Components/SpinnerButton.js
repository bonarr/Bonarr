import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import Button from './Button';
import Icon from './Icon';
import styles from './SpinnerButton.css';

class SpinnerButton extends Component {

  //
  // Render

  render() {
    const {
      className,
      isSpinning,
      spinnerIcon,
      children,
      ...otherProps
    } = this.props;

    return (
      <Button
        className={classNames(
          className,
          styles.button,
          isSpinning && styles.isSpinning
        )}
        isDisabled={isSpinning}
        {...otherProps}
      >
        <span className={styles.spinnerContainer}>
          <Icon
            className={styles.spinner}
            name={classNames(
              spinnerIcon,
              'fa-spin'
            )}
          />
        </span>
        <span className={styles.label}>{children}</span>
      </Button>
    );
  }

}

SpinnerButton.propTypes = {
  className: PropTypes.string.isRequired,
  isSpinning: PropTypes.bool.isRequired,
  spinnerIcon: PropTypes.string.isRequired,
  children: PropTypes.node
};

SpinnerButton.defaultProps = {
  className: styles.button,
  spinnerIcon: 'icon-sonarr-spinner'
};

export default SpinnerButton;
