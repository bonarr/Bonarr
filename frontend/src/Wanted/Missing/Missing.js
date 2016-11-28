import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
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
      isConfirmSearchAllMissingModalOpen: false
    };
  }

  //
  // Control

  getSelectedIds = () => {
    const selectedState = this.state.selectedState;

    return _.reduce(selectedState, (result, value, id) => {
      if (value) {
        result.push(parseInt(id));
      }

      return result;
    }, []);
  }

  //
  // Listeners

  onFilterMenuItemPress = (filterKey, filterValue) => {
    this.props.onFilterSelect(filterKey, filterValue);
  }

  onSelectAllChange = ({ value }) => {
    const selectedState = _.reduce(Object.keys(this.state.selectedState), (result, item) => {
      result[item] = value;
      return result;
    }, {});

    this.setState({
      allSelected: value,
      allUnselected: !value,
      lastToggled: null,
      selectedState
    });
  }

  onSelectedChange = ({ id, value, shiftKey }) => {
    this.setState((state) => {
      let allSelected = true;
      let allUnselected = true;

      const lastToggled = state.lastToggled;
      const selectedState = {
        ...state.selectedState,
        [id]: value
      };

      if (shiftKey && state.lastToggled) {
        const items = this.props.items;

        const lastToggledIndex = _.findIndex(items, { id: lastToggled });
        const changedIndex = _.findIndex(items, { id });
        let lower = 0;
        let upper = 0;

        if (lastToggledIndex > changedIndex) {
          lower = changedIndex;
          upper = lastToggledIndex + 1;
        } else {
          lower = lastToggledIndex;
          upper = changedIndex;
        }

        for (let i = lower; i < upper; i++) {
          selectedState[items[i].id] = value;
        }
      }

      Object.keys(selectedState).forEach((key) => {
        if (selectedState[key]) {
          allUnselected = false;
        } else {
          allSelected = false;
        }
      });

      return {
        allSelected,
        allUnselected,
        lastToggled: id,
        selectedState
      };
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

  onConfirmSearchAllMissingClose = () => {
    this.setState({ isConfirmSearchAllMissingModalOpen: false });
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
      onManualImportPress,
      onMonitorEpisodePress,
      ...otherProps
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      isConfirmSearchAllMissingModalOpen
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
              onPress={onManualImportPress}
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
                  message={`Are you sure you want to search for all ${totalRecords} missing episodes? One API request to each indexer will be used for each epiosde. This cannot be stopped once started, without restarting down Sonarr.`}
                  confirmLabel="Search"
                  onConfirm={this.onSearchAllMissingConfirmed}
                  onCancel={this.onConfirmSearchAllMissingClose}
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
  onManualImportPress: PropTypes.func.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired
};

export default Missing;
