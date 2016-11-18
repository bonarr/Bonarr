import React, { Component, PropTypes } from 'react';
import Button from 'Components/Button';
import Link from 'Components/Link.js';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './EpisodeTitleLink.css';

class EpisodeTitleLink extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isDetailsModalOpen: false
    };
  }

  //
  // Listeners

  onLinkPress = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      title
    } = this.props;

    return (
      <div>
        <Link
          className={styles.link}
          onPress={this.onLinkPress}
        >
          {title}
        </Link>

        <Modal
          isOpen={this.state.isDetailsModalOpen}
          onModalClose={this.onModalClose}
        >
          <ModalContent
            onModalClose={this.onModalClose}
          >
            <ModalHeader>
              Details
            </ModalHeader>

            <ModalBody>
              details go here
            </ModalBody>

            <ModalFooter>
              <Button
                onPress={this.onModalClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

EpisodeTitleLink.propTypes = {
  // id: PropTypes.number.isRequired,
  // seriesId: PropTypes.number.isRequired,
  // seasonNumber: PropTypes.number.isRequired,
  // episodeNumber: PropTypes.number.isRequired,
  // absoluteEpisodeNumber: PropTypes.number.isRequired,
  // airDate: PropTypes.string.isRequired,
  // airDateUtc: PropTypes.string.isRequired,
  // summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // monitored: PropTypes.bool.isRequired,
  // showSeriesButton: PropTypes.bool.isRequired
};

EpisodeTitleLink.defaultProps = {
  showSeriesButton: false
};

export default EpisodeTitleLink;
