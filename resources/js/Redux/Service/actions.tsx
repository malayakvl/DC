import { createAction } from 'redux-actions';
import axios from 'axios';

export const setPriceItems: any = createAction('service/SET_PRICING_ITEMS');
export const setTotalPrice: any = createAction('service/SET_TOTAL_PRICE');
export const setShowTableError: any = createAction('service/SET_TABLE_ERRORS');

export const findServiceAction: any = createAction(
  'clinic/FIND_SERVICE_EXIST',
  async (data: any) => (): Promise<any> => {
    return axios.post(`/material/findMaterial`, { searchName: data }, {}).then(async (res) => {
      return res.data.items;
    });
  }
);
export const findServiceMaterialAction: any = createAction(
  'clinic/FIND_SERVICE_EXIST',
  async (data: any) => (): Promise<any> => {
    return axios.post(`/material/findMaterialCalc`, { searchName: data }, {}).then(async (res) => {
      return res.data.items;
    });
  }
);

export const findServiceItemsAction: any = createAction(
  'clinic/FIND_SERVICE_COMPONENTS',
  async (data: any, rowIndex: number) => (): Promise<any> => {
    return axios.post(`/service/findServiceItems`, { serviceId: data }, {}).then(async (res) => {
      return {
        items: res.data.items,
        rowIndex: rowIndex,
      };
    });
  }
);
export const emptyServicesAutocompleteAction: any = createAction('service/EMPTY_AUTOCOMPLETE');
export const emptyServicesQtyAutocompleteAction: any = createAction('service/REMOVE_AUTOCOMPLETE_QTY');

export const updateServiceItemQtyAction: any = createAction(
  'service/UPDATE_SERVICE_ITEM_QTY',
  (rowIndex: any, itemIndex: any, qty: any) => ({ rowIndex, itemIndex, qty })
);
