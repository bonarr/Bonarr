import React, { Component, PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import TableBody from 'Components/Table/TableBody';
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
      deleteFilesExecuting,
      currentLogView,
      onRefreshPress,
      onDeleteFilesPress,
      ...otherProps
    } = this.props;

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <LogsNavMenu current={currentLogView} />

            <PageToolbarSeparator />

            <PageToolbarButton
              iconName="icon-sonarr-refresh"
              animateIconName="icon-sonarr-refresh"
              animate={fetching}
              onPress={onRefreshPress}
            />

            <PageToolbarButton
              iconName="icon-sonarr-clear"
              animate={deleteFilesExecuting}
              onPress={onDeleteFilesPress}
            />
          </PageToolbarSection>
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
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }

}

LogFiles.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  deleteFilesExecuting: PropTypes.bool.isRequired,
  currentLogView: PropTypes.string.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onDeleteFilesPress: PropTypes.func.isRequired
};

export default LogFiles;
