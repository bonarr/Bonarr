import React, { Component, PropTypes } from 'react';
import { align, sortDirections } from 'Helpers/Props';
import LoadingIndicator from 'Components/LoadingIndicator';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import FilterMenu from 'Components/Menu/FilterMenu';
import SortMenu from 'Components/Menu/SortMenu';
import ViewMenu from 'Components/Menu/ViewMenu';
import MenuContent from 'Components/Menu/MenuContent';
import FilterMenuItem from 'Components/Menu/FilterMenuItem';
import SortMenuItem from 'Components/Menu/SortMenuItem';
import ViewMenuItem from 'Components/Menu/ViewMenuItem';
import SeriesIndexTableConnector from './Table/SeriesIndexTableConnector';
import SeriesIndexPostersConnector from './Posters/SeriesIndexPostersConnector';
import SeriesIndexFooter from './SeriesIndexFooter';
import styles from './SeriesIndex.css';

function getViewComponent(view) {
  if (view === 'posters') {
    return SeriesIndexPostersConnector;
  }

  return SeriesIndexTableConnector;
}

class SeriesIndex extends Component {

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
      sortKey,
      sortDirection,
      view,
      isRefreshingSeries,
      isRssSyncExecuting,
      onSortSelect,
      onFilterSelect,
      onViewSelect,
      onRefreshSeriesPress,
      onRssSyncPress
    } = this.props;

    const ViewComponent = getViewComponent(view);

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              iconName="icon-sonarr-refresh"
              title="Update all series"
              animate={isRefreshingSeries}
              onPress={onRefreshSeriesPress}
            />

            <PageToolbarButton
              iconName="icon-sonarr-rss"
              title="Start RSS Sync"
              animate={isRssSyncExecuting}
              onPress={onRssSyncPress}
            />

          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <ViewMenu className={styles.viewMenu}>
              <MenuContent alignMenu={align.RIGHT}>
                <ViewMenuItem
                  name="table"
                  view={view}
                  onPress={onViewSelect}
                >
                  Table
                </ViewMenuItem>

                <ViewMenuItem
                  name="posters"
                  view={view}
                  onPress={onViewSelect}
                >
                  Posters
                </ViewMenuItem>
              </MenuContent>
            </ViewMenu>

            <SortMenu className={styles.sortMenu}>
              <MenuContent alignMenu={align.RIGHT}>
                <SortMenuItem
                  name="sortTitle"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Title
                </SortMenuItem>

                <SortMenuItem
                  name="network"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Network
                </SortMenuItem>

                <SortMenuItem
                  name="qualityProfileId"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Profile
                </SortMenuItem>

                <SortMenuItem
                  name="nextAiring"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Next Airing
                </SortMenuItem>

                <SortMenuItem
                  name="seasonCount"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Seasons
                </SortMenuItem>

                <SortMenuItem
                  name="episodeProgress"
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onPress={onSortSelect}
                >
                  Episodes
                </SortMenuItem>
              </MenuContent>
            </SortMenu>

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
                  name="monitored"
                  value={true}
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Monitored Only
                </FilterMenuItem>

                <FilterMenuItem
                  name="status"
                  value="continuing"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Continuing Only
                </FilterMenuItem>

                <FilterMenuItem
                  name="status"
                  value="ended"
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Ended Only
                </FilterMenuItem>

                <FilterMenuItem
                  name="missing"
                  value={true}
                  filterKey={filterKey}
                  filterValue={filterValue}
                  onPress={onFilterSelect}
                >
                  Missing Episodes
                </FilterMenuItem>
              </MenuContent>
            </FilterMenu>
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            fetching && !populated &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to load the calendar</div>
          }

          {
            !error && populated && !!items.length &&
              <div>
                <ViewComponent />

                <SeriesIndexFooter
                  series={items}
                />
              </div>
          }

          {
            !error && populated && !items.length &&
              <div>
                No series found, import existing series or add a new series
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

SeriesIndex.propTypes = {
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterKey: PropTypes.string,
  filterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  view: PropTypes.string.isRequired,
  isRefreshingSeries: PropTypes.bool.isRequired,
  isRssSyncExecuting: PropTypes.bool.isRequired,
  onSortSelect: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onViewSelect: PropTypes.func.isRequired,
  onRefreshSeriesPress: PropTypes.func.isRequired,
  onRssSyncPress: PropTypes.func.isRequired
};

export default SeriesIndex;
