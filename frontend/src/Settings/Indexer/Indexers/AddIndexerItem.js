import React, { Component, PropTypes } from 'react';
import { align, sizes } from 'Helpers/Props';
import Button from 'Components/Button';
import Link from 'Components/Link';
import Menu from 'Components/Menu/Menu';
import MenuContent from 'Components/Menu/MenuContent';
import AddIndexerPresetMenuItem from './AddIndexerPresetMenuItem';
import styles from './AddIndexerItem.css';

class AddIndexerItem extends Component {

  //
  // Listeners

  onIndexerSelect = () => {
    this.props.onIndexerSelect(this.props.indexer);
  }

  //
  // Render

  render() {
    const {
      implementationName,
      infoLink,
      presets,
      onIndexerSelect
    } = this.props;

    const hasPresets = !!presets && !!presets.length;

    return (
      <div
        className={styles.indexer}
        // onPress={this.onIndexerSelect}
      >
        <Link
          className={styles.underlay}
          onPress={this.onIndexerSelect}
        />

        <div className={styles.overlay}>
          <div className={styles.name}>
            {implementationName}
          </div>

          <div className={styles.actions}>
            {
              hasPresets &&
                <span>
                  <Button
                    size={sizes.SMALL}
                    onPress={this.onIndexerSelect}
                  >
                    Custom
                  </Button>

                  <Menu className={styles.presetsMenu}>
                    <Button
                      className={styles.presetsMenuButton}
                      size={sizes.SMALL}
                    >
                      Presets
                    </Button>

                    <MenuContent className={styles.presetsMenuContent}>
                      {
                        presets.map((preset) => {
                          return (
                            <AddIndexerPresetMenuItem
                              key={preset.name}
                              name={preset.name}
                              preset={preset}
                              onPress={onIndexerSelect}
                            />
                          );
                        })
                      }
                    </MenuContent>
                  </Menu>
                </span>
            }

            <Button
              to={infoLink}
              size={sizes.SMALL}
            >
              More info
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AddIndexerItem.propTypes = {
  indexer: PropTypes.object.isRequired,
  implementationName: PropTypes.string.isRequired,
  infoLink: PropTypes.string.isRequired,
  presets: PropTypes.arrayOf(PropTypes.object),
  onIndexerSelect: PropTypes.func.isRequired
};

export default AddIndexerItem;
