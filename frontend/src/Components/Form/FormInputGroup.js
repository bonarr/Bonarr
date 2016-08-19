import React, { PropTypes } from 'react';
import inputType from 'Utilities/inputType';
import Icon from 'Components/Icon';
import CheckInput from './CheckInput';
import SelectInput from './SelectInput';
import FormInputHelpText from './FormInputHelpText';
import styles from './FormInputGroup.css';

function getComponent(type) {
  switch (type) {
    case inputType.CHECK:
      return CheckInput;
    case inputType.SELECT:
      return SelectInput;
    default:
      return null;
  }
}

function FormInputGroup(props) {
  const {
    className,
    containerClassName,
    type,
    helpText,
    pending,
    errors,
    warnings,
    ...otherProps
   } = props;

  const InputComponent = getComponent(type);
  const checkInput = type === inputType.CHECK;
  const hasError = errors.length;
  const hasWarning = !hasError && warnings.length;

  return (
    <div className={containerClassName}>
      <div className={className}>
        <div className={styles.inputContainer}>
          <InputComponent
            helpText={helpText}
            hasError={hasError}
            hasWarning={hasWarning}
            {...otherProps}
          />
        </div>

        {/* <div className={styles.pendingChangesContainer}>
          {
            pending &&
              <Icon
                name="icon-sonarr-unsaved-setting"
                className={styles.pendingChangesIcon}
                title="Change has not been saved yet"
              />
          }
        </div> */}
      </div>

      {
        !checkInput && helpText &&
          <FormInputHelpText
            text={helpText}
          />
      }

      {
        errors.map((error, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={error.errorMessage}
              isError={true}
            />
          );
        })
      }

      {
        warnings.map((warning, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={warning.errorMessage}
              isWarning={true}
            />
          );
        })
      }
    </div>
  );
}

FormInputGroup.propTypes = {
  className: PropTypes.string.isRequired,
  containerClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  pending: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.object),
  warnings: PropTypes.arrayOf(PropTypes.object)
};

FormInputGroup.defaultProps = {
  className: styles.inputGroup,
  containerClassName: styles.inputGroupContainer,
  type: inputType.TEXT,
  errors: [],
  warnings: []
};

export default FormInputGroup;
