import { createAction } from 'redux-actions';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setInvoiceItems = createAction('changeinvoice/SET_INVOICE_ITEMS');
export const setWarehouse = createAction('changeinvoice/SET_WAREHOUSE');
export const setInvoiceCurrency = createAction(
  'changeinvoice/SET_INVOICE_CURRENCY'
);
export const setShowTableError = createAction('changeinvoice/SET_TABLE_ERRORS');
