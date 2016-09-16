import React, { PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';

function PageSectionContent({ fetching, error, errorMessage, children }) {
  if (fetching) {
    return (
      <LoadingIndicator />
    );
  } else if (!fetching && !!error) {
    return (
      <div>{errorMessage}</div>
    );
  }

  return (
    <div>{children}</div>
  );
}

PageSectionContent.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  errorMessage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default PageSectionContent;
