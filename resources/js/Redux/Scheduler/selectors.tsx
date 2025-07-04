import { createSelector } from 'reselect';
// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
  state => state,
  scheduler => scheduler
);

export const showSchedulePopupSelector = state =>
  state.scheduler.showSchedulePopup;
export const showEditPopupSelector = state =>
  state.scheduler.showScheduleEditPopup;
export const editEventSelector = state =>
  state.scheduler.editEvent;

export const popupCabinetSelector = state => state.scheduler.cabinetId;
export const popupDoctorSelector = state => state.scheduler.popupDoctorId;
export const pricePopupSelector = state => state.scheduler.showPricePopup;
export const servicesSelector = state => state.scheduler.services;
export const popupDateSelector = state => state.scheduler.dateStart;
export const popupTimeSelector = state => state.scheduler.timeStart;
export const popupStatusSelector = state => state.scheduler.statusId;
export const newPatientDataSelector = state => state.scheduler.newPatientData;
export const eventsDataSelector = state => state.scheduler.eventsData;
export const patientsDataSelector = state => state.scheduler.patientsData;
export const patientIdSelector = state => state.scheduler.patientId;

export const cWeekStart = state => state.scheduler.weekStart;
export const cWeekEnd = state => state.scheduler.weekEnd;
