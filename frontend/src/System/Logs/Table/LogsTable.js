import React, { Component, PropTypes } from 'react';
import { align } from 'Helpers/Props';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import FilterMenu from 'Components/Menu/FilterMenu';
import FilterMenuItem from 'Components/Menu/FilterMenuItem';
import MenuContent from 'Components/Menu/MenuContent';
import LogsNavMenu from '../LogsNavMenu';
import LogsTableRow from './LogsTableRow';

const headers = [
  {
    name: 'level',
    sortable: true
  },
  {
    name: 'logger',
    label: 'Component',
    sortable: true
  },
  {
    name: 'message',
    label: 'Message'
  },
  {
    name: 'time',
    label: 'Time',
    sortable: true
  }
];

class LogsTable extends Component {

  //
  // Listeners

  onFilterMenuItemPress = (filterKey, filterValue) => {
    this.props.onFilterSelect(filterKey, filterValue);
  }

  //
  // Render

  render() {
    const {
      fetching,
      items,
      filterKey,
      filterValue,
      clearLogExecuting,
      onRefreshPress,
      onClearLogsPress,
      ...otherProps
    } = this.props;

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <LogsNavMenu current="Logs" />

            <PageToolbarSeparator />

            <PageToolbarButton
              iconName="icon-sonarr-refresh"
              animateIconName="icon-sonarr-refresh"
              animate={fetching}
              onPress={onRefreshPress}
            />

            <PageToolbarButton
              iconName="icon-sonarr-clear"
              animate={clearLogExecuting}
              onPress={onClearLogsPress}
            />
          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <FilterMenu>
              <MenuContent alignMenu={align.RIGHT}>
                <FilterMenuItem
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={this.onFilterMenuItemPress}
                >
                  All
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Info"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={this.onFilterMenuItemPress}
                >
                  Info
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Warn"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={this.onFilterMenuItemPress}
                >
                  Warn
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Error"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={this.onFilterMenuItemPress}
                >
                  Error
                </FilterMenuItem>
              </MenuContent>
            </FilterMenu>
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
        </PageContentBody>
      </PageContent>
    );
  }

}

LogsTable.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  filterKey: PropTypes.string,
  filterValue: PropTypes.string,
  clearLogExecuting: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onClearLogsPress: PropTypes.func.isRequired
};

export default LogsTable;
