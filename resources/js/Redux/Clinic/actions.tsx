import { createAction } from 'redux-actions';
import axios from 'axios';
// const baseUrl = `${process.env.APP_URL}`;

export const addUploadedFile = createAction('clinic/ADD_FILIAL_UPLOADED_FILE');

export const removeUploadedFile = createAction(
  'clinic/REMOVE_FILIAL_UPLOADED_FILE'
);
export const emptyUserAutocompleteAction = createAction(
  'clinic/REMOVE_USERS_AUTOCOMPLETE'
);
export const emptyProducersAutocompleteAction = createAction(
  'clinic/REMOVE_PRODUCERS_AUTOCOMPLETE'
);

export const findUserByEmailAction: any = createAction(
  'clinic/FIND_IF_USER_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/customer/findByEmail`, { searchEmail: data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);

export const findProducersAction: any = createAction(
  'clinic/FIND_PROVIDERS_EXIST',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/clinic/findProducers`, { searchName: data }, {})
        .then(async res => {
          return res.data.items;
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
