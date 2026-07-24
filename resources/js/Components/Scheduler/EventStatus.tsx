import React, { useState } from 'react';
import Lang from 'lang.js';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import lngScheduler from '../../Lang/Scheduler/translation';
import { setScheduleStatusAction } from '@/Redux/Scheduler';
import { SchedulerStatuses } from '@/Constants';
import { ChevronDown } from 'lucide-react';

export default function EventStatus({ defaultStatus = 'planned', defaultColor = '#4c95f5' }) {
  const dispatch = useDispatch();
  const statuses = SchedulerStatuses;
  const [eventStatus, setEventStatus] = useState({
    name: defaultStatus,
    color: defaultColor,
  });
  const [showStatus, setShowStatus] = useState(false);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });

  return (
    <div className="mb-0 relative grid justify-items-end mt-[-35px]">
      <button className="sch-status-text" onClick={() => setShowStatus(!showStatus)} type="button">
        <div
          className="sch-status"
          style={{
            background: eventStatus.color,
            borderColor: eventStatus.color,
          }}
        ></div>
        {msg.get(`scheduler.statuses.${eventStatus.name}`)}
        <ChevronDown className={'w-[16px] h-[16px] block mt-[4px] ml-[3px]'} />
      </button>

      {showStatus && (
        <div className="top-[30px] z-10 w-44 absolute scheduler-status-block">
          <ul className="scheduler-status">
            {statuses.map((status: any) => (
              <li
                key={status.name}
                className="scheduler-status-item"
                onClick={() => {
                  setShowStatus(false);
                  setEventStatus(status);
                  dispatch(setScheduleStatusAction(status));
                }}
              >
                <span className="status-dot" style={{ background: status.color }} />

                <span className="status-title">{msg.get(`scheduler.statuses.${status.name}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
