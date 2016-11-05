import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import { sizes } from 'Helpers/Props';
import Link from 'Components/Link';
import styles from './NamingOption.css';

class NamingOption extends Component {

  //
  // Listeners
  @autobind
  onPress() {
    const {
      name,
      setting,
      token,
      tokenCase,
      isFullFilename,
      onInputChange
    } = this.props;

    let value = token;

    if (tokenCase === 'lower') {
      value = token.toLowerCase();
    } else if (tokenCase === 'upper') {
      value = token.toUpperCase();
    }

    if (isFullFilename) {
      onInputChange({ name, value });
    } else {
      onInputChange({
        name,
        value: `${setting.value}${value}`
      });
    }
  }

  //
  // Render
  render() {
    const {
      token,
      example,
      tokenCase,
      isFullFilename,
      size
    } = this.props;

    return (
      <Link
        className={classNames(
          styles.option,
          styles[size],
          styles[tokenCase],
          isFullFilename && styles.isFullFilename
        )}
        onPress={this.onPress}
      >
        <div className={styles.token}>{token}</div>
        <div className={styles.example}>{example}</div>
      </Link>
    );
  }
}

NamingOption.propTypes = {
  name: PropTypes.string.isRequired,
  setting: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired,
  tokenCase: PropTypes.string.isRequired,
  isFullFilename: PropTypes.bool.isRequired,
  size: PropTypes.oneOf([sizes.SMALL, sizes.LARGE]),
  onInputChange: PropTypes.func.isRequired
};

NamingOption.defaultProps = {
  size: sizes.SMALL
};

export default NamingOption;
