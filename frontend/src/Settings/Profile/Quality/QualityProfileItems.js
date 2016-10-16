import React, { Component, PropTypes } from 'react';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import QualityProfileItemDragSource from './QualityProfileItemDragSource';
import QualityProfileItemDragPreview from './QualityProfileItemDragPreview';
import styles from './QualityProfileItems.css';

class QualityProfileItems extends Component {

  //
  // Render

  render() {
    const {
      dragIndex,
      dropIndex,
      qualityProfileItems,
      ...otherProps
    } = this.props;

    const isDragging = dropIndex !== null;
    const isDraggingUp = isDragging && dropIndex > dragIndex;
    const isDraggingDown = isDragging && dropIndex < dragIndex;

    return (
      <FormGroup>
        <FormLabel>Qualities</FormLabel>
        <div>
          <FormInputHelpText
            text="Qualities higher in the list are more preferred. Only checked qualities are wanted"
          />

          <div className={styles.qualities}>
            {
              qualityProfileItems.map(({ allowed, quality }, index) => {
                return (
                  <QualityProfileItemDragSource
                    key={quality.id}
                    qualityId={quality.id}
                    name={quality.name}
                    allowed={allowed}
                    sortIndex={index}
                    isDragging={isDragging}
                    isDraggingUp={isDraggingUp}
                    isDraggingDown={isDraggingDown}
                    {...otherProps}
                  />
                );
              }).reverse()
            }

            <QualityProfileItemDragPreview />
          </div>
        </div>
      </FormGroup>
    );
  }
}

QualityProfileItems.propTypes = {
  dragIndex: PropTypes.number,
  dropIndex: PropTypes.number,
  qualityProfileItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default QualityProfileItems;
