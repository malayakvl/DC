import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { Scheduler } from '@aldabil/react-scheduler';
import { Button, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { RESOURCES, EVENTS } from './data';
import { useDispatch, useSelector } from 'react-redux';
import {
  showSchedulePopupAction,
  setSchedulePopupDoctorAction,
  setScheduleTimeAction,
  showScheduleErrorPopupAction,
  setScheduleDateAction,
  setRemoteEventsAction,
} from '../../Redux/Scheduler';
// import { fetchEventsAction } from "../../Redux/Scheduler/actions"
import {
  eventsDataSelector,
  showErrorPopupSelector,
  showSchedulePopupSelector,
} from '../../Redux/Scheduler/selectors';
import Modal from '../../Components/Modal/Modal';
import SchedulerFormCreate from './Form/FormPopupCreate';
import moment from 'moment';
import ModalError from '../../Components/Modal/ModalError';
import { SchedulerRef } from '@aldabil/react-scheduler/types';
import { SketchPicker } from 'react-color';

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  eventsData,
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const [mode, setMode] = useState<'default' | 'tabs'>('default');
  const [eventConverted, setEventConverted] = useState(true);
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useDispatch();
  const showSchedulePopup = useSelector(showSchedulePopupSelector);
  const showScheduleErrorPopup = useSelector(showErrorPopupSelector);
  const remoteEventsData = useSelector(eventsDataSelector);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    title: '',
    doctor_id: '',
    patient_id: '',
  });
  const closeModal = () => {
    clearErrors();
    reset();
  };
  const showSellPopup = e => {
    return;
  };

  const fetchRemote = async query => {
    const start = moment(query.start).format('YYYY-MM-DD');
    const end = moment(query.end).format('YYYY-MM-DD');
    axios
      .get(`/scheduler/fetchEvents?start=${start}&end=${end}`)
      .then(response => {
        dispatch(setRemoteEventsAction(response.data.items));
        return new Promise(res => {
          if (remoteEventsData.length > 0) {
            remoteEventsData.forEach(_event => {
              _event.start = new Date(_event.startDate);
              _event.end = new Date(_event.endDate);
            });
            setEventConverted(true);
          } else {
            setEventConverted(true);
          }
          setTimeout(() => {
            res(remoteEventsData);
          }, 3000);
        });
      })
      .catch(error => {
        console.log('ERROR:: ', error.response.data);
      });
  };

  useEffect(() => {
    eventsData = remoteEventsData;
    if (remoteEventsData.length > 0) {
      remoteEventsData.forEach(_event => {
        _event.start = new Date(_event.startDate);
        _event.end = new Date(_event.endDate);
      });
      setEventConverted(true);
    } else {
      setEventConverted(true);
    }
  }, [remoteEventsData]);

  return (
    <AuthenticatedLayout header={<Head title="Dental Care - Scheduler" />}>
      <Head title="Dental Care - Scheduler" />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('scheduler.title.list')}</h2>
                </div>
              </header>
            </section>
            <Modal show={showSchedulePopup} onClose={closeModal}>
              <SchedulerFormCreate
                formData={formData}
                clinicData={clinicData}
                customerData={customerData}
                cabinetData={cabinetData}
              />
            </Modal>
            <ModalError show={showScheduleErrorPopup} onClose={closeModal}>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {msg.get('scheduler.error.popup')}
                </span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => {
                    dispatch(showScheduleErrorPopupAction(false));
                    const element = document.getElementsByTagName('body')[0];
                    element.style.overflow = 'inherit';
                  }}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0
                                            1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10
                                            8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758
                                            3.15a1.2 1.2 0 0 1 0 1.698z"
                    />
                  </svg>
                </span>
              </div>
            </ModalError>
            {eventConverted && (
              <>
                <>
                  <div style={{ textAlign: 'center' }}>
                    <span>{msg.get('scheduler.calendar.view')}: </span>
                    <Button
                      color={mode === 'default' ? 'primary' : 'inherit'}
                      variant={mode === 'default' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => {
                        setMode('default');
                        calendarRef.current?.scheduler?.handleState(
                          'default',
                          'resourceViewMode'
                        );
                      }}
                    >
                      {msg.get('scheduler.calendar.tabdefault')}
                    </Button>
                    <Button
                      color={mode === 'tabs' ? 'primary' : 'inherit'}
                      variant={mode === 'tabs' ? 'contained' : 'text'}
                      size="small"
                      onClick={() => {
                        setMode('tabs');
                        console.log('Tabs');
                        calendarRef.current?.scheduler?.handleState(
                          'tabs',
                          'resourceViewMode'
                        );
                      }}
                    >
                      {msg.get('scheduler.calendar.tabds')}
                    </Button>
                  </div>
                </>
                <Scheduler
                  ref={calendarRef}
                  events={remoteEventsData}
                  resources={customerData}
                  hourFormat={12}
                  resourceFields={{
                    idField: 'id',
                    textField: 'name',
                    subTextField: 'phone',
                    avatarField: 'avatar',
                    colorField: 'color',
                  }}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5],
                    weekStartOn: 1,
                    startHour: 9,
                    endHour: 19,
                    step: 30,
                    cellRenderer: ({
                      height,
                      start,
                      onCellClick,
                      ...props
                    }) => {
                      // Fake some condition up
                      const hour = start.getHours();
                      const disabled = hour === 8;
                      const restProps = disabled ? {} : props;
                      return (
                        <Button
                          style={{
                            height: '100%',
                            background: disabled ? '#eee' : 'transparent',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                          }}
                          onClick={event => {
                            if (disabled) {
                              return alert('Opss');
                            }
                            return showSellPopup(event);
                          }}
                          disableRipple={disabled}
                          {...restProps}
                        ></Button>
                      );
                    },
                  }}
                  eventRenderer={({ event, ...props }) => {
                    return (
                      <div
                        onMouseOver={() => console.log(1)}
                        style={{
                          display: 'inherit',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: '100%',
                          background: event.color,
                          position: 'relative',
                        }}
                        {...props}
                      >
                        {calendarRef.current?.scheduler.view === 'day' && (
                          <div style={{ height: 20, fontSize: '12px' }}>
                            {event.event_time_from} - {event.event_time_to}
                          </div>
                        )}
                        {calendarRef.current?.scheduler.view === 'month' && (
                          <div style={{ height: 20, fontSize: '12px' }}>
                            Month
                          </div>
                        )}
                        <div
                          className="schedule-status-circle rounded-full"
                          style={{ backgroundColor: event.status_color }}
                        />

                        <div style={{ fontSize: '12px' }}>
                          {event.title} &nbsp;[{event.cabinet_name}]
                        </div>
                        <div style={{ height: 20, fontSize: '12px' }}>
                          {msg.get('scheduler.patient')}:
                          <b>
                            &nbsp;{event.first_name} {event.last_name}
                          </b>
                        </div>
                      </div>
                    );
                    // if (event.id === 35) {
                    //     return (
                    //         <div
                    //             style={{
                    //                 display: "flex",
                    //                 flexDirection: "column",
                    //                 justifyContent: "space-between",
                    //                 height: "100%",
                    //                 background: "#757575",
                    //             }}
                    //             {...props}
                    //         >
                    //             <div
                    //                 style={{ height: 20, background: "#ffffffb5", color: "black" }}
                    //             >
                    //                 {event.start.toLocaleTimeString("en-US", {
                    //                     timeStyle: "short",
                    //                 })}
                    //             </div>
                    //             <div>!!{event.title}!!</div>
                    //             <div
                    //                 style={{ height: 20, background: "#ffffffb5", color: "black" }}
                    //             >
                    //                 {event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
                    //             </div>
                    //         </div>
                    //     );
                    // }
                    // return null;
                  }}
                  onEventClick={event => {
                    console.log('Event data', event);
                    dispatch(showSchedulePopupAction(true));
                  }}
                  onCellClick={(
                    start: Date,
                    end: Date,
                    resourceKey?: string,
                    resourceVal?: string
                  ) => {
                    console.log(moment(start).isBefore(moment()));
                    if (!moment(start).isAfter(moment())) {
                      dispatch(showScheduleErrorPopupAction(true));
                    } else {
                      console.log(moment(start).format('HH:mm'));
                      dispatch(setSchedulePopupDoctorAction(resourceVal));
                      dispatch(
                        setScheduleDateAction(
                          moment(start).format('YYYY-MM-DD')
                        )
                      );
                      // dispatch(setScheduleTimeAction(moment(start).format('HH:mm')));
                      dispatch(setScheduleTimeAction(start));
                      dispatch(showSchedulePopupAction(true));
                    }
                  }}
                  getRemoteEvents={fetchRemote}
                  translations={{
                    navigation: {
                      month: msg.get('scheduler.month'),
                      week: msg.get('scheduler.week'),
                      day: msg.get('scheduler.day'),
                      today: msg.get('scheduler.today'),
                      agenda: msg.get('scheduler.agenda'),
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
