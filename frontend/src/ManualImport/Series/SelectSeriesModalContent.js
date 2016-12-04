import React, { Component, PropTypes } from 'react';
import { scrollDirections } from 'Helpers/Props';
import Button from 'Components/Button';
import Scroller from 'Components/Scroller';
import TextInput from 'Components/Form/TextInput';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import SelectSeriesRow from './SelectSeriesRow';
import styles from './SelectSeriesModalContent.css';

class SelectSeriesModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: ''
    };
  }

  //
  // Listeners

  onFilterChange = ({ value }) => {
    this.setState({ filter: value.toLowerCase() });
  }

  //
  // Render

  render() {
    const {
      items,
      onSeriesSelect,
      onModalClose
    } = this.props;

    const filter = this.state.filter;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - Select Series
        </ModalHeader>

        <ModalBody
          className={styles.modalBody}
          scrollDirection={scrollDirections.NONE}
        >
          <TextInput
            className={styles.filterInput}
            placeholder="Filter series"
            name="filter"
            value={filter}
            onChange={this.onFilterChange}
          />

          <Scroller className={styles.scroller}>
            {
              items.map((item) => {
                return item.title.toLowerCase().includes(filter) ?
                (
                  <SelectSeriesRow
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    onSeriesSelect={onSeriesSelect}
                  />
                ) :
                null;
              })
            }
          </Scroller>

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

SelectSeriesModalContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSeriesSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectSeriesModalContent;
