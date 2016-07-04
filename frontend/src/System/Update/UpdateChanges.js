import React, { Component, PropTypes } from 'react';
import styles from './UpdateChanges.css';

class UpdateChanges extends Component {

  //
  // Render

  render() {
    const {
      title,
      changes
    } = this.props;

    if (changes.length === 0) {
      return null;
    }

    return (
      <div>
        <div className={styles.title}>{title}</div>
        <ul>
          {
            changes.map((change, index) => {
              return (
                <li key={index}>
                  {change}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }

}

UpdateChanges.propTypes = {
  title: PropTypes.string.isRequired,
  changes: PropTypes.arrayOf(PropTypes.string)
};

export default UpdateChanges
