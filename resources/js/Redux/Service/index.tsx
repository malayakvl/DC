import { handleActions } from 'redux-actions';
import { 
  setPriceItems, 
  setTotalPrice, 
  setShowTableError, 
  findServiceAction,
  emptyServicesAutocompleteAction,
  emptyServicesQtyAutocompleteAction,
  fincServiceItemsAction,
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
  [findServiceAction]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: action.payload,
    }),
  },
  [fincServiceItemsAction]: {
    next: (state, action) => ({
      ...state,
      searchResultElementsServices: {
        ...state.searchResultElementsServices,
        [action.payload.rowIndex]: action.payload.items, // Store service items for specific row
      },
    }),
  },
  [emptyServicesAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: [],
    }),
  },
  [emptyServicesQtyAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchResultServices: [],
    }),
  },
  
  [updateServiceItemQtyAction]: {
    next: (state, action) => {
      const { rowIndex, itemIndex, quantity } = action.payload;

      const currentServiceItems = state.searchResultElementsServices[rowIndex] || [];

      const updatedElements = currentServiceItems.map((item, idx) =>
        idx === itemIndex
          ? { ...item, quantity }   // 👈 новый объект
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
  [updateServiceItemQtyAction]: { 
    next: (state, action) => {
      const { rowIndex, itemIndex, quantity } = action.payload;

      const currentServiceItems = state.searchResultElementsServices[rowIndex] || [];
      const currentServiceItem = state.searchResultElementsServices[rowIndex] || [];
console.log(currentServiceItem)
      const updatedElements = currentServiceItems.map((item, idx) =>
        idx === itemIndex
          ? { ...item, quantity }   // 👈 новый объект
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
  fincServiceItemsAction,
  updateServiceItemQtyAction
};

export default handleActions(ACTION_HANDLERS, initialState);
