import React, { Component, PropTypes } from 'react';

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
        className={className}
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
