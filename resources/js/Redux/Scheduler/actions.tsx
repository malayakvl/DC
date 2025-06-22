import { createAction } from 'redux-actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const showSchedulePopupAction = createAction('schedule/SHOW_POPUP');
export const showPricePopupAction = createAction('schedule/SHOW_PRICE_POPUP');

export const showScheduleErrorPopupAction = createAction(
  'schedule/SHOW_ERROR_POPUP'
);
export const setSchedulePopupDoctorAction = createAction(
  'schedule/SETUP_DOCTOR'
);
export const setScheduleTimeAction = createAction('schedule/SETUP_TIME');
export const setScheduleDateAction = createAction('schedule/SETUP_DATE');
export const setScheduleStatusAction = createAction('schedule/SETUP_STATUS');
export const setNewPatientAction = createAction('schedule/SETUP_NEW_PATIENT');
export const setRemoteEventsAction = createAction('schedule/SET_REMOTE EVENTS');
export const setServicesAction = createAction('schedule/SET_SERVICES_EVENTS');
export const setSchedulePatientIdAction = createAction('schedule/SET_PATIENT_ID');

export const fetchEventsAction: any = createAction(
  'scheduler/FIND_EVENTS',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(
          `/scheduler/fetchEvents`,
          { start: data.start, end: data.end },
          {}
        )
        .then(async res => {
          return res.data.items;
        });
    }
);
export const findPatientsAction: any = createAction(
  'scheduler/FIND_PATIENTS',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .get(`/scheduler/findPatients?strFind=${data}`,
        )
        .then(async res => {
          return res.data.items;
        });
    }
);