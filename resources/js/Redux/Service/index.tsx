import { handleActions } from 'redux-actions';
import {
  setPriceItems,
  setTotalPrice,
  setShowTableError,
  findServiceAction,
  emptyServicesAutocompleteAction,
  emptyServicesQtyAutocompleteAction,
  findServiceItemsAction,
  updateServiceItemQtyAction
} from './actions';

const initialState = {
  priceItems: [],
  totalPrice: 0,
  curreny: '',
  showTableError: false,
  searchResultServices: [],
  searchResultElementsServices: {}, // Object with row index as key and service items array as value
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [setPriceItems.toString()]: {
    next: (state, action) => ({
      ...state,
      priceItems: action.payload,
    }),
  },
  [setTotalPrice.toString()]: {
    next: (state, action) => ({
      ...state,
      totalPrice: action.payload,
    }),
  },
  [setShowTableError.toString()]: {
    next: (state, action) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
  [findServiceAction.toString()]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: action.payload,
    }),
  },
  [findServiceItemsAction.toString()]: {
    next: (state, action) => ({
      ...state,
      searchResultElementsServices: {
        ...state.searchResultElementsServices,
        [action.payload.rowIndex]: action.payload.items, // Store service items for specific row
      },
    }),
  },
  [emptyServicesAutocompleteAction.toString()]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: [],
    }),
  },
  [emptyServicesQtyAutocompleteAction.toString()]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: [],
    }),
  },

  [updateServiceItemQtyAction.toString()]: {
    next: (state, action) => {
      const { rowIndex, itemIndex, qty } = action.payload;

      const currentServiceItems = state.searchResultElementsServices[rowIndex] || [];

      const updatedElements = currentServiceItems.map((item, idx) =>
        idx === itemIndex
          ? { ...item, quantity: qty }   // Store as quantity in state if that's what the UI expects
          : item
      );

      return {
        ...state,
        searchResultElementsServices: {
          ...state.searchResultElementsServices,
          [rowIndex]: updatedElements,
        },
      };
    },
  },
};

export {
  setPriceItems,
  setTotalPrice,
  setShowTableError,
  findServiceAction,
  emptyServicesAutocompleteAction,
  findServiceItemsAction,
  updateServiceItemQtyAction
};

export default handleActions(ACTION_HANDLERS, initialState);
