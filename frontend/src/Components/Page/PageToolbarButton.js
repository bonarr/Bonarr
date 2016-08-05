import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import Link from 'Components/Link';
import Icon from 'Components/Icon';
import styles from './PageToolbarButton.css';

class PageToolbarButton extends Component {

  //
  // Render

  render() {
    const {
      iconName,
      animateIconName,
      animate,
      onPress,
      ...otherProps
    } = this.props;

    const icon = animate && !!animateIconName ? animateIconName : iconName;

    return (
      <Link
        className={styles.toolbarButton}
        onPress={onPress}
        {...otherProps}
      >
        <Icon name={classNames(
          icon,
          animate && 'fa-spin'
        )} />
      </Link>
    );
  }

}

PageToolbarButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  animateIconName: PropTypes.string,
  animate: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

PageToolbarButton.defaultProps = {
  animateIconName: 'icon-sonarr-spinner',
  animate: false
};

export default PageToolbarButton;
