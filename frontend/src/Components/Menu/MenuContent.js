import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import { align } from 'Helpers/Props';
import styles from './MenuContent.css';

class MenuContent extends Component {

  //
  // Render

  render() {
    const {
      className,
      children,
      alignMenu,
      isOpen
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div
        className={classNames(
          className,
          styles[alignMenu]
        )}
      >
        {children}
      </div>
    );
  }
}

MenuContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  alignMenu: PropTypes.oneOf([align.LEFT, align.RIGHT]),
  isOpen: PropTypes.bool
};

MenuContent.defaultProps = {
  className: styles.menuContent,
  alignMenu: align.LEFT
};

export default MenuContent;
