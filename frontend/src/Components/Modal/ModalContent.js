import React, { PropTypes } from 'react';
import Link from 'Components/Link';
import Icon from 'Components/Icon';
import styles from './ModalContent.css';

function ModalContent(props) {
  const {
    className,
    children,
    onModalClose,
    ...otherProps
  } = props;

  return (
    <div
      className={className}
      {...otherProps}
    >
      <Link
        className={styles.closeButton}
        onPress={onModalClose}
      >
        <Icon name="icon-sonarr-close-modal" />
      </Link>

      {children}
    </div>
  );
}

ModalContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onModalClose: PropTypes.func.isRequired
};

ModalContent.defaultProps = {
  className: styles.modalContent
};

export default ModalContent;
