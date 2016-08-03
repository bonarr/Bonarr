import React, { Component, PropTypes } from 'react';
import styles from './MenuContent.css';

class MenuContent extends Component {

  //
  // Render

  render() {
    const {
      className,
      children,
      isOpen
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div
        className={className}
      >
        {children}
      </div>
    );
  }
}

MenuContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired
};

MenuContent.defaultProps = {
  className: styles.menuContent
};

export default MenuContent;
