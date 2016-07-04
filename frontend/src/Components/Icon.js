import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Icon.css'

class Icon extends Component {

  //
  // Render

  render() {
    const {
      name,
      className,
      title
    } = this.props;

    return (
      <i
        className={classNames(name, className, styles.icon)}
        title={title}
      >

      </i>
    );
  }

}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export default Icon
