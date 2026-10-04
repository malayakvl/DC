import { handleActions } from 'redux-actions';
import {
  setActItems,
  setShowTableError,
  updateServiceItemQtyAction,
  setFilters,
  clearFilters,
  findActItemsAction,
  updateServiceQuantityAction,
  syncAndRecalculateAct,
  setupActStoreErrorAction,
} from './actions';

const initialState = {
  actItems: [],
  actItemsError: [],
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
  isClear: false,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setActItems.toString()]: {
    next: (state, action) => ({
      ...state,
      // Додаємо новий об'єкт (або масив об'єктів) до вже існуючого масиву
      actItems: [
        ...state.actItems,
        ...(Array.isArray(action.payload) ? action.payload : [action.payload]),
      ],
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
        filterPhone: '',
      },
      isClear: true,
    }),
  },
  [setShowTableError.toString()]: {
    next: (state, action) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
  [findActItemsAction.toString()]: {
    next: (state, action) => ({
      ...state,
      actItems: [
        ...state.actItems,
        ...(Array.isArray(action.payload) ? action.payload : [action.payload]),
      ],
    }),
  },
  [setupActStoreErrorAction.toString()]: {
    next: (state, action) => ({
      ...state,
      actItemsError: action.payload,
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
            quantity: qty,
          };

          updatedItems[rowIndex] = {
            ...row,
            components: updatedComponents,
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
  findActItemsAction,
  updateServiceQuantityAction,
  syncAndRecalculateAct,
  setupActStoreErrorAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
