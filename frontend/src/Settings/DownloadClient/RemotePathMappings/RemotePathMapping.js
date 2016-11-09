import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import titleCase from 'Utilities/String/titleCase';
import { kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import TagList from 'Components/TagList';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import EditRemotePathMappingModalConnector from './EditRemotePathMappingModalConnector';
import styles from './RemotePathMapping.css';

function getDelay(enabled, delay) {
  if (!enabled) {
    return '-';
  }

  if (!delay) {
    return 'No Delay';
  }

  if (delay === 1) {
    return '1 Minute';
  }

  // TODO: use better units of time than just minutes
  return `${delay} Minutes`;
}

class RemotePathMapping extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditRemotePathMappingModalOpen: false,
      isDeleteRemotePathMappingModalOpen: false
    };
  }

  //
  // Listeners

  @autobind
  onEditRemotePathMappingPress() {
    this.setState({ isEditRemotePathMappingModalOpen: true });
  }

  @autobind
  onEditRemotePathMappingModalClose() {
    this.setState({ isEditRemotePathMappingModalOpen: false });
  }

  @autobind
  onDeleteRemotePathMappingPress() {
    this.setState({
      isEditRemotePathMappingModalOpen: false,
      isDeleteRemotePathMappingModalOpen: true
    });
  }

  @autobind
  onDeleteRemotePathMappingModalClose() {
    this.setState({ isDeleteRemotePathMappingModalOpen: false });
  }

  @autobind
  onConfirmDeleteRemotePathMapping() {
    this.props.onConfirmDeleteRemotePathMapping(this.props.id);
  }

  //
  // Render

  render() {
    const {
      id,
      host,
      remotePath,
      localPath
    } = this.props;

    return (
      <div
        className={classNames(
          styles.remotePathMapping,
        )}
      >
        <div className={styles.host}>{host}</div>
        <div className={styles.path}>{remotePath}</div>
        <div className={styles.path}>{localPath}</div>

        <div className={styles.actions}>
          <Link
            onPress={this.onEditRemotePathMappingPress}
          >
            <Icon name="icon-sonarr-edit" />
          </Link>
        </div>

        <EditRemotePathMappingModalConnector
          id={id}
          isOpen={this.state.isEditRemotePathMappingModalOpen}
          onModalClose={this.onEditRemotePathMappingModalClose}
          onDeleteRemotePathMappingPress={this.onDeleteRemotePathMappingPress}
        />

        <ConfirmModal
          isOpen={this.state.isDeleteRemotePathMappingModalOpen}
          kind={kinds.DANGER}
          title="Delete Delay Profile"
          message="Are you sure you want to delete this delay profile?"
          confirmLabel="Delete"
          onConfirm={this.onConfirmDeleteRemotePathMapping}
          onCancel={this.onDeleteRemotePathMappingModalClose}
        />
      </div>
    );
  }
}

RemotePathMapping.propTypes = {
  id: PropTypes.number.isRequired,
  host: PropTypes.string.isRequired,
  remotePath: PropTypes.string.isRequired,
  localPath: PropTypes.string.isRequired,
  onConfirmDeleteRemotePathMapping: PropTypes.func.isRequired
};

RemotePathMapping.defaultProps = {
  // The drag preview will not connect the drag handle.
  connectDragSource: (node) => node
};

export default RemotePathMapping;
