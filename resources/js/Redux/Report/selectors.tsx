import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  report => report
);

export const unitSearchResultsSelector = state =>
  state.report.searchUnitItems;
export const sizeSearchResultsSelector = state =>
  state.report.searchSizeItems;
export const categoryPercentSelector = state => state.report.categoryPercent;
export const searchResultMaterialsQtySelector = state =>
  state.report.searchResultMaterialsQty;
export const searchResultMaterialsSelector = state =>
  state.report.searchResultMaterials;
export const reportResultSelector = state => state.report.reportResults;
