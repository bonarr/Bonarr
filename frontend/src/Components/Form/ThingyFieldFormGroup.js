import React, { PropTypes } from 'react';
import inputTypes from 'Utilities/inputTypes';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';

function getType(type) {
  // Textbox,
  // Password,
  // Checkbox,
  // Select,
  // Path,
  // FilePath,
  // Hidden,
  // Tag,
  // Action,
  // Url,
  // Captcha

  switch (type) {
    case 'textbox':
      return inputTypes.TEXT;
    case 'checkbox':
      return inputTypes.CHECK;
    default:
      return inputTypes.TEXT;
  }
}

function ThingyFormGroup(props) {
  const {
    advancedSettings,
    name,
    label,
    helpText,
    helpLink,
    value,
    type,
    advanced,
    pending,
    errors,
    warnings,
    onChange
  } = props;

  if (!advancedSettings && advanced) {
    return null;
  }

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>

      <FormInputGroup
        type={getType(type)}
        name={name}
        helpText={helpText}
        value={value}
        errors={errors}
        warnings={warnings}
        pending={pending}
        onChange={onChange}
      />
    </FormGroup>
  );
}

ThingyFormGroup.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  helpLink: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  type: PropTypes.string.isRequired,
  advanced: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default ThingyFormGroup;
