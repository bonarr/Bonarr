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
import CutoffUnmetRow from './CutoffUnmetRow';

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

class CutoffUnmet extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      isConfirmSearchAllCutoffUnmetModalOpen: false,
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

  onSearchAllCutoffUnmetPress = () => {
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: true });
  }

  onSearchAllCutoffUnmetConfirmed = () => {
    this.props.onSearchAllCutoffUnmetPress();
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: false });
  }

  onConfirmSearchAllCutoffUnmetModalClose = () => {
    this.setState({ isConfirmSearchAllCutoffUnmetModalOpen: false });
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
      isSearchingForEpisodes,
      isSearchingForCutoffUnmetEpisodes,
      isSaving,
      onMonitorEpisodePress,
      ...otherProps
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      isConfirmSearchAllCutoffUnmetModalOpen,
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
              title="Search all cutoffUnmet"
              animate={isSearchingForCutoffUnmetEpisodes}
              onPress={this.onSearchAllCutoffUnmetPress}
            />

            <PageToolbarSeparator />
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
                          <CutoffUnmetRow
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
                  isOpen={isConfirmSearchAllCutoffUnmetModalOpen}
                  kind={kinds.DANGER}
                  title="Search for all Cutoff Unmet episodes"
                  message={
                    <div>
                      <div>
                        Are you sure you want to search for all {totalRecords} Cutoff Unmet episodes?
                      </div>
                      <div>
                        This cannot be cancelled once started without restarting Sonarr.
                      </div>
                    </div>
                  }
                  confirmLabel="Search"
                  onConfirm={this.onSearchAllCutoffUnmetConfirmed}
                  onCancel={this.onConfirmSearchAllCutoffUnmetModalClose}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

CutoffUnmet.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  totalRecords: PropTypes.number,
  isSearchingForEpisodes: PropTypes.bool.isRequired,
  isSearchingForCutoffUnmetEpisodes: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onSearchSelectedPress: PropTypes.func.isRequired,
  onUnmonitorSelectedPress: PropTypes.func.isRequired,
  onSearchAllCutoffUnmetPress: PropTypes.func.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired
};

export default CutoffUnmet;
