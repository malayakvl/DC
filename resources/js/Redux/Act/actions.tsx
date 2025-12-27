import { createAction } from 'redux-actions';
import axios from 'axios';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setActItems = createAction('act/SET_ACT_ITEMS');
export const setActTax = createAction('act/SET_INVOICE_TAX');
export const setActCurrency = createAction('act/SET_INVOICE_CURRENCY');
export const setShowTableError = createAction('act/SET_TABLE_ERRORS');
export const updateServiceItemQtyAction = createAction(
  'act/UPDATE_SERVICE_ITEM_QTY',
  (rowIndex, itemIndex, qty) => ({ rowIndex, itemIndex, qty })
);