import React, { Component, PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
      <div className={styles.modalScroller}>
        <Scrollbars
          className={styles.modalScroller}
          {...otherProps}
        >
          <div className={bodyClassName}>
            {children}
          </div>
        </Scrollbars>
      </div>
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
