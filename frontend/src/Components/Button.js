import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import { kinds, sizes } from 'Helpers/Props';
import Link from './Link';
import styles from './Button.css';

class Button extends Component {

  //
  // Render

  render() {
    const {
      className,
      kind,
      size,
      children,
      ...otherProps
    } = this.props;

    return (
      <Link
        className={classNames(
          className,
          styles[kind],
          styles[size]
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
  size: PropTypes.oneOf(sizes.all),
  children: PropTypes.node
};

Button.defaultProps = {
  className: styles.button,
  kind: kinds.DEFAULT,
  size: sizes.MEDIUM
};

export default Button;
