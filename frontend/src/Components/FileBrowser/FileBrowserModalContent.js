import React, { Component, PropTypes } from 'react';
import scrollDirections from 'Utilities/scrollDirections';
import Button from 'Components/Button';
import Scroller from 'Components/Scroller';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import PathInput from 'Components/Form/PathInput';
import FileBrowserRow from './FileBrowserRow';
import styles from './FileBrowserModalContent.css';

const headers = [
  {
    name: 'type',
    label: 'Type'
  },
  {
    name: 'name',
    label: 'Name'
  }
];

class FileBrowserModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isFileBrowserModalOpen: false,
      currentPath: ''
    };
  }

  componentWillMount() {
    // Store the value prop so we can update the path only when the user pressses OK.
    this.setState({ currentPath: this.props.value });
  }

  //
  // Listeners

  onPathInputChange = ({ value }) => {
    this.setState({ currentPath: value });
  }

  onRowClick = (path) => {
    this.setState({ currentPath: path });
    this.props.onFetchPaths(path);
  }

  onOkPress = () => {
    this.props.onChange({
      name: this.props.name,
      value: this.state.currentPath
    });

    this.props.onClearPaths();
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    const {
      parent,
      directories,
      files,
      onModalClose,
      ...otherProps
    } = this.props;

    const emptyParent = parent === '';

    return (
      <ModalContent
        onModalClose={onModalClose}
      >
        <ModalHeader>
          File Name Tokens
        </ModalHeader>

        <ModalBody
          className={styles.modalBody}
          scrollDirection={scrollDirections.NONE}
        >
          <PathInput
            className={styles.pathInput}
            placeholder="Start typing or select a path below"
            hasFileBrowser={false}
            {...otherProps}
            value={this.state.currentPath}
            onChange={this.onPathInputChange}
          />

          <Scroller className={styles.scroller}>
            <Table headers={headers}>
              <TableBody>
                {
                  emptyParent &&
                    <FileBrowserRow
                      type="computer"
                      name="My Computer"
                      path={parent}
                      onClick={this.onRowClick}
                    />
                }

                {
                  !emptyParent && parent &&
                    <FileBrowserRow
                      type="parent"
                      name="..."
                      path={parent}
                      onClick={this.onRowClick}
                    />
                }

                {
                  directories.map((directory) => {
                    return (
                      <FileBrowserRow
                        key={directory.path}
                        type={directory.type}
                        name={directory.name}
                        path={directory.path}
                        onClick={this.onRowClick}
                      />
                    );
                  })
                }

                {
                  files.map((file) => {
                    return (
                      <FileBrowserRow
                        key={file.path}
                        type={file.type}
                        name={file.name}
                        path={file.path}
                        onClick={this.onRowClick}
                      />
                    );
                  })
                }
              </TableBody>
            </Table>
          </Scroller>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={onModalClose}
          >
            Cancel
          </Button>

          <Button
            onPress={this.onOkPress}
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

FileBrowserModalContent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  parent: PropTypes.string,
  currentPath: PropTypes.string.isRequired,
  directories: PropTypes.arrayOf(PropTypes.object).isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFetchPaths: PropTypes.func.isRequired,
  onClearPaths: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default FileBrowserModalContent;
