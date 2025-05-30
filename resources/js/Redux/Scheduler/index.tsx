import { handleActions } from 'redux-actions';
import {
  setSchedulePopupDoctorAction,
  showSchedulePopupAction,
  setScheduleTimeAction,
  showScheduleErrorPopupAction,
  setNewPatientAction,
  setScheduleDateAction,
  setScheduleStatusAction,
  setRemoteEventsAction,
  fetchEventsAction,
} from './actions';

const initialState = {
  showSchedulePopup: false,
  showErrorSchedulePopup: false,
  popupDoctorId: '',
  dateStart: null,
  timeStart: null,
  statusId: { name: 'planned', color: '#4c95f5' },
  newPatientData: null,
  eventsData: [],
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [showSchedulePopupAction]: {
    next: (state, action) => ({
      ...state,
      showSchedulePopup: action.payload,
    }),
  },
  [showScheduleErrorPopupAction]: {
    next: (state, action) => ({
      ...state,
      showErrorSchedulePopup: action.payload,
    }),
  },
  [setSchedulePopupDoctorAction]: {
    next: (state, action) => ({
      ...state,
      popupDoctorId: action.payload,
    }),
  },
  [setScheduleTimeAction]: {
    next: (state, action) => ({
      ...state,
      timeStart: action.payload,
    }),
  },
  [setScheduleDateAction]: {
    next: (state, action) => ({
      ...state,
      dateStart: action.payload,
    }),
  },
  [setScheduleStatusAction]: {
    next: (state, action) => ({
      ...state,
      statusId: action.payload,
    }),
  },
  [setNewPatientAction]: {
    next: (state, action) => ({
      ...state,
      newPatientData: action.payload,
    }),
  },
  [fetchEventsAction]: {
    next: (state, action) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [setRemoteEventsAction]: {
    next: (state, action) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
};

export {
  showSchedulePopupAction,
  setSchedulePopupDoctorAction,
  setScheduleTimeAction,
  setScheduleDateAction,
  showScheduleErrorPopupAction,
  setNewPatientAction,
  setScheduleStatusAction,
  setRemoteEventsAction,
  fetchEventsAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
