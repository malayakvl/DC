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
  showPricePopupAction,
  setServicesAction, findPatientsAction,
} from './actions';

const initialState = {
  showSchedulePopup: false,
  showPricePopup: false,
  showErrorSchedulePopup: false,
  popupDoctorId: '',
  dateStart: null,
  timeStart: null,
  statusId: { name: 'planned', color: '#4c95f5' },
  newPatientData: null,
  eventsData: [],
  patientsData: [],
  services: [],
  weekStart: new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() || 7) + 1)),
  weekEnd: new Date(new Date().setDate(new Date().getDate() + (7 - (new Date().getDay() || 7)))),
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
  [showPricePopupAction]: {
    next: (state, action) => ({
      ...state,
      showPricePopup: action.payload,
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
  [findPatientsAction]: {
    next: (state, action) => ({
      ...state,
      patientsData: action.payload,
    }),
  },
  [setRemoteEventsAction]: {
    next: (state, action) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [setServicesAction]: {
    next: (state, action) => {
      const exists = state.services.some(service => service.id === action.payload.id);

      return {
        ...state,
        services: exists
          ? state.services.filter(service => service.id !== action.payload.id) // удалить
          : [...state.services, action.payload] // добавить
      };
    },
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
  showPricePopupAction,
  setServicesAction
};

export default handleActions(ACTION_HANDLERS, initialState);
