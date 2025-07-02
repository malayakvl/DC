import { createAction } from 'redux-actions';

export const setPatientTab = createAction('patient/SET_TAB');
export const setPatientSubTab = createAction('patient/SET_SUB_TAB');

export const setFilters = createAction('patient/SET_FILTERS');

export const clearFilters = createAction('patient/CLEAR_FILTERS');
export const setServicesAction = createAction('patient/SET_SERVICES');
export const setExistServicesAction = createAction('patient/SET_EXIST_SERVICES_EVENTS');
export const setSchedulePatientIdAction = createAction('patient/SET_PATIENT_ID');
export const minusServiceAction = createAction('patient/MINUS_SERVICE');
export const plusServiceAction = createAction('patient/PLUS_SERVICE');
