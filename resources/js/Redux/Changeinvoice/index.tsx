import { handleActions } from 'redux-actions';
import {
  setInvoiceItems,
  setWarehouse,
  setInvoiceCurrency,
  setShowTableError,
} from './actions';

const initialState = {
  invoiceItems: [],
  storeFromId: '',
  curreny: '',
  showTableError: false,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setInvoiceItems]: {
    next: (state, action) => ({
      ...state,
      invoiceItems: action.payload,
    }),
  },
  [setWarehouse]: {
    next: (state, action) => ({
      ...state,
      storeFromId: action.payload,
    }),
  },
  [setInvoiceCurrency]: {
    next: (state, action) => ({
      ...state,
      curreny: action.payload,
    }),
  },
  [setShowTableError]: {
    next: (state, action) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
};

export { setInvoiceItems, setWarehouse, setInvoiceCurrency, setShowTableError };

export default handleActions(ACTION_HANDLERS, initialState);
