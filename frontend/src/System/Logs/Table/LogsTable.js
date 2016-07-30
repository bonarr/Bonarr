import React, { Component, PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import LogsTableRow from './LogsTableRow';

const headers = [
  {
    name: 'level'
  },
  {
    name: 'logger',
    label: 'Component'
  },
  {
    name: 'message',
    label: 'Message'
  },
  {
    name: 'time',
    label: 'Time'
  }
];

class LogsTable extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items,
      ...otherProps
    } = this.props;

    return (
      <div>
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          !fetching &&
            <div>
              <Table
                headers={headers}
              >
                <TableBody>
                  {
                    items.map((item) => {
                      return (
                        <LogsTableRow
                          key={item.id}
                          {...item}
                        />
                      );
                    })
                  }
                </TableBody>
              </Table>

              <TablePager {...otherProps} />
            </div>
        }
      </div>
    );
  }

}

LogsTable.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.array,
  onExecutePress: PropTypes.func
};

export default LogsTable;
