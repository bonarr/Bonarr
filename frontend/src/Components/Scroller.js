import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import scrollDirections from 'Utilities/scrollDirections';
import styles from './Scroller.css';

class Scroller extends Component {

  //
  // Render

  render() {
    const {
      className,
      scrollDirection,
      children
    } = this.props;

    return (
      <div
        className={classNames(
          className,
          styles[scrollDirection]
        )}
      >
        {children}
      </div>
    );
  }

}

Scroller.propTypes = {
  className: PropTypes.string.isRequired,
  scrollDirection: PropTypes.oneOf([scrollDirections.NONE, scrollDirections.HORIZONTAL, scrollDirections.VERTICAL]).isRequired,
  autoScroll: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

Scroller.defaultProps = {
  className: styles.scroller,
  scrollDirection: scrollDirections.VERTICAL,
  autoScroll: true
};

export default Scroller;
