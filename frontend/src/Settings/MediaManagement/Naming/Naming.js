import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import inputTypes from 'Utilities/inputTypes';
import sizes from 'Utilities/sizes';
import LoadingIndicator from 'Components/LoadingIndicator';
import FormInputButton from 'Components/Form/FormInputButton';
import FieldSet from 'Components/FieldSet';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import NamingModal from './NamingModal';

class Naming extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isNamingModalOpen: false,
      namingModalOptions: null
    };
  }

  //
  // Listeners

  @autobind
  onStandardNamingModalOpenClick() {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'standardEpisodeFormat',
        setting: this.props.settings.standardEpisodeFormat,
        season: true,
        episode: true,
        additional: true
      }
    });
  }

  @autobind
  onDailyNamingModalOpenClick() {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'dailyEpisodeFormat',
        setting: this.props.settings.dailyEpisodeFormat,
        season: true,
        episode: true,
        daily: true,
        additional: true
      }
    });
  }

  @autobind
  onAnimeNamingModalOpenClick() {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'animeEpisodeFormat',
        setting: this.props.settings.animeEpisodeFormat,
        season: true,
        episode: true,
        anime: true,
        additional: true
      }
    });
  }

  @autobind
  onSeriesFolderNamingModalOpenClick() {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'seriesFolderFormat',
        setting: this.props.settings.seriesFolderFormat
      }
    });
  }

  @autobind
  onSeasonFolderNamingModalOpenClick() {
    this.setState({
      isNamingModalOpen: true,
      namingModalOptions: {
        name: 'seasonFolderFormat',
        setting: this.props.settings.seasonFolderFormat,
        season: true
      }
    });
  }

  @autobind
  onNamingModalClose() {
    this.setState({ isNamingModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      advancedSettings,
      fetching,
      error,
      settings,
      hasSettings,
      examples,
      examplesPopulated,
      onInputChange
    } = this.props;

    const {
      isNamingModalOpen,
      namingModalOptions
    } = this.state;

    const renameEpisodes = hasSettings && settings.renameEpisodes.value;

    const multiEpisodeStyleOptions = [
      { 0: 'Extend' },
      { 1: 'Duplicate' },
      { 2: 'Repeat' },
      { 3: 'Scene' },
      { 4: 'Range' },
      { 5: 'Prefixed Range' }
    ];

    const standardEpisodeFormatHelpTexts = [];
    const standardEpisodeFormatErrors = [];
    const dailyEpisodeFormatHelpTexts = [];
    const dailyEpisodeFormatErrors = [];
    const animeEpisodeFormatHelpTexts = [];
    const animeEpisodeFormatErrors = [];
    const seriesFolderFormatHelpTexts = [];
    const seriesFolderFormatErrors = [];
    const seasonFolderFormatHelpTexts = [];
    const seasonFolderFormatErrors = [];

    if (examplesPopulated) {
      if (examples.singleEpisodeExample) {
        standardEpisodeFormatHelpTexts.push(`Single Episode: ${examples.singleEpisodeExample}`);
      } else {
        standardEpisodeFormatErrors.push('Single Episode: Invalid Format');
      }

      if (examples.multiEpisodeExample) {
        standardEpisodeFormatHelpTexts.push(`Multi Episode: ${examples.multiEpisodeExample}`);
      } else {
        standardEpisodeFormatErrors.push('Multi Episode: Invalid Format');
      }

      if (examples.dailyEpisodeExample) {
        dailyEpisodeFormatHelpTexts.push(`Example: ${examples.dailyEpisodeExample}`);
      } else {
        dailyEpisodeFormatErrors.push('Invalid Format');
      }

      if (examples.animeEpisodeExample) {
        animeEpisodeFormatHelpTexts.push(`Single Episode: ${examples.animeEpisodeExample}`);
      } else {
        animeEpisodeFormatErrors.push('Single Episode: Invalid Format');
      }

      if (examples.animeMultiEpisodeExample) {
        animeEpisodeFormatHelpTexts.push(`Multi Episode: ${examples.animeMultiEpisodeExample}`);
      } else {
        animeEpisodeFormatErrors.push('Multi Episode: Invalid Format');
      }

      if (examples.seriesFolderExample) {
        seriesFolderFormatHelpTexts.push(`Example: ${examples.seriesFolderExample}`);
      } else {
        seriesFolderFormatErrors.push('Invalid Format');
      }

      if (examples.seasonFolderExample) {
        seasonFolderFormatHelpTexts.push(`Example: ${examples.seasonFolderExample}`);
      } else {
        seasonFolderFormatErrors.push('Invalid Format');
      }
    }

    return (
      <FieldSet
        legend="Episode Naming"
      >
        {
          fetching &&
            <LoadingIndicator />
        }

        {
          !fetching && error &&
            <div>Unable to load Naming settings</div>
        }

        {
          hasSettings && !fetching && !error &&
            <div>
              <FormGroup>
                <FormLabel>Rename Episodes</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="renameEpisodes"
                  helpText="Sonarr will use the existing file name if renaming is disabled"
                  onChange={onInputChange}
                  {...settings.renameEpisodes}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Replace Illegal Characters</FormLabel>

                <FormInputGroup
                  type={inputTypes.CHECK}
                  name="replaceIllegalCharacters"
                  helpText="Replace or Remove illegal characters"
                  onChange={onInputChange}
                  {...settings.replaceIllegalCharacters}
                />
              </FormGroup>

              {
                renameEpisodes &&
                  <div>
                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Standard Episode Format</FormLabel>

                      <FormInputGroup
                        type={inputTypes.TEXT}
                        name="standardEpisodeFormat"
                        button={<FormInputButton onPress={this.onStandardNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.standardEpisodeFormat}
                        helpTexts={standardEpisodeFormatHelpTexts}
                        errors={[...standardEpisodeFormatErrors, ...settings.standardEpisodeFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Daily Episode Format</FormLabel>

                      <FormInputGroup
                        type={inputTypes.TEXT}
                        name="dailyEpisodeFormat"
                        button={<FormInputButton onPress={this.onDailyNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.dailyEpisodeFormat}
                        helpTexts={dailyEpisodeFormatHelpTexts}
                        errors={[...dailyEpisodeFormatErrors, ...settings.dailyEpisodeFormat.errors]}
                      />
                    </FormGroup>

                    <FormGroup size={sizes.LARGE}>
                      <FormLabel>Anime Episode Format</FormLabel>

                      <FormInputGroup
                        type={inputTypes.TEXT}
                        name="animeEpisodeFormat"
                        button={<FormInputButton onPress={this.onAnimeNamingModalOpenClick}>?</FormInputButton>}
                        onChange={onInputChange}
                        {...settings.animeEpisodeFormat}
                        helpTexts={animeEpisodeFormatHelpTexts}
                        errors={[...animeEpisodeFormatErrors, ...settings.animeEpisodeFormat.errors]}
                      />
                    </FormGroup>
                  </div>
              }

              {
                advancedSettings &&
                  <FormGroup>
                    <FormLabel>Series Folder Format</FormLabel>

                    <FormInputGroup
                      type={inputTypes.TEXT}
                      name="seriesFolderFormat"
                      button={<FormInputButton onPress={this.onSeriesFolderNamingModalOpenClick}>?</FormInputButton>}
                      onChange={onInputChange}
                      {...settings.seriesFolderFormat}
                      helpTexts={['Only used when adding a new series', ...seriesFolderFormatHelpTexts]}
                      errors={[...seriesFolderFormatErrors, ...settings.seriesFolderFormat.errors]}
                    />
                  </FormGroup>
              }

              <FormGroup>
                <FormLabel>Season Folder Format</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="seasonFolderFormat"
                  button={<FormInputButton onPress={this.onSeasonFolderNamingModalOpenClick}>?</FormInputButton>}
                  onChange={onInputChange}
                  {...settings.seasonFolderFormat}
                  helpTexts={seasonFolderFormatHelpTexts}
                  errors={[...seasonFolderFormatErrors, ...settings.seasonFolderFormat.errors]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Multi-Episode Style</FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="multiEpisodeStyle"
                  helpText="Change file date on import/rescan"
                  values={multiEpisodeStyleOptions}
                  onChange={onInputChange}
                  {...settings.multiEpisodeStyle}
                />
              </FormGroup>

              {
                namingModalOptions &&
                  <NamingModal
                    isOpen={isNamingModalOpen}
                    {...namingModalOptions}
                    name="standardEpisodeFormat"
                    onInputChange={onInputChange}
                    onModalClose={this.onNamingModalClose}
                  />
              }
            </div>
        }
      </FieldSet>
    );
  }

}

Naming.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  settings: PropTypes.object.isRequired,
  hasSettings: PropTypes.bool.isRequired,
  examples: PropTypes.object.isRequired,
  examplesPopulated: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Naming;
