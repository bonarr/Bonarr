import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import styles from './PathInput.css';

class PathInput extends Component {

  //
  // Control

  getSuggestionValue({ path }) {
    return path;
  }

  renderSuggestion({ path }, { query }) {
    // TODO: Highlight matching part of query
    const lastSeparatorIndex = query.lastIndexOf('\\') || query.lastIndexOf('/');

    if (lastSeparatorIndex === -1) {
      return (
        <span>{path}</span>
      );
    }

    return (
      <span>
        <span className={styles.pathMatch}>
          {path.substring(0, lastSeparatorIndex)}
        </span>
        {path.substring(lastSeparatorIndex)}
      </span>
    );
  }

  //
  // Listeners

  @autobind
  onChange(event, { newValue }) {
    this.props.onChange({
      name: this.props.name,
      value: newValue
    });
  }

  @autobind
  onKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const path = this.props.paths[0];

      this.props.onChange({
        name: this.props.name,
        value: path.path
      });

      if (path.type !== 'file') {
        this.props.onFetchPaths(path.path);
      }
    }
  }

  @autobind
  onSuggestionsFetchRequested({ value }) {
    this.props.onFetchPaths(value);
  }

  @autobind
  onSuggestionsClearRequested() {
    this.props.onClearPaths();
  }

  //
  // Render

  render() {
    const {
      className,
      name,
      value,
      paths,
      hasError,
      hasWarning
    } = this.props;

    const inputProps = {
      className: classNames(
        className,
        hasError && styles.hasError,
        hasWarning && styles.hasWarning
      ),
      name,
      value,
      autoComplete: 'off',
      spellCheck: false,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    const theme = {
      containerOpen: styles.pathInputContainerOpen,
      suggestionsContainer: styles.pathContainer,
      suggestionsList: styles.pathList,
      suggestion: styles.pathListItem,
      suggestionFocused: styles.pathFocused
    };

    return (
      <Autosuggest
        id={name}
        inputProps={inputProps}
        theme={theme}
        suggestions={paths}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      />
    );
  }
}

PathInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  paths: PropTypes.array.isRequired,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFetchPaths: PropTypes.func.isRequired,
  onClearPaths: PropTypes.func.isRequired
};

PathInput.defaultProps = {
  className: styles.path
};

export default PathInput;
