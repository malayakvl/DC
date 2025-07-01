import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  pricing => pricing
);

export const patientTabSelector = state => state.patient.patientTab;

export const patientFiltersSelector = state => state.patient.filters;
export const patientClearFiltersSelector = state => state.patient.isClear;
export const patientServicesSelector = state => state.patient.services;
