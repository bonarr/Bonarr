import React from 'react';
import LegendItem from './LegendItem';
import styles from './Legend.css';

function Legend() {
  return (
    <div className={styles.legend}>
      <div>
        <LegendItem
          name="Unaired Premiere"
          status="premiere"
          tooltip="Premiere episode hasn't aired yet"
        />

        <LegendItem
          status="unaired"
          tooltip="Episode hasn't aired yet"
        />
      </div>

      <div>
        <LegendItem
          name="On Air"
          status="onAir"
          tooltip="Episode is currently airing"
        />

        <LegendItem
          status="downloading"
          tooltip="Episode is currently downloading"
        />
      </div>

      <div>
        <LegendItem
          status="missing"
          tooltip="Episode file has not been found"
        />

        <LegendItem
          status="downloaded"
          tooltip="Episode was downloaded and sorted"
        />
      </div>

      <div>
        <LegendItem
          status="unmonitored"
          tooltip="Episode is unmonitored"
        />
      </div>
    </div>
  );
}

export default Legend;
