import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import styles from './Link.css';

class Link extends Component {

  //
  // Listeners

  onClick = (event) => {
    const {
      isDisabled,
      onPress
    } = this.props;

    if (!isDisabled && onPress) {
      onPress(event);
    }
  }

  //
  // Render

  render() {
    const {
      className,
      component,
      to,
      target,
      isDisabled,
      onPress,
      ...otherProps
    } = this.props;

    const linkProps = { target };
    let el = component;

    if (to) {
      el = 'a';

      if (/\w+?:\/\//.test(to)) {
        linkProps.href = to;
        linkProps.target = target || '_blank';
      } else if (to.startsWith(window.Sonarr.UrlBase)) {
        linkProps.href = to;
        linkProps.target = target || '_self';
      } else {
        linkProps.href = `${window.Sonarr.UrlBase}/${to.replace(/^\//, '')}`;
        linkProps.target = target || '_self';
      }
    }

    if (el === 'button' || el === 'input') {
      linkProps.type = otherProps.type || 'button';
      linkProps.disabled = isDisabled;
    }

    linkProps.className = classNames(
      className,
      styles.link,
      to && styles.to,
      isDisabled && 'isDisabled'
    );

    return (
      React.createElement(el, {
        ...otherProps,
        ...linkProps,
        onClick: this.onClick
      })
    );
  }
}

Link.propTypes = {
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  to: PropTypes.string,
  target: PropTypes.string,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func
};

Link.defaultProps = {
  component: 'button'
};

export default Link;
