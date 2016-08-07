import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import align from 'Utilities/align';
import LoadingIndicator from 'Components/LoadingIndicator';
import Icon from 'Components/Icon';
import Table from 'Components/Table/Table';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import MenuContent from 'Components/Menu/MenuContent';
import FilterMenuItem from 'Components/Menu/FilterMenuItem';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import LogsNavMenu from '../LogsNavMenu';
import LogsTableRow from './LogsTableRow';
import styles from './LogsTable.css';

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

  @autobind
  onFilterMenuItemPress(filterKey, filterValue) {
    this.props.onFilterSelect(filterKey, filterValue);
  }

  //
  // Render

  render() {
    const {
      fetching,
      items,
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
            <Menu>
              <MenuButton>
                <Icon name="icon-sonarr-filter" className={styles.filterMenuButtonIcon} />
                <span className={styles.filterMenuButtonText}>Filter</span>
              </MenuButton>

              <MenuContent alignMenu={align.RIGHT}>
                <FilterMenuItem
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  All
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Info"
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  Info
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Warn"
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  Warn
                </FilterMenuItem>

                <FilterMenuItem
                  name="level"
                  value="Error"
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  Error
                </FilterMenuItem>
              </MenuContent>
            </Menu>
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
  clearLogExecuting: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onClearLogsPress: PropTypes.func.isRequired
};

export default LogsTable;
