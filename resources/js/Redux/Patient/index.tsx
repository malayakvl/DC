import { handleActions } from 'redux-actions';
import { setPatientTab, setFilters, clearFilters } from './actions';

const initialState = {
  patientTab: 'history',
  isClear: false,
  filters: {
    filterName: '',
    filterPhone: ''
  }
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
};

export { setPatientTab, setFilters, clearFilters };

export default handleActions(ACTION_HANDLERS, initialState);
