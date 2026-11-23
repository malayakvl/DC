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
  findServiceMaterialCalcAction
} from './actions';

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
  [findUnitAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      searchUnitItems: action.payload,
    }),
  },
  [emptyUnitAction.toString()]: {
    next: (state: any) => ({
      ...state,
      searchUnitItems: [],
    }),
  },
  [findSizeAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      searchSizeItems: action.payload,
    }),
  },
  [emptySizeAction.toString()]: {
    next: (state: any) => ({
      ...state,
      searchSizeItems: [],
    }),
  },
  [findPercentAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      categoryPercent: action.payload,
    }),
  },
  [setPercentAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      categoryPercent: action.payload,
    }),
  },
  [findMaterialQtyAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      searchResultMaterialsQty: action.payload,
    }),
  },
  [generateStoreReportAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      reportResults: action.payload,
    }),
  },
  [emptyStoreReportAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      reportResults: action.payload || {},
    }),
  },
  [findMaterialAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      searchResultMaterials: action.payload,
    }),
  },
  [findServiceMaterialCalcAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      searchResultMaterials: action.payload,
    }),
  },
  [emptyMaterialsAutocompleteAction.toString()]: {
    next: (state: any) => ({
      ...state,
      searchResultMaterials: [],
    }),
  },
  [emptyMaterialsQtyAutocompleteAction.toString()]: {
    next: (state: any) => ({
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
  findServiceMaterialCalcAction
};

export default handleActions(ACTION_HANDLERS, initialState);
