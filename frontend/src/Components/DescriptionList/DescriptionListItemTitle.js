import React, { Component, PropTypes } from 'react';
import styles from './DescriptionListItemTitle.css';

class DescriptionListItemTitle extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <dt className={styles.title}>{children}</dt>
    );
  }
}

DescriptionListItemTitle.propTypes = {
  children: PropTypes.string
};

export default DescriptionListItemTitle;
