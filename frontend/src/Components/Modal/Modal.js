import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';
import * as keyCodes from 'Utilities/Constants/keyCodes';
import styles from './Modal.css';

class Modal extends Component {

  //
  // Lifecycle

  componentDidMount() {
    if (this.props.isOpen) {
      this._openModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this._openModal();
    } else if (prevProps.isOpen && !this.props.isOpen) {
      this._closeModal();
    }
  }

  componentWillUnmount() {
    if (this.props.isOpen) {
      this._closeModal();
    }
  }

  //
  // Control

  _openModal() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  _closeModal() {
    clearTimeout(this._autoFocusTimeoutID);

    document.removeEventListener('keydown', this.onKeyDown);
  }

  _isBackdropTarget(event) {
    const targetElement = this._findEventTarget(event);

    if (targetElement) {
      const modalElement = ReactDOM.findDOMNode(this.refs.modal);

      return !modalElement || !modalElement.contains(targetElement);
    }

    return false;
  }

  _findEventTarget(event) {
    const changedTouches = event.changedTouches;

    if (!changedTouches) {
      return event.target;
    }

    if (changedTouches.length === 1) {
      const touch = changedTouches[0];

      return document.elementFromPoint(touch.clientX, touch.clientY);
    }
  }

  //
  // Listeners

  onBackdropBeginPress = (event) => {
    this._isBackdropPressed = this._isBackdropTarget(event);
  }

  onBackdropEndPress = (event) => {
    if (this._isBackdropPressed && this._isBackdropTarget(event)) {
      this.props.onModalClose();
    }

    this._isBackdropPressed = false;
  }

  onKeyDown = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();

      this.props.onModalClose();
    }
  }

  onClosePress = (event) => {
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    const {
      className,
      backdropClassName,
      children,
      isOpen
    } = this.props;

    return (
      <Portal
        isOpened={isOpen}
      >
        <div>
          {
            isOpen &&
              <div
                className={styles.modalContainer}
              >
                <div
                  className={backdropClassName}
                  onMouseDown={this.onBackdropBeginPress}
                  onMouseUp={this.onBackdropEndPress}
                >
                  <div
                    ref="modal"
                    className={className}
                  >
                    {children}
                  </div>
                </div>
              </div>
          }
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  className: styles.modal,
  backdropClassName: styles.modalBackdrop
};

export default Modal;
