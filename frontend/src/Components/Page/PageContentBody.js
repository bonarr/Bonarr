import React, { Component, PropTypes } from 'react';
import styles from './PageContentBody.css';

class PageContentBody extends Component {

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

PageContentBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageContentBody.defaultProps = {
  className: styles.contentBody
};

export default PageContentBody;
