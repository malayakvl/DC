import { createSelector } from 'reselect';
// import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
// const rootSelector = createSelector(
//   state => state,
//   pricing => pricing
// );

export const patientTabSelector = (state: any) => state.patient.patientTab;
export const patientTreatmentTabSelector = (state: any) => state.patient.patientTreatmentTab;

export const patientFiltersSelector = (state: any) => state.patient.filters;
export const patientClearFiltersSelector = (state: any) => state.patient.isClear;
export const patientServicesSelector = (state: any) => state.patient.services;
