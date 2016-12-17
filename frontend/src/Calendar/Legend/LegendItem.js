import React, { PropTypes } from 'react';
import classNames from 'classNames';
import titleCase from 'Utilities/String/titleCase';
import styles from './LegendItem.css';

function LegendItem({ name, status, tooltip }) {
  return (
    <div
      className={classNames(
        styles.legendItem,
        styles[status]
      )}
      title={tooltip}
    >
      {name ? name : titleCase(status)}
    </div>
  );
}

LegendItem.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired
};

export default LegendItem;
