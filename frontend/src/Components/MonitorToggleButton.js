import React, { Component, PropTypes } from 'react';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import styles from './MonitorToggleButton.css';

class MonitorToggleButton extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onPress(!this.props.monitored);
  }

  //
  // Render

  render() {
    const {
      className,
      monitored,
      isSaving
    } = this.props;

    const monitoredMessage = 'Monitored, click to unmonitor';
    const unmonitoredMessage = 'Unmonitored, click to monitor';
    const iconName = monitored ? 'icon-sonarr-monitored' : 'icon-sonarr-unmonitored';

    return (
      <Button
        className={className}
        title={monitored ? monitoredMessage : unmonitoredMessage}
        onPress={this.onPress}
      >
        <Icon
          name={isSaving ? 'icon-sonarr-spinner fa-spin' : iconName}
        />
      </Button>
    );
  }
}

MonitorToggleButton.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

MonitorToggleButton.defaultProps = {
  className: styles.toggleButton,
  isSaving: false
};

export default MonitorToggleButton;
