import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import * as kinds from 'Helpers/kinds';
import Link from './Link';
import styles from './Button.css';

class Button extends Component {

  //
  // Render

  render() {
    const {
      className,
      kind,
      children,
      ...otherProps
    } = this.props;

    return (
      <Link
        className={classNames(
        className,
        styles[kind]
      )}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }

}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(kinds.all),
  children: PropTypes.node
};

Button.defaultProps = {
  className: styles.button,
  kind: kinds.DEFAULT
};

export default Button;
