import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import Icon from 'Components/Icon';
import FormInputHelpText from './FormInputHelpText';
import styles from './CheckInput.css';

class CheckInput extends Component {

  //
  // Listeners

  @autobind
  onChange(event) {
    this.props.onChange({
      name: this.props.name,
      value: event.target.checked
    });
  }

  //
  // Render

  render() {
    const {
      containerClassName,
      name,
      value,
      helpText,
      helpTextWarning
    } = this.props;

    return (
      <div className={containerClassName}>
        <label
          className={styles.label}
        >
          <input
            className={styles.checkbox}
            type="checkbox"
            name={name}
            checked={value}
            onChange={this.onChange}
          />
          <div className={styles.styledContainer}>
            <div
              className={classNames(
                styles.styled,
                value && styles.isChecked
              )}
            >
              {
                value &&
                  <Icon name="icon-sonarr-check" />
              }
            </div>
          </div>
          {
            helpText &&
              <FormInputHelpText
                className={styles.helpText}
                text={helpText}
              />
          }

          {
            !helpText && helpTextWarning &&
              <FormInputHelpText
                className={styles.helpText}
                text={helpTextWarning}
                isWarning={true}
              />
          }
        </label>
      </div>
    );
  }
}

CheckInput.propTypes = {
  containerClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  helpText: PropTypes.string,
  helpTextWarning: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

CheckInput.defaultProps = {
  containerClassName: styles.container
};

export default CheckInput;
