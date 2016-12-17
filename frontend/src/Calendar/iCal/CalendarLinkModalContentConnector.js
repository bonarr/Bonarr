import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchTags } from 'Stores/Actions/tagActions';
import CalendarLinkModalContent from './CalendarLinkModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.tags.items,
    (tagList) => {
      return {
        tagList
      };
    }
  );
}

const mapDispatchToProps = {
  fetchTags
};

class CalendarLinkModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchTags();
  }

  //
  // Render

  render() {
    return (
      <CalendarLinkModalContent
        {...this.props}
      />
    );
  }
}

CalendarLinkModalContentConnector.propTypes = {
  fetchTags: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(CalendarLinkModalContentConnector);
