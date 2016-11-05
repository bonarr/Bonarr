import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import styles from './Menu.css';

class Menu extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isMenuOpen: false
    };
  }

  //
  // Control

  _addListener() {
    window.addEventListener('click', this.onWindowClick);
  }

  _removeListener() {
    window.removeEventListener('click', this.onWindowClick);
  }

  //
  // Listeners

  @autobind
  onWindowClick(event) {
    const menu = ReactDOM.findDOMNode(this.refs.menu);
    const menuContent = ReactDOM.findDOMNode(this.refs.menuContent);

    if (!menu) {
      return;
    }

    if ((!menu.contains(event.target) || menuContent.contains(event.target)) && this.state.isMenuOpen) {
      this.setState({ isMenuOpen: false });
      this._removeListener();
    }
  }

  @autobind
  onMenuButtonPress() {
    if (this.state.isMenuOpen) {
      this._removeListener();
    } else {
      this._addListener();
    }

    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  //
  // Render

  render() {
    const {
      className,
      children
    } = this.props;

    const childrenArray = React.Children.toArray(children);
    const button = React.cloneElement(
      childrenArray[0],
      {
        onPress: this.onMenuButtonPress
      }
    );

    const content = React.cloneElement(
      childrenArray[1],
      {
        ref: 'menuContent',
        isOpen: this.state.isMenuOpen
      }
    );

    return (
      <div
        ref="menu"
        className={className}
      >
        {button}
        {content}
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
