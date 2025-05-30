import { createAction } from 'redux-actions';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setInvoiceItems = createAction('invoice/SET_INVOICE_ITEMS');
export const setInvoiceTax = createAction('invoice/SET_INVOICE_TAX');
export const setInvoiceCurrency = createAction('invoice/SET_INVOICE_CURRENCY');
export const setShowTableError = createAction('invoice/SET_TABLE_ERRORS');
