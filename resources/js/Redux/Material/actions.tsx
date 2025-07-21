import { createAction } from 'redux-actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const emptyUnitAction = createAction(
  'material/REMOVE_UNIT_AUTOCOMPLETE'
);
export const emptySizeAction = createAction(
  'material/REMOVE_SIZE_AUTOCOMPLETE'
);
export const setPercentAction = createAction('material/SET_PERCENT');
export const emptyMaterialsAutocompleteAction = createAction(
  'material/REMOVE_AUTOCOMPLETE'
);
export const emptyMaterialsQtyAutocompleteAction = createAction(
  'material/REMOVE_AUTOCOMPLETE_QTY'
);
export const emptyStoreReportAction = createAction('material/CLEAR_REPORT');

export const findUnitAction: any = createAction(
  'material/FIND_UNIT_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/material/findByUnit`, { searchName: data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);
export const findSizeAction: any = createAction(
  'material/FIND_SIZE_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/material/findBySize`, { searchName: data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);
export const findPercentAction: any = createAction(
  'material/FIND_PERCENT_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      // const dispatch = useDispatch();
      return axios
        .post(`/material/findPercent`, { searchId: data }, {})
        .then(async res => {
          return res.data.percent;
        });
    }
);
export const findMaterialAction: any = createAction(
  'clinic/FIND_MATERIAL_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/material/findMaterial`, { searchName: data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);

export const findMaterialQtyAction: any = createAction(
  'clinic/FIND_MATERIAL_QTY_EXIST',
  async (data: any, storeId: number) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(
          `/material/findStoreMaterial`,
          { searchName: data, storeId: storeId },
          {}
        )
        .then(async res => {
          return res.data.items;
        });
    }
);
export const generateStoreReportAction: any = createAction(
  'material/FIND_UNIT_EXIST',
  async (storeId: any, reportDate: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/material/generateStoreReport`, { storeId: storeId, reportDate: reportDate }, {})
        .then(async res => {
          return res.data.results;
        });
    }
);
