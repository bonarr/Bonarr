import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import longDateTime from 'Utilities/Date/longDateTime';
import relativeTime from 'Utilities/Date/relativeTime';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './Tasks.css';

const headers = [
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'interval',
    label: 'Interval'
  },
  {
    name: 'lastExecution',
    label: 'Last Execution'
  },
  {
    name: 'nextExecution',
    label: 'Next Execution'
  },
  {
    name: 'actions',
    label: ''
  }
];

class Tasks extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items,
      onExecutePress
    } = this.props;

    return (
      <PageContent>
        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching &&
              <Table
                headers={headers}
              >
                <TableBody>
                  {
                    items.map((item) => {
                      const disabled = item.interval === 0;
                      const executeNow = !disabled && moment().isAfter(item.nextExecution);
                      const hasNextExecutionTime = !disabled && !executeNow;
                      const duration = moment.duration(item.interval, 'minutes').humanize().replace(/an?(?=\s)/, '1');
                      const lastExecution = item.lastExecution;
                      const nextExecution = item.nextExecution;

                      function onExecuteTaskPress(event) {
                        onExecutePress(item.taskName);
                      }

                      return (
                        <TableRow
                          key={item.id}
                        >
                          <TableRowCell>{item.name}</TableRowCell>
                          <TableRowCell
                            className={styles.interval}
                          >
                            {disabled ? 'disabled' : duration}
                          </TableRowCell>

                          <TableRowCell
                            className={styles.lastExecution}
                            title={longDateTime(lastExecution)}
                          >
                            {relativeTime(lastExecution)}
                          </TableRowCell>

                          {
                            disabled &&
                              <TableRowCell className={styles.nextExecution}>-</TableRowCell>
                          }

                          {
                            executeNow &&
                              <TableRowCell className={styles.nextExecution}>now</TableRowCell>
                          }

                          {
                            hasNextExecutionTime &&
                              <TableRowCell
                                className={styles.nextExecution}
                                title={longDateTime(nextExecution)}
                              >
                                {relativeTime(nextExecution)}
                              </TableRowCell>
                          }

                          <TableRowCell
                            className={styles.actions}
                          >
                            <Link
                              onPress={onExecuteTaskPress}
                              data-task-name={item.taskName}
                            >
                              {
                                <Icon
                                  name="icon-sonarr-refresh"
                                  {...item.executing ? { className: 'fa-spin' } : {}}
                                />
                              }
                            </Link>
                          </TableRowCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

Tasks.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onExecutePress: PropTypes.func.isRequired
};

export default Tasks;
