import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import align from 'Utilities/align';
import styles from './PageToolbarSection.css';

class PageToolbarSection extends Component {

  //
  // Render

  render() {
    const {
      children,
      alignContent
    } = this.props;

    return (
      <div className={classNames(
        styles.section,
        styles[alignContent]
      )}>
        {children}
      </div>
    );
  }

}

PageToolbarSection.propTypes = {
  children: PropTypes.node.isRequired,
  alignContent: PropTypes.oneOf([align.LEFT, align.CENTER, align.RIGHT])
};

PageToolbarSection.defaultProps = {
  alignContent: align.LEFT
};

export default PageToolbarSection;
