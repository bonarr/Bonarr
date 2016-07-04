import React, { Component, PropTypes } from 'react';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import longDateTime from 'Utilities/Date/longDateTime';
import relativeDate from 'Utilities/Date/relativeDate';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/TableRowCell';
import styles from './Backups.css'

const headers = [
  {
    name: 'type',
    label: ''
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'time',
    label: 'Time'
  }
];

class Backups extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items
    } = this.props;

    const hasBackups = !fetching && items.length > 0;
    const noBackups = !fetching && !items.length;

    return (
      <div>
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          noBackups &&
            <div>No backups are available</div>
        }

        {
          hasBackups &&
            <Table
              headers={headers}
            >
              <TableBody>
                {
                  items.map((item) => {
                    const {
                      id,
                      type,
                      name,
                      time
                    } = item;

                    let iconClassName = 'icon-sonarr-backup-scheduled';
                    let iconTooltip = 'Scheduled';

                    if (type === 'manual') {
                      iconClassName = 'icon-sonarr-backup-manual';
                      iconTooltip = 'Manual';
                    } else if (item === 'update') {
                      iconClassName = 'icon-sonarr-backup-update';
                      iconTooltip = 'Before update';
                    }

                    return (
                      <TableRow
                        key={id}
                      >
                        <TableRowCell
                          className={styles.type}
                        >
                          {
                            <Icon
                              name={iconClassName}
                              title={iconTooltip}
                            />
                          }
                        </TableRowCell>

                        <TableRowCell>
                          <Link
                            className="no-router"
                            to={`backup/${type}/${name}`}
                          >
                            {name}
                          </Link>
                        </TableRowCell>

                        <TableRowCell
                          className={styles.time}
                          title={longDateTime(time)}
                        >
                          {relativeDate(time)}
                        </TableRowCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
        }
      </div>
    );
  }

}

Backups.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.array
};

export default Backups;
