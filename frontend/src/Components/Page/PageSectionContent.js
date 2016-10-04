import React, { PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';

function PageSectionContent(props) {
  const {
    fetching,
    populated,
    error,
    errorMessage,
    children
  } = props;

  if (fetching) {
    return (
      <LoadingIndicator />
    );
  } else if (!fetching && !!error) {
    return (
      <div>{errorMessage}</div>
    );
  } else if (populated && !error) {
    return (
      <div>{children}</div>
    );
  }

  return null;
}

PageSectionContent.propTypes = {
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  errorMessage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default PageSectionContent;
