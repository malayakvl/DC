import { handleActions } from 'redux-actions';
import {
  setInvoiceItems,
  setInvoiceTax,
  setInvoiceCurrency,
  setShowTableError,
} from './actions';

const initialState = {
  invoiceItems: [],
  invoiceTax: '',
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
  [setInvoiceTax]: {
    next: (state, action) => ({
      ...state,
      invoiceTax: action.payload,
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

export {
  setInvoiceItems,
  setInvoiceTax,
  setInvoiceCurrency,
  setShowTableError,
};

export default handleActions(ACTION_HANDLERS, initialState);
