import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  clinic => clinic
);

export const uploadedFilesSelector = state => state.clinic.uploadedFiles;
export const userSearchResultsSelector = state => state.clinic.searchItems;

// export const uploadedFilesSelector = createSelector(
//     rootSelector,
//     (clinic) => clinic
// );
