import React, { Component, PropTypes } from 'react';
import titleCase from 'Utilities/String/titleCase';
import LoadingIndicator from 'Components/LoadingIndicator'
import Icon from 'Components/Icon'
import Link from 'Components/Link'
import FieldSet from 'Components/FieldSet'
import Table from 'Components/Table/Table'
import TableBody from 'Components/Table/TableBody'
import TableRow from 'Components/Table/TableRow'
import TableRowCell from 'Components/Table/TableRowCell'
import styles from './Health.css'

class Health extends Component {

  //
  // Render

  render() {
    const {
      fetching,
      items
    } = this.props;

    const healthOk = !fetching && items.length === 0;
    const healthIssues = !fetching && items.length;

    const headers = [
      {
        className: styles.status,
        name: 'type',
        label: ''
      },
      {
        name: 'message',
        label: 'Message'
      },
      {
        name: 'link',
        label: 'Link'
      }
    ];

    return (
      <FieldSet
        legend="Health"
      >
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          healthOk &&
            <div>No issues with your configuration</div>
        }

        {
          healthIssues &&
            <Table
              headers={headers}
            >
              <TableBody>
                {
                  items.map((item, index) => {
                    return (
                      <TableRow
                        key={`health${index}`}
                      >
                        <TableRowCell>
                          <Icon
                            className={`icon-sonarr-health-${item.type.toLowerCase()}`}
                            title={titleCase(item.type)}
                          />
                        </TableRowCell>
                        <TableRowCell>{item.message}</TableRowCell>
                        <TableRowCell>
                          <Link
                            to={item.wikiUrl}
                            title="Read the Wiki for more information"
                          >
                            Wiki
                          </Link>
                        </TableRowCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
        }
      </FieldSet>
    );
  }

}

Health.propTypes = {
  fetching: PropTypes.bool,
  items: PropTypes.array
};

export default Health;
