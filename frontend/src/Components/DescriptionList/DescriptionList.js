import React, { Component, PropTypes } from 'react';
import styles from './DescriptionList.css';

class DescriptionList extends Component {

  //
  // Render

  render() {
    const {
      children
    } = this.props;

    return (
      <dl className={styles.descriptionList}>
        {children}
      </dl>
    );
  }
}

DescriptionList.propTypes = {
  children: PropTypes.node
};

export default DescriptionList;
