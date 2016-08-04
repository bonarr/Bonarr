import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import LoadingIndicator from 'Components/LoadingIndicator';
import Icon from 'Components/Icon';
import Table from 'Components/Table/Table';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/PageToolbar';
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
      ...otherProps
    } = this.props;

    return (
      <PageContent>
        <PageToolbar>
          <LogsNavMenu current="Logs" />
          <Menu>
            <MenuButton>
              <Icon name="icon-sonarr-filter" />
              <span className={styles.filterMenuButtonText}>Filter</span>
            </MenuButton>

            <MenuContent>
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
  onFilterSelect: PropTypes.func.isRequired
};

export default LogsTable;
