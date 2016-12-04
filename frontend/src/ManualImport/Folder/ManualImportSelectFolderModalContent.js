import React, { Component, PropTypes } from 'react';
import { kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import PathInputConnector from 'Components/Form/PathInputConnector';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import RecentFolderRow from './RecentFolderRow';
import styles from './ManualImportSelectFolderModalContent.css';

const recentFoldersHeaders = [
  {
    name: 'folder',
    label: 'Folder'
  },
  {
    name: 'lastUsed',
    label: 'Last Used'
  }
];

class ManualImportSelectFolderModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      folder: ''
    };
  }

  //
  // Listeners

  onPathChange = ({ value }) => {
    this.setState({ folder: value });
  }

  onRecentPathPress = (folder) => {
    this.setState({ folder });
  }

  onQuickImportPress = () => {
    this.props.onQuickImportPress(this.state.folder);
  }

  onInteractiveImportPress = () => {
    this.props.onInteractiveImportPress(this.state.folder);
  }

  //
  // Render

  render() {
    const {
      recentFolders,
      onModalClose
    } = this.props;

    const folder = this.state.folder;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - Select Folder
        </ModalHeader>

        <ModalBody>
          <PathInputConnector
            name="folder"
            value={folder}
            onChange={this.onPathChange}
          />

          {
            !!recentFolders.length &&
              <div className={styles.recentFoldersContainer}>
                <Table
                  headers={recentFoldersHeaders}
                >
                  <TableBody>
                    {
                      recentFolders.map((recentFolder) => {
                        return (
                          <RecentFolderRow
                            key={recentFolder.folder}
                            folder={recentFolder.folder}
                            lastUsed={recentFolder.lastUsed}
                            onPress={this.onRecentPathPress}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </div>
          }

          <div className={styles.buttonsContainer}>
            <div className={styles.buttonContainer}>
              <Button
                className={styles.button}
                kind={kinds.PRIMARY}
                size={sizes.LARGE}
                isDisabled={!folder}
                onPress={this.onQuickImportPress}
              >
                <Icon
                  className={styles.buttonIcon}
                  name="icon-sonarr-import-quick"
                />

                Quick Import
              </Button>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                className={styles.button}
                kind={kinds.PRIMARY}
                size={sizes.LARGE}
                isDisabled={!folder}
                onPress={this.onInteractiveImportPress}
              >
                <Icon
                  className={styles.buttonIcon}
                  name="icon-sonarr-import-interactive"
                />

                Interactive Import
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

ManualImportSelectFolderModalContent.propTypes = {
  recentFolders: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQuickImportPress: PropTypes.func.isRequired,
  onInteractiveImportPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ManualImportSelectFolderModalContent;
