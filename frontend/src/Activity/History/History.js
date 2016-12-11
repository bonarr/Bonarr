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
import FilterMenu from 'Components/Menu/FilterMenu';
import MenuContent from 'Components/Menu/MenuContent';
import FilterMenuItem from 'Components/Menu/FilterMenuItem';
import HistoryRowConnector from './HistoryRowConnector';
import styles from './History.css';

const headers = [
  {
    name: 'eventType',
    label: ''
  },
  {
    name: 'series.sortTitle',
    label: 'Series',
    sortable: true
  },
  {
    name: 'episode',
    label: 'Episode'
  },
  {
    name: 'episodeTitle',
    label: 'Episode Title'
  },
  {
    name: 'quality',
    label: 'Quality'
  },
  {
    name: 'date',
    label: 'Air Date',
    sortable: true
  },
  {
    name: 'details',
    label: ''
  }
];

class History extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      populated,
      error,
      items,
      filterKey,
      filterValue,
      totalRecords,
      episodesFetching,
      episodesPopulated,
      episodesError,
      onFilterSelect,
      onMonitorEpisodePress,
      ...otherProps
    } = this.props;

    const isFetching = fetching || episodesFetching;
    const isPopulated = populated && episodesPopulated;
    const hasError = error || episodesError;

    return (
      <PageContent>
        <PageToolbar className={styles.toolbar}>
          <PageToolbarSection alignContent={align.RIGHT}>
            <FilterMenu>
              <MenuContent alignMenu={align.RIGHT}>
                <FilterMenuItem
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  All
                </FilterMenuItem>

                <FilterMenuItem
                  name="eventType"
                  value="1"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Grabbed
                </FilterMenuItem>

                <FilterMenuItem
                  name="eventType"
                  value="3"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Imported
                </FilterMenuItem>

                <FilterMenuItem
                  name="eventType"
                  value="4"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Failed
                </FilterMenuItem>

                <FilterMenuItem
                  name="eventType"
                  value="5"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Deleted
                </FilterMenuItem>
              </MenuContent>
            </FilterMenu>
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            isFetching &&
              <LoadingIndicator />
          }

          {
            hasError &&
              <div>Unable to load history</div>
          }

          {
            !isFetching && isPopulated && !hasError &&
              <div>
                <Table
                  headers={headers}
                  {...otherProps}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <HistoryRowConnector
                            key={item.id}
                            {...item}
                            onMonitorEpisodePress={onMonitorEpisodePress}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>

                <TablePager
                  totalRecords={totalRecords}
                  {...otherProps}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

History.propTypes = {
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.array.isRequired,
  filterKey: PropTypes.string,
  filterValue: PropTypes.string,
  totalRecords: PropTypes.number,
  episodesFetching: PropTypes.bool.isRequired,
  episodesPopulated: PropTypes.bool.isRequired,
  episodesError: PropTypes.object,
  onFilterSelect: PropTypes.func.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired
};

export default History;
