import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import styles from './Link.css'

class Link extends Component {

  //
  // Listeners

  @autobind
  onClick(event) {
    const {
      disabled,
      onPress
    } = this.props;

    if (!disabled && onPress) {
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
      disabled,
      ...otherProps
    } = this.props;

    const linkProps = {};
    let el = component;

    if (to) {
      el = 'a';
      linkProps.href = to;
      linkProps.target = to.startsWith('http') ? '_blank' : '_self';
    }

    linkProps.className = classNames(
      className,
      styles.link,
      disabled && styles.disabled
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
  component: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
};

Link.defaultProps = {
  component: 'button'
};

export default Link;
