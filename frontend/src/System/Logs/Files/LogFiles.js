import React, { Component, PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/PageToolbar';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import LogsNavMenu from '../LogsNavMenu';
import LogFilesTableRow from './LogFilesTableRow';

const headers = [
  {
    name: 'filename',
    label: 'Filename'
  },
  {
    name: 'lastWriteTime',
    label: 'Last Write Time'
  },
  {
    name: 'download',
    label: ''
  }
];

class LogFiles extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items,
      ...otherProps
    } = this.props;

    return (
      <PageContent>
        <PageToolbar>
          <LogsNavMenu current="Log Files" />
        </PageToolbar>
        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching &&
              <div>
                <Table
                  headers={headers}
                  {...otherProps}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <LogFilesTableRow
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
        </PageContentBody>
      </PageContent>
    );
  }

}

LogFiles.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};

export default LogFiles;
