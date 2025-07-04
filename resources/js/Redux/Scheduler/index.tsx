import { handleActions } from 'redux-actions';
import {
  setSchedulePopupDoctorAction,
  showSchedulePopupAction,
  showScheduleEditPopupAction,
  setScheduleTimeAction,
  showScheduleErrorPopupAction,
  setNewPatientAction,
  setScheduleDateAction,
  setScheduleStatusAction,
  setRemoteEventsAction,
  fetchEventsAction,
  showPricePopupAction,
  setServicesAction,
  findPatientsAction,
  setSchedulePatientIdAction,
  updateSchedulerPeriodAction,
  setEditEventAction,
  setExistServicesAction,
  minusServiceAction,
  plusServiceAction,
  setPopupCabinetAction,
} from './actions';

const initialState = {
  showSchedulePopup: false,
  showScheduleEditPopup: false,
  showPricePopup: false,
  showErrorSchedulePopup: false,
  popupDoctorId: '',
  dateStart: null,
  timeStart: null,
  statusId: { name: 'planned', color: '#4c95f5' },
  newPatientData: null,
  patientId: null,
  eventsData: [],
  patientsData: [],
  services: [],
  editEvent: null,
  weekStart: new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() || 7) + 1)),
  weekEnd: new Date(new Date().setDate(new Date().getDate() + (7 - (new Date().getDay() || 7)))),
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setEditEventAction]: {
    next: (state, action) => ({
      ...state,
      editEvent: action.payload,
    }),
  },
  [showSchedulePopupAction]: {
    next: (state, action) => ({
      ...state,
      showSchedulePopup: action.payload,
    }),
  },
  [showScheduleEditPopupAction]: {
    next: (state, action) => ({
      ...state,
      showScheduleEditPopup: action.payload,
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
  [setSchedulePatientIdAction]: {
    next: (state, action) => ({
      ...state,
      patientId: action.payload,
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
      action.payload.qty = 1;
      return {
        ...state,
        services: exists
          ? state.services.filter(service => service.id !== action.payload.id) // удалить
          : [...state.services, action.payload] // добавить
      };
    },
  },
  [plusServiceAction]: {
    next: (state, action) => {
      const _s  = state.services.map(item =>
        item.id === action.payload.id ? { ...item, qty: item.qty ? item.qty + 1 : 2 } : item
      );

      return {
        ...state,
        services: _s
      };
    },
  },
  [minusServiceAction]: {
    next: (state, action) => {
      const _s =  state.services
        .map(item =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0);
      // const _s  = state.services.map(item =>
      //   item.id === action.payload.id ? { ...item, qty: item.qty ? item.qty + 1 : 2 } : item
      // );
      // console.log(_s);

      return {
        ...state,
        services: _s
      };
    },
  },
  [setExistServicesAction]: {
    next: (state, action) => {
      return {
        ...state,
        services: action.payload// добавить
      };
    },
  },
  [updateSchedulerPeriodAction]: {
    next: (state, action) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [setPopupCabinetAction]: {
    next: (state, action) => ({
      ...state,
      cabinetId: action.payload,
    }),
  },
};

export {
  showSchedulePopupAction,
  showScheduleEditPopupAction,
  setSchedulePopupDoctorAction,
  setScheduleTimeAction,
  setScheduleDateAction,
  showScheduleErrorPopupAction,
  setNewPatientAction,
  setScheduleStatusAction,
  setRemoteEventsAction,
  fetchEventsAction,
  showPricePopupAction,
  setServicesAction,
  setSchedulePatientIdAction,
  updateSchedulerPeriodAction,
  setEditEventAction,
  setExistServicesAction,
  plusServiceAction,
  minusServiceAction,
  setPopupCabinetAction
};

export default handleActions(ACTION_HANDLERS, initialState);
