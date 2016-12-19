import React, { Component, PropTypes } from 'react';
import { sortDirections } from 'Helpers/Props';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import SeriesIndexItemConnector from 'Series/Index/SeriesIndexItemConnector';
import SeriesIndexRow from './SeriesIndexRow';

const headers = [
  {
    name: 'status',
    label: ''
  },
  {
    name: 'sortTitle',
    label: 'Series Title',
    sortable: true
  },
  {
    name: 'network',
    label: 'Network',
    sortable: true
  },
  {
    name: 'qualityProfileId',
    label: 'Profile',
    sortable: true
  },
  {
    name: 'nextAiring',
    label: 'Next Airing',
    sortable: true
  },
  // {
  //   name: 'previousAiring',
  //   label: 'Previous Airing',
  //   sortable: true
  // },
  {
    name: 'seasonCount',
    label: 'Seasons',
    sortable: true
  },
  {
    name: 'episodeProgress',
    label: 'Episodes',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions'
  }
];

class SeriesIndexTable extends Component {

  //
  // Render

  render() {
    const {
      items,
      sortKey,
      sortDirection,
      onSortPress
    } = this.props;

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
                <SeriesIndexItemConnector
                  key={item.id}
                  component={SeriesIndexRow}
                  {...item}
                />
              );
            })
          }
        </TableBody>
      </Table>
    );
  }
}

SeriesIndexTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  onSortPress: PropTypes.func.isRequired
};

export default SeriesIndexTable;
