import React, { Component, PropTypes } from 'react';
import ReactTags from 'react-tag-autocomplete';
import classNames from 'classNames';
import * as kinds from 'Helpers/kinds';
import styles from './TagInput.css';

class TagInput extends Component {

  //
  // Render

  render() {
    const {
      tags,
      tagList,
      allowNew,
      kind,
      onTagAdd,
      onTagDelete
    } = this.props;

    const tageInputClassNames = {
      root: styles.container,
      rootFocused: styles.containerFocused,
      selected: styles.selectedTagContainer,
      selectedTag: classNames(styles.selectedTag, styles[kind]),
      search: styles.searchInputContainer,
      searchInput: styles.searchInput,
      suggestions: styles.suggestions,
      suggestionActive: styles.suggestionActive,
      suggestionDisabled: styles.suggestionDisabled
    };

    return (
      <ReactTags
        classNames={tageInputClassNames}
        tags={tags}
        suggestions={tagList}
        allowNew={allowNew}
        minQueryLength={1}
        handleAddition={onTagAdd}
        handleDelete={onTagDelete}
      />
    );
  }
}

const tagShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape(tagShape)).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.shape(tagShape)).isRequired,
  allowNew: PropTypes.bool.isRequired,
  kind: PropTypes.string.isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired
};

TagInput.defaultProps = {
  allowNew: true,
  kind: kinds.INFO
};

export default TagInput;
