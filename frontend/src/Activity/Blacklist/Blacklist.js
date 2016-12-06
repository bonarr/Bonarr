import React, { Component, PropTypes } from 'react';
import LoadingIndicator from 'Components/LoadingIndicator';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import TablePager from 'Components/Table/TablePager';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import BlacklistRowConnector from './BlacklistRowConnector';

const headers = [
  {
    name: 'series.sortTitle',
    label: 'Series Title',
    sortable: true
  },
  {
    name: 'sourceTitle',
    label: 'Source Title',
    sortable: true
  },
  {
    name: 'quality',
    label: 'Quality'
  },
  {
    name: 'date',
    label: 'Date',
    sortable: true
  },
  {
    name: 'details',
    label: ''
  }
];

class Blacklist extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items,
      totalRecords,
      isClearingBlacklistExecuting,
      onClearBlacklistPress,
      ...otherProps
    } = this.props;

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              iconName="icon-sonarr-clear"
              title="Clear Blacklist"
              animate={isClearingBlacklistExecuting}
              onPress={onClearBlacklistPress}
            />
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            fetching &&
              <LoadingIndicator />
          }

          {
            !fetching &&
              <div>
                <Table
                  headers={headers}
                  {...otherProps}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <BlacklistRowConnector
                            key={item.id}
                            {...item}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>

                <TablePager
                  totalRecords={totalRecords}
                  {...otherProps}
                />
              </div>
          }
        </PageContentBody>
      </PageContent>
    );
  }
}

Blacklist.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  totalRecords: PropTypes.number,
  isClearingBlacklistExecuting: PropTypes.bool.isRequired,
  onClearBlacklistPress: PropTypes.func.isRequired
};

export default Blacklist;
