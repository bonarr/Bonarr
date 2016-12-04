import React, { Component, PropTypes } from 'react';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { kinds } from 'Helpers/Props';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/LoadingIndicator';
import SelectInput from 'Components/Form/SelectInput';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import InteractiveImportRow from './InteractiveImportRow';
import styles from './InteractiveImportModalContent.css';

const headers = [
  {
    name: 'relativePath',
    label: 'Relative Path',
    sortable: true
  },
  {
    name: 'series',
    label: 'Series',
    sortable: true
  },
  {
    name: 'season',
    label: 'Season'
  },
  {
    name: 'episodes',
    label: 'Episode(s)'
  },
  {
    name: 'quality',
    label: 'Quality',
    sortable: true
  },
  {
    name: 'size',
    label: 'Size'
  },
  {
    name: 'rejections',
    label: React.createElement(Icon, { name: 'icon-sonarr-form-danger' })
  }
];

class InteractiveImportModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      importMode: props.importMode
    };
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, id, value, shiftKey);
    });
  }

  onImportSelectedPress = () => {
    const selected = this.getSelectedIds();

    this.props.onImportSelectedPress(selected, this.state.importMode);
  }

  onImportModeChange = ({ value }) => {
    this.setState({ importMode: value });
  }

  //
  // Render

  render() {
    const {
      title,
      folder,
      fetching,
      populated,
      error,
      items,
      sortKey,
      sortDirection,
      manualImportErrorMessage,
      onSortPress,
      onModalClose
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      importMode
    } = this.state;

    const errorMessage = error && error.message || 'Unable to load manual import items';

    const importModeOptions = [
      { Move: 'Move Files' },
      { Copy: 'Copy Files' }
    ];

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - {title || folder}
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            error &&
              <div>{errorMessage}</div>
          }

          {
            populated && !!items.length &&
              <Table
                headers={headers}
                selectAll={true}
                allSelected={allSelected}
                allUnselected={allUnselected}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSortPress={onSortPress}
                onSelectAllChange={this.onSelectAllChange}
              >
                <TableBody>
                  {
                    items.map((item) => {
                      return (
                        <InteractiveImportRow
                          key={item.id}
                          isSelected={selectedState[item.id]}
                          {...item}
                          onSelectedChange={this.onSelectedChange}
                        />
                      );
                    })
                  }
                </TableBody>
              </Table>
          }

          {
            populated && !items.length &&
              'No video files were found in the selected folder'
          }
        </ModalBody>

        <ModalFooter>
          <SelectInput
            className={styles.importMode}
            name="importMode"
            value={importMode}
            values={importModeOptions}
            onChange={this.onImportModeChange}
          />

          {
            manualImportErrorMessage &&
              <span className={styles.errorMessage}>{manualImportErrorMessage}</span>
          }

          <Button onPress={onModalClose}>
            Cancel
          </Button>

          <Button
            kind={kinds.SUCCESS}
            isDisabled={!this.getSelectedIds().length}
            onPress={this.onImportSelectedPress}
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

InteractiveImportModalContent.propTypes = {
  downloadId: PropTypes.string,
  importMode: PropTypes.string,
  title: PropTypes.string,
  folder: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  manualImportErrorMessage: PropTypes.string,
  onSortPress: PropTypes.func.isRequired,
  onImportSelectedPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

InteractiveImportModalContent.defaultProps = {
  importMode: 'Move'
};

export default InteractiveImportModalContent;
