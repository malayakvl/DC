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
  state.outgoinginvoices.invoiceItems;
export const invoiceTaxSelector = state => state.outgoinginvoices.invoiceTax;
export const tableErrorSelector = state =>
  state.outgoinginvoices.showTableError;
