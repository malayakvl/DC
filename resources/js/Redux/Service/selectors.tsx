import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  service => service
);

export const pricingItemsSelector = state => state.service.priceItems;
export const totalPriceItemsSelector = state => state.service.totalPrice;
export const tableErrorSelector = state =>
  state.incominginvoices.showTableError;
export const searchResultServicesSelector = state =>
  state.service.searchResultServices;
export const reportResultSelector = state => state.service.reportResults;
export const searchResultServicesElementsSelector = state =>
  state.service.searchResultElementsServices;

export const getSearchResultServicesElementsByRow = (rowIndex: number) => (state: State.Root) =>
  state.service.searchResultElementsServices[rowIndex] || [];
