import * as types from './actionTypes';
import systemActionHandlers from './systemActionHandlers';

export const fetchStatus = systemActionHandlers[types.FETCH_STATUS];
export const fetchHealth = systemActionHandlers[types.FETCH_HEALTH];
export const fetchDiskSpace = systemActionHandlers[types.FETCH_DISK_SPACE];
