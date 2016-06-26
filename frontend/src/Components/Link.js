import React, { Component, PropTypes } from 'react';

class Link extends Component {

  //
  // Render

  render() {
    const {
      to,
      ...otherProps
    } = this.props;

    const target = to.startsWith('http') ? '_blank' : '_self';

    return (
      React.createElement('a', {
        ...otherProps,
        href: to,
        target: target
      })
    );
  }
}

Link.propTypes = {
  to: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default Link;
