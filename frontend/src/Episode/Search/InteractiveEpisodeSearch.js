import React, { PropTypes } from 'react';
import { sortDirections } from 'Helpers/Props';
import LoadingIndicator from 'Components/LoadingIndicator';
import Icon from 'Components/Icon';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import InteractiveEpisodeSearchRow from './InteractiveEpisodeSearchRow';

const headers = [
  {
    name: 'protocol',
    label: 'Source',
    sortable: true
  },
  {
    name: 'age',
    label: 'Age',
    sortable: true
  },
  {
    name: 'title',
    label: 'Title',
    sortable: true
  },
  {
    name: 'indexer',
    label: 'Indexer',
    sortable: true
  },
  {
    name: 'size',
    label: 'Size',
    sortable: true
  },
  {
    name: 'peers',
    label: 'Peers',
    sortable: true
  },
  {
    name: 'qualityWeight',
    label: 'Quality',
    sortable: true
  },
  {
    name: 'rejections',
    label: React.createElement(Icon, { name: 'icon-sonarr-header-rejections' }),
    sortable: true,
    fixedSortDirection: sortDirections.ASCENDING
  },
  {
    name: 'releaseWeight',
    label: React.createElement(Icon, { name: 'icon-sonarr-download' }),
    sortable: true,
    fixedSortDirection: sortDirections.ASCENDING
  }
];

function InteractiveEpisodeSearch(props) {
  const {
    fetching,
    populated,
    error,
    items,
    sortKey,
    sortDirection,
    onSortPress,
    onGrabPress
  } = props;

  if (fetching) {
    return <LoadingIndicator />;
  } else if (!fetching && !!error) {
    return <div>Unable to load results for this episode search. Try again later.</div>;
  } else if (populated && !items.length) {
    return <div>No results found.</div>;
  }

  return (
    <Table
      headers={headers}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSortPress={onSortPress}
    >
      <TableBody>
        {
          items.map((item) => {
            return (
              <InteractiveEpisodeSearchRow
                key={item.guid}
                {...item}
                onGrabPress={onGrabPress}
              />
            );
          })
        }
      </TableBody>
    </Table>
  );
}

InteractiveEpisodeSearch.propTypes = {
  fetching: PropTypes.bool.isRequired,
  populated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  onSortPress: PropTypes.func.isRequired,
  onGrabPress: PropTypes.func.isRequired
};

export default InteractiveEpisodeSearch;
