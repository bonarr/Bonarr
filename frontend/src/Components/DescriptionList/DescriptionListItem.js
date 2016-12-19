import React, { Component, PropTypes } from 'react';
import DescriptionListItemTitle from './DescriptionListItemTitle';
import DescriptionListItemDescription from './DescriptionListItemDescription';

class DescriptionListItem extends Component {

  //
  // Render

  render() {
    const {
      title,
      data
    } = this.props;

    return (
      <span>
        <DescriptionListItemTitle>{title}</DescriptionListItemTitle>
        <DescriptionListItemDescription>{data}</DescriptionListItemDescription>
      </span>
    );
  }
}

DescriptionListItem.propTypes = {
  title: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
};

export default DescriptionListItem;
