import React, { Component, PropTypes } from 'react';
const FormatHelpers = require('Shared/FormatHelpers');
import LoadingIndicator from 'Components/LoadingIndicator'
import FieldSet from 'Components/FieldSet'
import Table from 'Components/Table/Table'
import TableBody from 'Components/Table/TableBody'
import TableRow from 'Components/Table/TableRow'
import TableRowCell from 'Components/Table/TableRowCell'

class DiskSpace extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items
    } = this.props;

    const headers = [
      {
        name: 'path',
        label: 'Location'
      },
      {
        name: 'freeSpace',
        label: 'Free Space'
      },
      {
        name: 'totalSpace',
        label: 'Total Space'
      }
    ];

    return (
      <FieldSet
        legend="Disk Space"
      >
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
                    return (
                      <TableRow
                        key={item.path}
                      >
                        <TableRowCell>
                          {item.path}

                          {
                            item.label &&
                              ` (${item.label})`
                          }
                        </TableRowCell>
                        <TableRowCell>{FormatHelpers.bytes(item.freeSpace)}</TableRowCell>
                        <TableRowCell>{FormatHelpers.bytes(item.totalSpace)}</TableRowCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
        }
      </FieldSet>
    );
  }

}

DiskSpace.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.array
};

export default DiskSpace;
