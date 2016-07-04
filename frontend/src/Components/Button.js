import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
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
        styles.button,
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
  className: PropTypes.string,
  kind: PropTypes.oneOf(kinds.all),
  children: PropTypes.node
};

Button.defaultProps = {
  kind: kinds.DEFAULT
};

export default Button
