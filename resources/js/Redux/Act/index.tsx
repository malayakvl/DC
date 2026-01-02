import { handleActions } from 'redux-actions';
import {
  setActItems,
  setShowTableError,
  updateServiceItemQtyAction,
  setFilters,
  clearFilters
} from './actions';

const initialState = {
  invoiceItems: [],
  invoiceTax: '',
  curreny: '',
  showTableError: false,
  searchResultServices: [],
  searchResultElementsServices: {}, // Object with row index as key and service items array as value
  filters: {
    filterName: '',
    filterAmount: '',
    filterDateFrom: '',
    filterDateTo: '',
    filterStatus: '',
  },
  isClear: false
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setActItems.toString()]: {
    next: (state, action) => ({
      ...state,
      invoiceItems: action.payload,
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
  [setShowTableError.toString()]: {
    next: (state, action) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
  [updateServiceItemQtyAction.toString()]: {
    next: (state, action) => {
      const { rowIndex, itemIndex, qty } = action.payload;
      const updatedItems = [...state.invoiceItems];

      if (rowIndex >= 0 && rowIndex < updatedItems.length) {
        const row = updatedItems[rowIndex];
        if (row.components && row.components.length > itemIndex) {
          const updatedComponents = [...row.components];
          updatedComponents[itemIndex] = {
            ...updatedComponents[itemIndex],
            quantity: qty
          };

          updatedItems[rowIndex] = {
            ...row,
            components: updatedComponents
          };
        }
      }

      return {
        ...state,
        invoiceItems: updatedItems,
      };
    },
  },
};

export {
  setActItems,
  setShowTableError,
  updateServiceItemQtyAction,
  setFilters,
  clearFilters,

};

export default handleActions(ACTION_HANDLERS, initialState);
