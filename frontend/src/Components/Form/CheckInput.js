import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import { kinds } from 'Helpers/Props';
import Icon from 'Components/Icon';
import FormInputHelpText from './FormInputHelpText';
import styles from './CheckInput.css';

class CheckInput extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this._checkbox = null;
  }

  componentDidMount() {
    this.setIndeterminate();
  }

  componentDidUpdate() {
    this.setIndeterminate();
  }

  //
  // Control

  setIndeterminate() {
    if (!this._checkbox) {
      return;
    }

    const {
      value,
      uncheckedValue,
      checkedValue
    } = this.props;

    this._checkbox.indeterminate = value !== uncheckedValue && value !== checkedValue;
  }

  //
  // Listeners

  setRef = (ref) => {
    this._checkbox = ref;
  }

  onChange = (event) => {
    const {
      name,
      value,
      checkedValue,
      uncheckedValue
    } = this.props;

    const shiftKey = event.nativeEvent.shiftKey;
    const checked = event.target.checked;
    const newValue = checked ? checkedValue : uncheckedValue;

    if (value !== newValue) {
      this.props.onChange({
        name,
        value: newValue,
        shiftKey
      });
    }
  }

  //
  // Render

  render() {
    const {
      className,
      containerClassName,
      name,
      value,
      checkedValue,
      uncheckedValue,
      helpText,
      helpTextWarning,
      isDisabled,
      kind
    } = this.props;

    const isChecked = value === checkedValue;
    const isUnchecked = value === uncheckedValue;
    const isIndeterminate = !isChecked && !isUnchecked;
    const isCheckClass = `${kind}IsChecked`;

    return (
      <div className={containerClassName}>
        <label
          className={styles.label}
        >
          <input
            ref={this.setRef}
            className={styles.checkbox}
            type="checkbox"
            name={name}
            checked={isChecked}
            disabled={isDisabled}
            onChange={this.onChange}
          />

          <div
            className={classNames(
              className,
              isChecked && styles[isCheckClass],
              isIndeterminate && styles.isIndeterminate,
              isDisabled && styles.isDisabled
            )}
          >
            {
              isChecked &&
                <Icon name="icon-sonarr-check" />
            }

            {
              isIndeterminate &&
                <Icon name="icon-sonarr-indeterminate" />
            }
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
  className: PropTypes.string.isRequired,
  containerClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checkedValue: PropTypes.bool,
  uncheckedValue: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  helpText: PropTypes.string,
  helpTextWarning: PropTypes.string,
  isDisabled: PropTypes.bool,
  kind: PropTypes.oneOf(kinds.all).isRequired,
  onChange: PropTypes.func.isRequired
};

CheckInput.defaultProps = {
  className: styles.input,
  containerClassName: styles.container,
  checkedValue: true,
  uncheckedValue: false,
  kind: kinds.PRIMARY
};

export default CheckInput;
