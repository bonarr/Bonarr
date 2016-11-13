import React, { Component, PropTypes } from 'react';
import Icon from 'Components/Icon';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/TableRowCell';
import styles from './FileBrowserRow.css';

class FileBrowserRow extends Component {

  //
  // Listeners

  onClick = () => {
    this.props.onClick(this.props.path);
  }

  //
  // Render

  render() {
    const {
      type,
      name
    } = this.props;

    return (
      <TableRow
        className={styles.row}
        onClick={this.onClick}
      >
        <TableRowCell className={styles.type}>
          <Icon name={`icon-sonarr-browser-${type}`} />
        </TableRowCell>

        <TableRowCell>{name}</TableRowCell>
      </TableRow>
    );
  }

}

FileBrowserRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FileBrowserRow;
