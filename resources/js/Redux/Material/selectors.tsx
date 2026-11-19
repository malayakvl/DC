// import { createSelector } from 'reselect';
// import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
// const rootSelector = createSelector(
//   state => state,
//   meterial => meterial
// );

export const unitSearchResultsSelector = (state: any) => state.meterial.searchUnitItems;
export const sizeSearchResultsSelector = (state: any) => state.meterial.searchSizeItems;
export const categoryPercentSelector = (state: any) => state.meterial.categoryPercent;
export const searchResultMaterialsQtySelector = (state: any) => state.meterial.searchResultMaterialsQty;
export const searchResultMaterialsSelector = (state: any) => state.meterial.searchResultMaterials;
export const reportResultSelector = (state: any) => state.meterial.reportResults;
