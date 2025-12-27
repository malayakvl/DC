import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  act => act
);

export const actItemsSelector = state =>
  state.act.invoiceItems;
export const invoiceTaxSelector = state => state.act.invoiceTax;
export const tableErrorSelector = state =>
  state.act.showTableError;
