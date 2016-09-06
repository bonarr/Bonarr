import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classNames';
import sizes from 'Utilities/sizes';
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
      onInputChange
    } = this.props;

    let value = token;

    if (tokenCase === 'lower') {
      value = token.toLowerCase();
    } else if (tokenCase === 'upper') {
      value = token.toUpperCase();
    }

    onInputChange({
      name,
      value: `${setting.value}${value}`
    });
  }

  //
  // Render
  render() {
    const {
      token,
      example,
      tokenCase,
      size
    } = this.props;

    return (
      <Link
        className={classNames(
          styles.option,
          styles[size],
          styles[tokenCase]
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
  size: PropTypes.oneOf([sizes.SMALL, sizes.LARGE]),
  onInputChange: PropTypes.func.isRequired
};

NamingOption.defaultProps = {
  size: sizes.SMALL
};

export default NamingOption;
