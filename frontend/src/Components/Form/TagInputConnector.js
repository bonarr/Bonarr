import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { addTag } from 'Stores/Actions/tagActions';
import TagInput from './TagInput';

const validTagRegex = new RegExp('[^-_a-z0-9]', 'i');

function isValidTag(tagName) {
  try {
    return !validTagRegex.test(tagName);
  } catch (e) {
    return false;
  }
}

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

  onTagAdd = (tag) => {
    if (!tag.id) {
      if (isValidTag(tag.name)) {
        this.props.addTag({
          tag: { label: tag.name },
          onTagCreated: this.onTagCreated
        });
      }

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

  onTagDelete = (index) => {
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

  onTagCreated = (tag) => {
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
