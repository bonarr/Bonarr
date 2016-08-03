import React, { Component, PropTypes } from 'react';
import styles from './Menu.css';

class Menu extends Component {

  //
  // Render

  render() {
    const {
      className,
      children
    } = this.props;

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Menu.defaultProps = {
  className: styles.menu
};

export default Menu;
