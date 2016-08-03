import React, { Component, PropTypes } from 'react';
import styles from './Page.css';

class Page extends Component {

  //
  // Render

  render() {
    const {
      className,
      children
    } = this.props;

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Page.defaultProps = {
  className: styles.page
};

export default Page;
