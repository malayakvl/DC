import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  pricing => pricing
);

export const pricingItemsSelector = state => state.pricing.priceItems;
export const totalPriceItemsSelector = state => state.pricing.totalPrice;
export const tableErrorSelector = state =>
  state.incominginvoices.showTableError;
