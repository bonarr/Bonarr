import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';

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
      <icon
        className={classNames(name, className)}
        title={title}
      >


      </icon>
    );
  }

}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export default Icon;
