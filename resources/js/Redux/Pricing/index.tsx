import { handleActions } from 'redux-actions';
import { setPriceItems, setTotalPrice, setShowTableError } from './actions';

const initialState = {
  priceItems: [],
  totalPrice: 0,
  curreny: '',
  showTableError: false,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setPriceItems]: {
    next: (state, action) => ({
      ...state,
      priceItems: action.payload,
    }),
  },
  [setTotalPrice]: {
    next: (state, action) => ({
      ...state,
      totalPrice: action.payload,
    }),
  },
  [setShowTableError]: {
    next: (state, action) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
};

export { setPriceItems, setTotalPrice, setShowTableError };

export default handleActions(ACTION_HANDLERS, initialState);
