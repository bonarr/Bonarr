import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import settingsActionHandlers from './settingsActionHandlers';

export const toggleAdvancedSettings = createAction(types.TOGGLE_ADVANCED_SETTINGS);

export const fetchUISettings = settingsActionHandlers[types.FETCH_UI_SETTINGS];
export const saveUISettings = settingsActionHandlers[types.SAVE_UI_SETTINGS];
export const setUISettingsValue = createAction(types.SET_UI_SETTINGS_VALUE, (payload) => {
  return {
    section: 'ui',
    ...payload
  };
});

export const fetchMediaManagementSettings = settingsActionHandlers[types.FETCH_MEDIA_MANAGEMENT_SETTINGS];
export const saveMediaManagementSettings = settingsActionHandlers[types.SAVE_MEDIA_MANAGEMENT_SETTINGS];
export const setMediaManagementSettingsValue = createAction(types.SET_MEDIA_MANAGEMENT_SETTINGS_VALUE, (payload) => {
  return {
    section: 'mediaManagement',
    ...payload
  };
});

export const fetchNamingSettings = settingsActionHandlers[types.FETCH_NAMING_SETTINGS];
export const saveNamingSettings = settingsActionHandlers[types.SAVE_NAMING_SETTINGS];
export const setNamingSettingsValue = createAction(types.SET_NAMING_SETTINGS_VALUE, (payload) => {
  return {
    section: 'naming',
    ...payload
  };
});

export const fetchNamingExamples = settingsActionHandlers[types.FETCH_NAMING_EXAMPLES];

export const fetchQualityProfiles = settingsActionHandlers[types.FETCH_QUALITY_PROFILES];
export const fetchQualityProfileSchema = settingsActionHandlers[types.FETCH_QUALITY_PROFILE_SCHEMA];
export const saveQualityProfile = settingsActionHandlers[types.SAVE_QUALITY_PROFILE];
export const deleteQualityProfile = settingsActionHandlers[types.DELETE_QUALITY_PROFILE];

export const setQualityProfileValue = createAction(types.SET_QUALITY_PROFILE_VALUE, (payload) => {
  return {
    section: 'qualityProfileSchema',
    ...payload
  };
});

export const fetchDelayProfiles = settingsActionHandlers[types.FETCH_DELAY_PROFILES];
export const saveDelayProfile = settingsActionHandlers[types.SAVE_DELAY_PROFILE];
export const deleteDelayProfile = settingsActionHandlers[types.DELETE_DELAY_PROFILE];
export const reorderDelayProfile = settingsActionHandlers[types.REORDER_DELAY_PROFILE];

export const setDelayProfileValue = createAction(types.SET_DELAY_PROFILE_VALUE, (payload) => {
  return {
    section: 'delayProfiles',
    ...payload
  };
});

export const fetchQualityDefinitions = settingsActionHandlers[types.FETCH_QUALITY_DEFINITIONS];
export const saveQualityDefinitions = settingsActionHandlers[types.SAVE_QUALITY_DEFINITIONS];

export const setQualityDefinitionValue = createAction(types.SET_QUALITY_DEFINITION_VALUE);
