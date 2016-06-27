import React, { Component, PropTypes } from 'react';
import styles from './FieldSet.css';

class FieldSet extends Component {

  //
  // Render

  render() {
    const {
      legend,
      children
    } = this.props;

    return (
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          {legend}
        </legend>
        {children}
      </fieldset>
    )
  }

}

FieldSet.propTypes = {
  legend: PropTypes.string,
  children: PropTypes.node
};

export default FieldSet
