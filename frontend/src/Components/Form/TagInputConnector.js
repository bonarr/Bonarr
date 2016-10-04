import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import { addTag } from 'Stores/Actions/tagActions';
import TagInput from './TagInput';

function createMapStateToProps() {
  return createSelector(
    (state, { value }) => value,
    (state) => state.tags.items,
    (tags, tagList) => {
      const filteredTagList = _.filter(tagList, (tag) => _.indexOf(tags, tag.id) === -1);

      return {
        tags: tags.map((tag) => {
          const matchingTag = _.find(tagList, { id: tag });

          return {
            id: tag,
            name: matchingTag.label
          };
        }),

        tagList: filteredTagList.map(({ id, label: name }) => {
          return {
            id,
            name
          };
        })
      };
    }
  );
}

const mapDispatchToProps = {
  addTag
};

class TagInputConnector extends Component {

  //
  // Listeners

  @autobind
  onTagAdd(tag) {
    if (!tag.id) {
      this.props.addTag({
        tag: { label: tag.name },
        onTagCreated: this.onTagCreated
      });

      return;
    }

    const {
      name,
      value
    } = this.props;

    const newValue = value.slice();
    newValue.push(tag.id);

    this.props.onChange({ name, value: newValue });
  }

  @autobind
  onTagDelete(index) {
    const {
      name,
      value
    } = this.props;

    const newValue = value.slice();
    newValue.splice(index, 1);

    this.props.onChange({
      name,
      value: newValue
    });
  }

  @autobind
  onTagCreated(tag) {
    const {
      name,
      value
    } = this.props;

    const newValue = value.slice();
    newValue.push(tag.id);

    this.props.onChange({ name, value: newValue });
  }

  //
  // Render

  render() {
    return (
      <TagInput
        onTagAdd={this.onTagAdd}
        onTagDelete={this.onTagDelete}
        {...this.props}
      />
    );
  }
}

TagInputConnector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(TagInputConnector);
