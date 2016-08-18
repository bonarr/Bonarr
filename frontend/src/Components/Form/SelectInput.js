import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import styles from './SelectInput.css';

class SelectInput extends Component {

  //
  // Listeners

  @autobind
  onChange(event) {
    this.props.onChange({
      name: this.props.name,
      value: event.target.value
    });
  }

  //
  // Render

  render() {
    const {
      className,
      value,
      values
    } = this.props;

    return (
      <select
        className={className}
        value={value}
        onChange={this.onChange}
      >
        {
          values.map((v) => {
            const [key] = _.keys(v);

            return <option key={key} value={key}>{v[key]}</option>;
          })
        }
      </select>
    );
  }
}

SelectInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

SelectInput.defaultProps = {
  className: styles.select
};

export default SelectInput;
