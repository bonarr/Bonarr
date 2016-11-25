import React, { Component, PropTypes } from 'react';
import scrollDirections from 'Utilities/scrollDirections';
import Icon from 'Components/Icon';
import Button from 'Components/Button';
import Scroller from 'Components/Scroller';
import Modal from 'Components/Modal/Modal';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import styles from './LogsTableRow.css';

class LogsTableRow extends Component {

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

  onClick = () => {
    this.setState({ isDetailsModalOpen: true });
  }

  onModalClose = () => {
    this.setState({ isDetailsModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      level,
      logger,
      message,
      time,
      exception
    } = this.props;

    return (
      <TableRow
        className={styles.row}
        onClick={this.onClick}
      >
        <TableRowCell
          className={styles.level}
        >
          <Icon
            name={`icon-sonarr-log-${level.toLowerCase()}`}
            title={level}
          />
        </TableRowCell>

        <TableRowCell>{logger}</TableRowCell>
        <TableRowCell>{message}</TableRowCell>

        <RelativeDateCellConnector
          date={time}
        />

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
              <div>Message</div>

              <Scroller
                className={styles.detailsText}
                scrollDirection={scrollDirections.HORIZONTAL}
              >
                {message}
              </Scroller>

              {
                !!exception &&
                  <div>
                    <div>Exception</div>
                    <Scroller
                      className={styles.detailsText}
                      scrollDirection={scrollDirections.HORIZONTAL}
                    >
                      {exception}
                    </Scroller>
                  </div>
              }
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
      </TableRow>
    );
  }

}

LogsTableRow.propTypes = {
  level: PropTypes.string.isRequired,
  logger: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  exception: PropTypes.string
};

export default LogsTableRow;
