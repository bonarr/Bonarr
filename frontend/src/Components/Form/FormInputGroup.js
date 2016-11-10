import React, { PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import Icon from 'Components/Icon';
import Link from 'Components/Link';
import CaptchaInputConnector from './CaptchaInputConnector';
import CheckInput from './CheckInput';
import NumberInput from './NumberInput';
import OAuthInputConnector from './OAuthInputConnector';
import PasswordInput from './PasswordInput';
import PathInputConnector from './PathInputConnector';
import SelectInput from './SelectInput';
import TagInputConnector from './TagInputConnector';
import TextTagInputConnector from './TextTagInputConnector';
import TextInput from './TextInput';
import FormInputHelpText from './FormInputHelpText';
import styles from './FormInputGroup.css';

function getComponent(type) {
  switch (type) {
    case inputTypes.CAPTCHA:
      return CaptchaInputConnector;

    case inputTypes.CHECK:
      return CheckInput;

    case inputTypes.NUMBER:
      return NumberInput;

    case inputTypes.OAUTH:
      return OAuthInputConnector;

    case inputTypes.PASSWORD:
      return PasswordInput;

    case inputTypes.PATH:
      return PathInputConnector;

    case inputTypes.SELECT:
      return SelectInput;

    case inputTypes.TAG:
      return TagInputConnector;

    case inputTypes.TEXT_TAG:
      return TextTagInputConnector;

    default:
      return TextInput;
  }
}

function FormInputGroup(props) {
  const {
    className,
    containerClassName,
    inputClassName,
    type,
    button,
    helpText,
    helpTexts,
    helpTextWarning,
    helpLink,
    pending,
    errors,
    warnings,
    ...otherProps
   } = props;

  const InputComponent = getComponent(type);
  const checkInput = type === inputTypes.CHECK;
  const hasError = !!errors.length;
  const hasWarning = !hasError && !!warnings.length;
  const hasButton = !!button;

  return (
    <div className={containerClassName}>
      <div className={className}>
        <div className={styles.inputContainer}>
          <InputComponent
            className={inputClassName}
            helpText={helpText}
            helpTextWarning={helpTextWarning}
            hasError={hasError}
            hasWarning={hasWarning}
            hasButton={hasButton}
            {...otherProps}
          />
        </div>

        {button}

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
        !checkInput && helpTexts &&
          <div>
            {
              helpTexts.map((text, index) => {
                return (
                  <FormInputHelpText
                    key={index}
                    text={text}
                    isCheckInput={checkInput}
                  />
                );
              })
            }
          </div>
      }

      {
        !checkInput && helpTextWarning &&
          <FormInputHelpText
            text={helpTextWarning}
            isWarning={true}
          />
      }

      {
        helpLink &&
          <Link
            to={helpLink}
          >
            More Info
          </Link>
      }

      {
        errors.map((error, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={error}
              isError={true}
              isCheckInput={checkInput}
            />
          );
        })
      }

      {
        warnings.map((warning, index) => {
          return (
            <FormInputHelpText
              key={index}
              text={warning}
              isWarning={true}
              isCheckInput={checkInput}
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
  inputClassName: PropTypes.string,
  type: PropTypes.string.isRequired,
  button: PropTypes.node,
  helpText: PropTypes.string,
  helpTexts: PropTypes.arrayOf(PropTypes.string),
  helpTextWarning: PropTypes.string,
  helpLink: PropTypes.string,
  pending: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  warnings: PropTypes.arrayOf(PropTypes.string)
};

FormInputGroup.defaultProps = {
  className: styles.inputGroup,
  containerClassName: styles.inputGroupContainer,
  type: inputTypes.TEXT,
  helpTexts: [],
  errors: [],
  warnings: []
};

export default FormInputGroup;
