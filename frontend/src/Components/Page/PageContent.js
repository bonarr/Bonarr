import React, { Component, PropTypes } from 'react';
import styles from './PageContent.css';

class PageContent extends Component {

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

PageContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageContent.defaultProps = {
  className: styles.content
};

export default PageContent;
