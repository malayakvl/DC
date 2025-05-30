import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  meterial => meterial
);

export const unitSearchResultsSelector = state =>
  state.meterial.searchUnitItems;
export const sizeSearchResultsSelector = state =>
  state.meterial.searchSizeItems;
export const categoryPercentSelector = state => state.meterial.categoryPercent;
export const searchResultMaterialsQtySelector = state =>
  state.meterial.searchResultMaterialsQty;
export const searchResultMaterialsSelector = state =>
  state.meterial.searchResultMaterials;
export const reportResultSelector = state => state.meterial.reportResults;
