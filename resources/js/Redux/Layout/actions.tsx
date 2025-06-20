import { createAction } from 'redux-actions';

export const changeLangAction: any = createAction('layouts/CHANGE_LANG');

export const setSwitchToggleAction: any = createAction(
  'layouts/SWITCH_HEADER_TOGGLE'
);
export const setPopupAction: any = createAction('layouts/SET_POPUP');

export const setCheckedAction: any = createAction('layouts/SET_CHECKED');

export const setPaginationAction: any = createAction('layouts/SET_PAGINATION');

export const setCheckedIdsAction: any = createAction('layouts/SET_CHECKED_IDS');

export const initIdsAction: any = createAction('layouts/INIT_IDS');

export const checkIdsAction: any = createAction('layouts/CHECK_IDS');

export const checkAllIdsAction: any = createAction('layouts/CHECK_ALL_IDS');

export const uncheckAllIdsAction: any = createAction('layouts/UNCHECK_ALL_IDS');
