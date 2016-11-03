import React, { Component, PropTypes } from 'react';
import FieldSet from 'Components/FieldSet';
import Card from 'Components/Card';
import Icon from 'Components/Icon';
import PageSectionContent from 'Components/Page/PageSectionContent';
import Indexer from './Indexer';
// import EditIndexerModalConnector from './EditIndexerModalConnector';
import styles from './Indexers.css';

class Indexers extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isIndexerModalOpen: false
    };
  }

  //
  // Listeners

  onEditIndexerPress = () => {
    this.setState({ isIndexerModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isIndexerModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      items,
      onConfirmDeleteIndexer,
      ...otherProps
    } = this.props;

    return (
      <FieldSet
        legend="Indexers"
      >
        <PageSectionContent
          errorMessage="Unable to load Indexers"
          {...otherProps}
        >
          <div className={styles.indexers}>
            <Card
              className={styles.addIndexer}
              onPress={this.onEditIndexerPress}
            >
              <div className={styles.center}>
                <Icon name="icon-sonarr-add" />
              </div>
            </Card>

            {
              items.map((item) => {
                return (
                  <Indexer
                    key={item.id}
                    {...item}
                    onConfirmDeleteIndexer={onConfirmDeleteIndexer}
                  />
                );
              })
            }
          </div>

          {/* <EditIndexerModalConnector
            isOpen={this.state.isIndexerModalOpen}
            onModalClose={this.onModalClose}
          /> */}
        </PageSectionContent>
      </FieldSet>
    );
  }
}

Indexers.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDeleteIndexer: PropTypes.func.isRequired
};

export default Indexers;
