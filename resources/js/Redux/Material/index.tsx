import { handleActions } from 'redux-actions';
import {
  findUnitAction,
  findSizeAction,
  findPercentAction,
  findMaterialQtyAction,
  generateStoreReportAction,
  findMaterialAction,
  setPercentAction,
  emptyUnitAction,
  emptySizeAction,
  emptyMaterialsAutocompleteAction,
  emptyMaterialsQtyAutocompleteAction,
  emptyStoreReportAction,
} from './actions';
import { emptyUserAutocompleteAction } from '../Clinic';

const initialState = {
  searchUnitItems: [],
  searchSizeItems: [],
  searchResultMaterialsQty: [],
  searchResultMaterials: [],
  searchItems: [],
  categoryPercent: 0,
  reportResults: {},
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [findUnitAction]: {
    next: (state, action) => ({
      ...state,
      searchUnitItems: action.payload,
    }),
  },
  [emptyUnitAction]: {
    next: (state, action) => ({
      ...state,
      searchUnitItems: [],
    }),
  },
  [findSizeAction]: {
    next: (state, action) => ({
      ...state,
      searchSizeItems: action.payload,
    }),
  },
  [emptySizeAction]: {
    next: (state, action) => ({
      ...state,
      searchSizeItems: [],
    }),
  },
  [findPercentAction]: {
    next: (state, action) => ({
      ...state,
      categoryPercent: action.payload,
    }),
  },
  [setPercentAction]: {
    next: (state, action) => ({
      ...state,
      categoryPercent: action.payload,
    }),
  },
  [findMaterialQtyAction]: {
    next: (state, action) => ({
      ...state,
      searchResultMaterialsQty: action.payload,
    }),
  },
  [generateStoreReportAction]: {
    next: (state, action) => ({
      ...state,
      reportResults: action.payload,
    }),
  },
  [emptyStoreReportAction]: {
    next: (state, action) => ({
      ...state,
      reportResults: action.payload || {},
    }),
  },
  [findMaterialAction]: {
    next: (state, action) => ({
      ...state,
      searchResultMaterials: action.payload,
    }),
  },
  [emptyMaterialsAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchResultMaterials: [],
    }),
  },
  [emptyMaterialsQtyAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchResultMaterialsQty: [],
    }),
  },
};

export {
  findUnitAction,
  emptyUnitAction,
  findSizeAction,
  emptySizeAction,
  findPercentAction,
  setPercentAction,
  findMaterialQtyAction,
  generateStoreReportAction,
  findMaterialAction,
  emptyMaterialsAutocompleteAction,
  emptyStoreReportAction,
};

export default handleActions(ACTION_HANDLERS, initialState);
