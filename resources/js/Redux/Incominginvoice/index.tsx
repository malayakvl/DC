import { handleActions } from 'redux-actions';
import {
  setInvoiceItems,
  setInvoiceTax,
  setInvoiceCurrency,
  setShowTableError,
  clearFilters,
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
  [setInvoiceItems.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      invoiceItems: action.payload,
    }),
  },
  [setInvoiceTax.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      invoiceTax: action.payload,
    }),
  },
  [setInvoiceCurrency.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      curreny: action.payload,
    }),
  },
  [setShowTableError.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
};

export { setInvoiceItems, setInvoiceTax, setInvoiceCurrency, setShowTableError, clearFilters };

export default handleActions(ACTION_HANDLERS, initialState);
