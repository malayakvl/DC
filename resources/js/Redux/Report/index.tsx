import { handleActions } from 'redux-actions';
import {
  generateBalanceReportAction,
  emptyBalanceReportAction,
} from './actions';
import { findMaterialQtyAction } from '../Material/actions';

const initialState = {
  reportResults: [],
  searchResultMaterialsQty: [],
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [generateBalanceReportAction]: {
    next: (state, action) => ({
      ...state,
      reportResults: action.payload,
    }),
  },
  [emptyBalanceReportAction]: {
    next: (state, action) => ({
      ...state,
      reportResults: [],
    }),
  },
};

export {
  generateBalanceReportAction,
  findMaterialQtyAction,
  emptyBalanceReportAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
