import React, { Component, PropTypes } from 'react';
import Scroller from 'Components/Scroller';
import styles from './ModalBody.css';

class ModalBody extends Component {

  //
  // Render

  render() {
    const {
      bodyClassName,
      children,
      ...otherProps
    } = this.props;

    return (
      <Scroller
        className={styles.modalScroller}
        {...otherProps}
      >
        <div className={bodyClassName}>
          {children}
        </div>
      </Scroller>
    );
  }

}

ModalBody.propTypes = {
  children: PropTypes.node,
  bodyClassName: PropTypes.string
};

ModalBody.defaultProps = {
  className: styles.scroller,
  bodyClassName: styles.modalBody
};

export default ModalBody;
