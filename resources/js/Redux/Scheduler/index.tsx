import { handleActions } from 'redux-actions';
import { format } from 'date-fns';

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
  fetchPeriodEventsAction,
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
  setScheduleEditEventAction,
  initServicesAction,
  setScheduleDoctorIdAction,
  setScheduleAssistantIdAction,
  setScheduleStatusFilterAction,
  setTypeViewAction,
  setCalendarDateAction,
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
  viewSchedule: 'patients',
  filterTypeView: '3days',
  filterCabinetId: '',
  filterDoctorId: '',
  filterStatus: '',
  filterBaseDate: format(new Date(), 'yyyy-MM-dd'),
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setCalendarDateAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      filterBaseDate: action.payload,
    }),
  },
  [setScheduleStatusFilterAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      filterStatus: action.payload,
    }),
  },
  [setTypeViewAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      filterTypeView: action.payload,
    }),
  },
  [setEditEventAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      editEvent: action.payload,
    }),
  },
  [showSchedulePopupAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showSchedulePopup: action.payload,
    }),
  },
  [showScheduleEditPopupAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showScheduleEditPopup: action.payload,
    }),
  },
  [setScheduleEditEventAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [showPricePopupAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showPricePopup: action.payload,
    }),
  },
  [showScheduleErrorPopupAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showErrorSchedulePopup: action.payload,
    }),
  },
  [setSchedulePopupDoctorAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      popupDoctorId: action.payload,
    }),
  },
  [setScheduleTimeAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      timeStart: action.payload,
    }),
  },
  [setScheduleDateAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      dateStart: action.payload,
    }),
  },
  [setSchedulePatientIdAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      patientId: action.payload,
    }),
  },
  [setScheduleDoctorIdAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      popupDoctorId: action.payload,
    }),
  },
  [setScheduleAssistantIdAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      popupAssistantId: action.payload,
    }),
  },
  [setScheduleStatusAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      statusId: action.payload,
    }),
  },
  [setNewPatientAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      newPatientData: action.payload,
    }),
  },
  [fetchEventsAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [fetchPeriodEventsAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [findPatientsAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      patientsData: action.payload,
    }),
  },
  [setRemoteEventsAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [initServicesAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      services: Array.isArray(action.payload) ? action.payload : [],
    }),
  },
  [setServicesAction.toString()]: {
    next: (state: any, action: any) => {
      const exists = state.services.some((service: any) => service.id === action.payload.id);
      action.payload.qty = 1;
      return {
        ...state,
        services: exists
          ? state.services.filter((service: any) => service.id !== action.payload.id) // удалить
          : [...state.services, action.payload], // добавить
      };
    },
  },
  [plusServiceAction.toString()]: {
    next: (state: any, action: any) => {
      const _s = state.services.map((item: any) =>
        item.id === action.payload.id ? { ...item, qty: item.qty ? item.qty + 1 : 2 } : item
      );

      return {
        ...state,
        services: _s,
      };
    },
  },
  [minusServiceAction.toString()]: {
    next: (state: any, action: any) => {
      const _s = state.services
        .map((item: any) => (item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item: any) => item.qty > 0);
      // const _s  = state.services.map(item =>
      //   item.id === action.payload.id ? { ...item, qty: item.qty ? item.qty + 1 : 2 } : item
      // );
      // console.log(_s);

      return {
        ...state,
        services: _s,
      };
    },
  },
  [setExistServicesAction.toString()]: {
    next: (state: any, action: any) => {
      return {
        ...state,
        services: action.payload, // добавить
      };
    },
  },
  [updateSchedulerPeriodAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      eventsData: action.payload,
    }),
  },
  [setPopupCabinetAction.toString()]: {
    next: (state: any, action: any) => ({
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
  fetchPeriodEventsAction,
  showPricePopupAction,
  setServicesAction,
  setSchedulePatientIdAction,
  updateSchedulerPeriodAction,
  setEditEventAction,
  setExistServicesAction,
  plusServiceAction,
  minusServiceAction,
  setPopupCabinetAction,
  setScheduleEditEventAction,
  initServicesAction,
  setScheduleDoctorIdAction,
  setScheduleAssistantIdAction,
  setTypeViewAction,
  setScheduleStatusFilterAction,
  setCalendarDateAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
