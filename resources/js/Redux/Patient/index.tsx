import { handleActions } from 'redux-actions';
import {
  setPatientTab,
  setTreatmentsTab,
  setFilters,
  clearFilters,
  setServicesAction,
  minusServiceAction,
  plusServiceAction,
  setExistServicesAction,
} from './actions';

const initialState = {
  patientTab: 'medic_data',
  patientTreatmentTab: 'all',
  isClear: false,
  filters: {
    filterName: '',
    filterPhone: '',
  },
  services: [],
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setPatientTab.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      patientTab: action.payload,
    }),
  },
  [setTreatmentsTab.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      patientTreatmentTab: action.payload,
    }),
  },
  [setFilters.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      filters: action.payload,
    }),
  },
  [clearFilters.toString()]: {
    next: (state: any) => ({
      ...state,
      filters: {
        filterName: '',
        filterPhone: '',
      },
      isClear: true,
    }),
  },
  [setExistServicesAction.toString()]: {
    next: (state: any, action: any) => {
      return {
        ...state,
        services: action.payload, // добавить
      };
    },
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

      return {
        ...state,
        services: _s,
      };
    },
  },
};

export {
  setPatientTab,
  setTreatmentsTab,
  setFilters,
  clearFilters,
  setServicesAction,
  plusServiceAction,
  minusServiceAction,
  setExistServicesAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
