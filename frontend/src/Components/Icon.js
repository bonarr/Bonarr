import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Icon.css'

class Icon extends Component {

  //
  // Render

  render() {
    const {
      className,
      title
    } = this.props;

    return (
      <i
        className={classNames(className, styles.icon)}
        title={title}
      >

      </i>
    );
  }

}

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default Icon
