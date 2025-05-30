import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  meterial => meterial
);

export const invoiceItemsSelector = state =>
  state.incominginvoices.invoiceItems;
export const invoiceTaxSelector = state => state.incominginvoices.invoiceTax;
export const tableErrorSelector = state =>
  state.incominginvoices.showTableError;
