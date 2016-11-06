import React, { Component, PropTypes } from 'react';
import { kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Button from 'Components/Button';
import FieldSet from 'Components/FieldSet';
import LoadingIndicator from 'Components/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import AddIndexerItem from './AddIndexerItem';
import styles from './AddIndexerModalContent.css';

class AddIndexerModalContent extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      error,
      populated,
      usenetIndexers,
      torrentIndexers,
      onIndexerSelect,
      onModalClose
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Add Indexer
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to add a new indexer, please try again.</div>
          }

          {
            !fetching && !error &&
              <div>

                <Alert kind={kinds.INFO}>
                  <div>Sonarr supports any indexer that uses the Newznab standard, as well as other indexers listed below.</div>
                  <div>For more information on the individual indexers, clink on the info buttons.</div>
                </Alert>

                <FieldSet legend="Usenet">
                  <div className={styles.indexers}>
                    {
                      usenetIndexers.map((indexer) => {
                        return (
                          <AddIndexerItem
                            key={indexer.name}
                            indexer={indexer}
                            {...indexer}
                            onIndexerSelect={onIndexerSelect}
                          />
                        );
                      })
                    }
                  </div>
                </FieldSet>

                <FieldSet legend="Torrents">
                  <div className={styles.indexers}>
                    {
                      torrentIndexers.map((indexer) => {
                        return (
                          <AddIndexerItem
                            key={indexer.name}
                            indexer={indexer}
                            {...indexer}
                            onIndexerSelect={onIndexerSelect}
                          />
                        );
                      })
                    }
                  </div>
                </FieldSet>
              </div>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

AddIndexerModalContent.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  populated: PropTypes.bool.isRequired,
  usenetIndexers: PropTypes.arrayOf(PropTypes.object).isRequired,
  torrentIndexers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIndexerSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AddIndexerModalContent;
