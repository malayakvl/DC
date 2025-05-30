import { createAction } from 'redux-actions';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setPriceItems = createAction('pricing/SET_PRICING_ITEMS');
export const setTotalPrice = createAction('pricing/SET_TOTAL_PRICE');
export const setShowTableError = createAction('pricing/SET_TABLE_ERRORS');
