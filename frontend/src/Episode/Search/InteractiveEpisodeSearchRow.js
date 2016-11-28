import React, { Component, PropTypes } from 'react';
import formatAge from 'Utilities/Number/formatAge';
import formatBytes from 'Utilities/Number/formatBytes';
import { kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import IconButton from 'Components/IconButton';
import Label from 'Components/Label';
import Link from 'Components/Link';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import Popover from 'Components/Tooltip/Popover';
import EpisodeQuality from 'Episode/EpisodeQuality';
import styles from './InteractiveEpisodeSearchRow.css';

function getDownloadIcon(grabbing, grabbed, grabError) {
  if (grabbing) {
    return 'icon-sonarr-spinner fa-spin';
  } else if (grabbed) {
    return 'icon-sonarr-downloading';
  } else if (grabError) {
    return 'icon-sonarr-download-failed';
  }

  return 'icon-sonarr-download';
}

function getDownloadTooltip(grabbing, grabbed, grabError) {
  if (grabbing) {
    return '';
  } else if (grabbed) {
    return 'Added to downloaded queue';
  } else if (grabError) {
    return grabError;
  }

  return 'Add to downloaded queue';
}

class InteractiveEpisodeSearchRow extends Component {

  //
  // Listeners

  onGrabPress = () => {
    this.props.onGrabPress(this.props.guid);
  }

  //
  // Render

  render() {
    const {
      protocol,
      age,
      ageHours,
      ageMinutes,
      title,
      infoUrl,
      indexer,
      size,
      seeders,
      leechers,
      quality,
      rejections,
      downloadAllowed,
      grabbing,
      grabbed,
      grabError
    } = this.props;

    const protocolName = protocol === 'usenet' ? 'nzb' : protocol;

    return (
      <TableRow>
        <TableRowCell>
          <Label className={styles[protocol]}>
            {protocolName}
          </Label>
        </TableRowCell>

        <TableRowCell>
          {formatAge(age, ageHours, ageMinutes)}
        </TableRowCell>

        <TableRowCell>
          <Link to={infoUrl}>
            {title}
          </Link>
        </TableRowCell>

        <TableRowCell>
          {indexer}
        </TableRowCell>

        <TableRowCell>
          {formatBytes(size)}
        </TableRowCell>

        <TableRowCell>
          {
            protocol === 'torrent' &&
              <Label kind={kinds.WARNING}>
                {seeders}/{leechers}
              </Label>
          }
        </TableRowCell>

        <TableRowCell className={styles.quality}>
          <EpisodeQuality
            quality={quality}
          />
        </TableRowCell>

        <TableRowCell>
          <Popover
            anchor={
              <Icon
                name="icon-sonarr-form-danger"
              />
            }
            title="Release Rejected"
            body={
              <ul>
                {
                  rejections.map((rejection, index) => {
                    return (
                      <li key={index}>
                        {rejection}
                      </li>
                    );
                  })
                }
              </ul>
            }
            position={tooltipPositions.LEFT}
          />
        </TableRowCell>

        <TableRowCell>
          {
            downloadAllowed &&
              <IconButton
                name={getDownloadIcon(grabbing, grabbed, grabError)}
                title={getDownloadTooltip(grabbing, grabbed, grabError)}
                isDisabled={grabbing}
                onPress={this.onGrabPress}
              />
          }
        </TableRowCell>
      </TableRow>
    );
  }
}

InteractiveEpisodeSearchRow.propTypes = {
  guid: PropTypes.string.isRequired,
  protocol: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  ageHours: PropTypes.number.isRequired,
  ageMinutes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  infoUrl: PropTypes.string.isRequired,
  indexer: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  seeders: PropTypes.number,
  leechers: PropTypes.number,
  quality: PropTypes.object.isRequired,
  rejections: PropTypes.arrayOf(PropTypes.string).isRequired,
  downloadAllowed: PropTypes.bool.isRequired,
  grabbing: PropTypes.bool.isRequired,
  grabbed: PropTypes.bool.isRequired,
  grabError: PropTypes.string,
  onGrabPress: PropTypes.func.isRequired
};

InteractiveEpisodeSearchRow.defaultProps = {
  grabbing: false,
  grabbed: false
};

export default InteractiveEpisodeSearchRow;
