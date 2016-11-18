import React, { PropTypes } from 'react';
import Link from 'Components/Link.js';

function SeriesTitleLink({ titleSlug, title }) {
  const link = `/series/${titleSlug}`;

  return (
    <Link to={link}>
      {title}
    </Link>
  );
}

SeriesTitleLink.propTypes = {
  titleSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SeriesTitleLink;
