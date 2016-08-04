import React, { Component, PropTypes } from 'react';
import Link from 'Components/Link';
import styles from './MenuButton.css';

class MenuButton extends Component {

  //
  // Render

  render() {
    const {
      className,
      children,
      onPress
    } = this.props;

    return (
      <Link
        className={className}
        onPress={onPress}
      >
        {children}
      </Link>
    );
  }
}

MenuButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func
};

MenuButton.defaultProps = {
  className: styles.menuButton
};

export default MenuButton;
