import { handleActions } from 'redux-actions';
import { setPatientTab, setFilters, clearFilters } from './actions';

const initialState = {
  patientTab: '',
  filters: {
    name: '',
    phone: ''
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
        name: '',
        phone: ''
      },
    }),
  },
};

export { setPatientTab, setFilters, clearFilters };

export default handleActions(ACTION_HANDLERS, initialState);
