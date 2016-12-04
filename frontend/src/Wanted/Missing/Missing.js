import React, { Component, PropTypes } from 'react';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, kinds } from 'Helpers/Props';
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
import MenuContent from 'Components/Menu/MenuContent';
import FilterMenuItem from 'Components/Menu/FilterMenuItem';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import ManualImportModal from 'ManualImport/ManualImportModal';
import MissingRow from './MissingRow';

const headers = [
  {
    name: 'series.sortTitle',
    label: 'Series Title',
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
    name: 'airDateUtc',
    label: 'Air Date',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    sortable: true
  }
];

class Missing extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      isConfirmSearchAllMissingModalOpen: false,
      isManualImportModalOpen: false
    };
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onFilterMenuItemPress = (filterKey, filterValue) => {
    this.props.onFilterSelect(filterKey, filterValue);
  }

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, id, value, shiftKey);
    });
  }

  onSearchSelectedPress = () => {
    const selected = this.getSelectedIds();

    this.props.onSearchSelectedPress(selected);
  }

  onUnmonitorSelectedPress = () => {
    const selected = this.getSelectedIds();

    this.props.onUnmonitorSelectedPress(selected);
  }

  onSearchAllMissingPress = () => {
    this.setState({ isConfirmSearchAllMissingModalOpen: true });
  }

  onSearchAllMissingConfirmed = () => {
    this.props.onSearchAllMissingPress();
    this.setState({ isConfirmSearchAllMissingModalOpen: false });
  }

  onConfirmSearchAllMissingModalClose = () => {
    this.setState({ isConfirmSearchAllMissingModalOpen: false });
  }

  onManualImportPress = () => {
    this.setState({ isManualImportModalOpen: true });
  }

  onManualImportModalClose = () => {
    this.setState({ isManualImportModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      fetching,
      items,
      totalRecords,
      isScanningDroneFactory,
      isSearchingForEpisodes,
      isSearchingForMissingEpisodes,
      isSaving,
      onRescanDroneFactoryPress,
      onMonitorEpisodePress,
      ...otherProps
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      isConfirmSearchAllMissingModalOpen,
      isManualImportModalOpen
    } = this.state;

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              iconName="icon-sonarr-search"
              title="Search selected"
              animate={isSearchingForEpisodes}
              onPress={this.onSearchSelectedPress}
            />

            <PageToolbarButton
              iconName="icon-sonarr-monitored"
              title="Unmonitor selected"
              animate={isSaving}
              onPress={this.onUnmonitorSelectedPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              iconName="icon-sonarr-search"
              title="Search all missing"
              animate={isSearchingForMissingEpisodes}
              onPress={this.onSearchAllMissingPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              iconName="icon-sonarr-refresh"
              title="Rescan Drone Factory folder"
              animate={isScanningDroneFactory}
              onPress={onRescanDroneFactoryPress}
            />

            <PageToolbarButton
              iconName="icon-sonarr-import-manual"
              title="Manual Import"
              onPress={this.onManualImportPress}
            />

          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <FilterMenu>
              <MenuContent alignMenu={align.RIGHT}>
                <FilterMenuItem
                  name="monitored"
                  value={true}
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  Monitored
                </FilterMenuItem>

                <FilterMenuItem
                  name="monitored"
                  value={false}
                  {...otherProps}
                  onPress={this.onFilterMenuItemPress}
                >
                  Unmonitored
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
                  selectAll={true}
                  allSelected={allSelected}
                  allUnselected={allUnselected}
                  {...otherProps}
                  onSelectAllChange={this.onSelectAllChange}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <MissingRow
                            key={item.id}
                            isSelected={selectedState[item.id]}
                            {...item}
                            onSelectedChange={this.onSelectedChange}
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

                <ConfirmModal
                  isOpen={isConfirmSearchAllMissingModalOpen}
                  kind={kinds.DANGER}
                  title="Search for all missing episodes"
                  message={
                    <div>
                      <div>
                        Are you sure you want to search for all {totalRecords} missing episodes?
                      </div>
                      <div>
                        This cannot be cancelled once started without restarting Sonarr.
                      </div>
                    </div>
                  }
                  confirmLabel="Search"
                  onConfirm={this.onSearchAllMissingConfirmed}
                  onCancel={this.onConfirmSearchAllMissingModalClose}
                />

                <ManualImportModal
                  isOpen={isManualImportModalOpen}
                  onModalClose={this.onManualImportModalClose}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

Missing.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  totalRecords: PropTypes.number,
  isScanningDroneFactory: PropTypes.bool.isRequired,
  isSearchingForEpisodes: PropTypes.bool.isRequired,
  isSearchingForMissingEpisodes: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onSearchSelectedPress: PropTypes.func.isRequired,
  onUnmonitorSelectedPress: PropTypes.func.isRequired,
  onSearchAllMissingPress: PropTypes.func.isRequired,
  onRescanDroneFactoryPress: PropTypes.func.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired
};

export default Missing;
