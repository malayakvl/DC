import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { setWarehouse } from './actions';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  meterial => meterial
);

export const invoiceItemsSelector = state => state.changeinvoices.invoiceItems;
export const warehouseSelector = state => state.changeinvoices.storeFromId;
export const tableErrorSelector = state => state.changeinvoices.showTableError;
