import { handleActions } from 'redux-actions';
import { setPatientTab } from './actions';

const initialState = {
  patientTab: '',
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
};

export { setPatientTab };

export default handleActions(ACTION_HANDLERS, initialState);
