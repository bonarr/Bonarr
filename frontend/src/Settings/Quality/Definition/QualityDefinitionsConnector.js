import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchQualityDefinitions, saveQualityDefinitions } from 'Stores/Actions/settingsActions';
import QualityDefinitions from './QualityDefinitions';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.qualityDefinitions,
    (qualityDefinitions) => {
      const items = qualityDefinitions.items.map((item) => {
        const pendingChanges = qualityDefinitions.pendingChanges[item.id] || {};

        return Object.assign({}, item, pendingChanges);
      });

      return {
        ...qualityDefinitions,
        items
      };
    }
  );
}

const mapDispatchToProps = {
  fetchQualityDefinitions,
  saveQualityDefinitions
};

class QualityDefinitionsConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchQualityDefinitions();
  }

  //
  // Control

  save = () => {
    this.props.saveQualityDefinitions();
  }

  //
  // Render

  render() {
    return (
      <QualityDefinitions
        {...this.props}
      />
    );
  }
}

QualityDefinitionsConnector.propTypes = {
  fetchQualityDefinitions: PropTypes.func.isRequired,
  saveQualityDefinitions: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps, null, { withRef: true })(QualityDefinitionsConnector);
