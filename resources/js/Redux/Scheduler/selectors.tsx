export const schedulerViewSelector = (state: any) => state.scheduler.filterTypeView;
export const schedulerStatusSelector = (state: any) => state.scheduler.filterStatus;
export const schedulerCabinetFilterSelector = (state: any) => state.scheduler.filterCabinetId;
export const schedulerDoctorFilterSelector = (state: any) => state.scheduler.filterDoctorId;
export const schedulerBaseDateSelector = (state: any) => state.scheduler.filterBaseDate;
export const showSchedulePopupSelector = (state: any) => state.scheduler.showSchedulePopup;
export const showEditPopupSelector = (state: any) => state.scheduler.showScheduleEditPopup;
export const editEventSelector = (state: any) => state.scheduler.editEvent;

export const popupCabinetSelector = (state: any) => state.scheduler.cabinetId;
export const popupDoctorSelector = (state: any) => state.scheduler.popupDoctorId;
export const popupAssistantSelector = (state: any) => state.scheduler.popupAssistantId;
export const pricePopupSelector = (state: any) => state.scheduler.showPricePopup;
export const servicesSelector = (state: any) => state.scheduler.services;
export const popupDateSelector = (state: any) => state.scheduler.dateStart;
export const popupTimeSelector = (state: any) => state.scheduler.timeStart;
export const popupStatusSelector = (state: any) => state.scheduler.statusId;
export const newPatientDataSelector = (state: any) => state.scheduler.newPatientData;
export const eventsDataSelector = (state: any) => state.scheduler.eventsData;
export const patientsDataSelector = (state: any) => state.scheduler.patientsData;
export const patientIdSelector = (state: any) => state.scheduler.patientId;

export const cWeekStart = (state: any) => state.scheduler.weekStart;
export const cWeekEnd = (state: any) => state.scheduler.weekEnd;

export const viewScheduleSelector = (state: any) => state.scheduler.viewSchedule;
