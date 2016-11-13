import React, { Component, PropTypes } from 'react';
import FieldSet from 'Components/FieldSet';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import PageSectionContent from 'Components/Page/PageSectionContent';
import RemotePathMapping from './RemotePathMapping';
import EditRemotePathMappingModalConnector from './EditRemotePathMappingModalConnector';
import styles from './RemotePathMappings.css';

class RemotePathMappings extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddRemotePathMappingModalOpen: false,
      width: 0
    };
  }

  //
  // Listeners

  onAddRemotePathMappingPress = () => {
    this.setState({ isAddRemotePathMappingModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isAddRemotePathMappingModalOpen: false });
  }

  onMeasure = ({ width }) => {
    this.setState({ width });
  }

  //
  // Render

  render() {
    const {
      items,
      onConfirmDeleteRemotePathMapping,
      ...otherProps
    } = this.props;

    return (
      <FieldSet
        legend="Remote Path Mappings"
      >
        <PageSectionContent
          errorMessage="Unable to load Remote Path Mappings"
          {...otherProps}
        >
          <div className={styles.remotePathMappingsHeader}>
            <div className={styles.host}>Host</div>
            <div className={styles.path}>Remote Path</div>
            <div className={styles.path}>Local Path</div>
          </div>

          <div>
            {
              items.map((item, index) => {
                return (
                  <RemotePathMapping
                    key={item.id}
                    {...item}
                    {...otherProps}
                    index={index}
                    onConfirmDeleteRemotePathMapping={onConfirmDeleteRemotePathMapping}
                  />
                );
              })
            }
          </div>

          <div className={styles.addRemotePathMapping}>
            <Link
              className={styles.addButton}
              onPress={this.onAddRemotePathMappingPress}
            >
              <Icon name="icon-sonarr-add" />
            </Link>
          </div>

          <EditRemotePathMappingModalConnector
            isOpen={this.state.isAddRemotePathMappingModalOpen}
            onModalClose={this.onModalClose}
          />
        </PageSectionContent>
      </FieldSet>
    );
  }
}

RemotePathMappings.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteRemotePathMapping: PropTypes.func.isRequired
};

export default RemotePathMappings;
