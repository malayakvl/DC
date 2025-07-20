import { handleActions } from 'redux-actions';
// import { addUploadedFile } from "@/Redux/Clinic/actions.tsx";
import {
  addUploadedFile,
  emptyUserAutocompleteAction,
  emptyProducersAutocompleteAction,
  emptyMaterialsAutocompleteAction,
  findUserByEmailAction,
  findProducersAction,
  findMaterialAction,
} from './actions';

const initialState = {
  appLng: 'uk',
  uploadedFiles: [],
  searchItems: [],
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [addUploadedFile]: {
    next: (state, action) => ({
      ...state,
      uploadedFiles: [...state.uploadedFiles, action.payload],
    }),
  },
  [findUserByEmailAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: action.payload,
    }),
  },
  [findProducersAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: action.payload,
    }),
  },
  [findMaterialAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: action.payload,
    }),
  },
  [emptyUserAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: [],
    }),
  },
  [emptyProducersAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: [],
    }),
  },
  [emptyMaterialsAutocompleteAction]: {
    next: (state, action) => ({
      ...state,
      searchItems: [],
    }),
  },
};

export {
  addUploadedFile,
  findUserByEmailAction,
  findProducersAction,
  emptyUserAutocompleteAction,
  emptyProducersAutocompleteAction,
  emptyMaterialsAutocompleteAction
};

export default handleActions(ACTION_HANDLERS, initialState);
