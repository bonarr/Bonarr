import React, { Component, PropTypes } from 'react';
import styles from './DescriptionListItemDescription.css';

class DescriptionListItemDescription extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <dd className={styles.description}>
        {children}
      </dd>
    );
  }
}

DescriptionListItemDescription.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
};

export default DescriptionListItemDescription;
