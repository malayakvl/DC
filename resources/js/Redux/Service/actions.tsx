import { createAction } from 'redux-actions';
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";

export const setPriceItems = createAction('service/SET_PRICING_ITEMS');
export const setTotalPrice = createAction('service/SET_TOTAL_PRICE');
export const setShowTableError = createAction('service/SET_TABLE_ERRORS');

export const findServiceAction: any = createAction(
  'clinic/FIND_SERVICE_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/service/findService`, { searchName: data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);
export const fincServiceItemsAction: any = createAction(
  'clinic/FIND_SERVICE_COMPONENTS',
  async (data: any, rowIndex: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/service/findServiceItems`, { serviceId: data }, {})
        .then(async res => {
          return {
            items: res.data.items,
            rowIndex: rowIndex
          };
        });
    }
);
export const emptyServicesAutocompleteAction = createAction(
  'service/EMPTY_AUTOCOMPLETE'
);
export const emptyServicesQtyAutocompleteAction = createAction(
  'service/REMOVE_AUTOCOMPLETE_QTY'
);

export const updateServiceItemQtyAction = createAction(
  'service/UPDATE_SERVICE_ITEM_QTY',
  (rowIndex, itemIndex, qty) => ({ rowIndex, itemIndex, qty })
);