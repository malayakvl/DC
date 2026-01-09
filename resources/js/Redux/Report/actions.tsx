import { createAction } from 'redux-actions';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const emptyBalanceReportAction: any = createAction('report/CLEAR_REPORT');

export const generateBalanceReportAction: any = createAction(
  'report/GENERATE_BALANCE_REPORT',
  async (data: any) =>
    (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
      const state = getState();
      return axios
        .post(`/report/generateBalanceReport`, { data }, {})
        .then(async res => {
          return res.data.items;
        });
    }
);
