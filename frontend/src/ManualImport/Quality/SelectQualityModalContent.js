import React, { Component, PropTypes } from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import Button from 'Components/Button';
import LoadingIndicator from 'Components/LoadingIndicator';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';

class SelectQualityModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    const {
      qualityId,
      proper,
      real
    } = props;

    this.state = {
      qualityId,
      proper,
      real
    };
  }

  //
  // Listeners

  onQualityChange = ({ value }) => {
    this.setState({ qualityId: parseInt(value) });
  }

  onProperChange = ({ value }) => {
    this.setState({ proper: value });
  }

  onRealChange = ({ value }) => {
    this.setState({ real: value });
  }

  onQualitySelect = () => {
    this.props.onQualitySelect(this.state);
  }

  //
  // Render

  render() {
    const {
      fetching,
      populated,
      error,
      items,
      onModalClose
    } = this.props;

    const {
      qualityId,
      proper,
      real
    } = this.state;

    const qualityOptions = items.map(({ quality }) => {
      return {
        [quality.id]: quality.name
      };
    });

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - Select Quality
        </ModalHeader>

        <ModalBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching && !!error &&
              <div>Unable to load qualities</div>
          }

          {
            populated && !error &&
              <Form>
                <FormGroup>
                  <FormLabel>Quality</FormLabel>

                  <FormInputGroup
                    type={inputTypes.SELECT}
                    name="quality"
                    value={qualityId}
                    values={qualityOptions}
                    onChange={this.onQualityChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Proper</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="proper"
                    value={proper}
                    onChange={this.onProperChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Real</FormLabel>

                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="real"
                    value={real}
                    onChange={this.onRealChange}
                  />
                </FormGroup>
              </Form>
          }
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            Cancel
          </Button>

          <Button
            kind={kinds.SUCCESS}
            onPress={this.onQualitySelect}
          >
            Select Quality
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SelectQualityModalContent.propTypes = {
  qualityId: PropTypes.number.isRequired,
  proper: PropTypes.bool.isRequired,
  real: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQualitySelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectQualityModalContent;
