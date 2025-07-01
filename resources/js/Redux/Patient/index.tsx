import { handleActions } from 'redux-actions';
import {
  setPatientTab,
  setFilters,
  clearFilters,
  setServicesAction,
  minusServiceAction,
  plusServiceAction,
  setExistServicesAction
} from './actions';

const initialState = {
  patientTab: 'history',
  isClear: false,
  filters: {
    filterName: '',
    filterPhone: ''
  },
  services: []
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setPatientTab.toString()]: {
    next: (state, action) => ({
      ...state,
      patientTab: action.payload,
    }),
  },
  [setFilters.toString()]: {
    next: (state, action) => ({
      ...state,
      filters: action.payload,
    }),
  },
  [clearFilters.toString()]: {
    next: (state, action) => ({
      ...state,
      filters: {
        filterName: '',
        filterPhone: ''
      },
      isClear: true
    }),
  },
  [setExistServicesAction]: {
    next: (state, action) => {
      return {
        ...state,
        services: action.payload// добавить
      };
    },
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
};

export {
  setPatientTab,
  setFilters,
  clearFilters,
  setServicesAction,
  plusServiceAction,
  minusServiceAction,
  setExistServicesAction
};

export default handleActions(ACTION_HANDLERS, initialState);
