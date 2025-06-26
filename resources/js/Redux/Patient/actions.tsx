import { createAction } from 'redux-actions';

export const setPatientTab = createAction('patient/SET_TAB');

export const setFilters = createAction('patient/SET_FILTERS');

export const clearFilters = createAction('patient/CLEAR_FILTERS');
