import _ from 'lodash';
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
        items,
        hasPendingChanges: !_.isEmpty(qualityDefinitions.pendingChanges)
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

  componentWillReceiveProps(nextProps) {
    if (this.props.hasPendingChanges !== nextProps.hasPendingChanges) {
      this.props.onHasPendingChange(nextProps.hasPendingChanges);
    }
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
  hasPendingChanges: PropTypes.bool.isRequired,
  fetchQualityDefinitions: PropTypes.func.isRequired,
  saveQualityDefinitions: PropTypes.func.isRequired,
  onHasPendingChange: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps, null, { withRef: true })(QualityDefinitionsConnector);
