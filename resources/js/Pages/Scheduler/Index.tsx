import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types'
import Select from "react-select";
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Calendar, dateFnsLocalizer, Views, Navigate, DateLocalizer } from 'react-big-calendar';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import * as dates from 'date-arithmetic'
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Head } from '@inertiajs/react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { uk } from 'date-fns/locale';
import {
  setScheduleDateAction,
  setScheduleTimeAction,
  showPricePopupAction,
  showSchedulePopupAction,
  updateSchedulerPeriodAction
} from '../../Redux/Scheduler';
import SchedulerFormCreate from './Form/FormPopupCreate';
import { showOverlayAction } from '../../Redux/Layout';
import Pricing from './Pricing';
import { eventsDataSelector, pricePopupSelector, showSchedulePopupSelector } from '../../Redux/Scheduler/selectors';
import dayjs from 'dayjs';
import SecondaryButton from '../../Components/Form/SecondaryButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const locales = {
  'uk': uk,
};
const localizerFn = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: uk }),
  getDay,
  locales,
});
const minTime = new Date();
minTime.setHours(8, 0, 0, 0); // 8:00
const maxTime = new Date();
maxTime.setHours(20, 0, 0, 0); // 20:00

const DnDCalendar = withDragAndDrop(Calendar);
const customStyles = {
  group: (provided) => ({
    ...provided,
    borderBottom: '2px solid #e0e0e0',
    padding: '10px 0',
  }),
  groupHeading: (provided) => ({
    ...provided,
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#5b28e3',
    textTransform: 'uppercase',
    fontFamily: 'Manrope, sans-serif', // Шрифт для выбранного значения
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontFamily: 'Manrope, sans-serif', // Шрифт для выбранного значения
  }),
  control: (provided) => ({
    ...provided,
    fontSize: '12px',
    fontFamily: 'Manrope, sans-serif', // Шрифт для выбранного значения
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px', // Размер шрифта для выбранного значения
    fontFamily: 'Manrope, sans-serif', // Шрифт для выбранного значения
    color: '#333',
  }),
};

function MyWeek({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={30}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}
MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}
MyWeek.range = (date, { localizer }) => {
  const start = date;
  const end = dates.add(start, 2, 'day')

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}
MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}
MyWeek.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`
}

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  customerGroupped,
  cabinetGroupped,
  eventsData,
  currency,
  categoriesData,
  tree,
  services
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dispatch = useDispatch();
  const shBtnsTitles = {
    today: msg.get('scheduler.today'),
    previous: msg.get('scheduler.prev'),
    next: msg.get('scheduler.next'),
    month: msg.get('scheduler.month'),
    week: msg.get('scheduler.week'),
    day: msg.get('scheduler.day'),
    agenda: msg.get('scheduler.agenda'),
  }

  const shEvents = useSelector(eventsDataSelector);
  const [events, setEvents] = useState({
    all: []
  });
  const [filteredEvents, setFilteredEvents] = useState({all: []});
  const [activePerson, setActivePerson] = useState('all');
  const [selectedCabinet, setSelectedCabinet] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const showPrice = useSelector(pricePopupSelector);
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const getCurrentWeekRange = () => {
    const now = new Date(); // Динамическое текущее время
    const dayOfWeek = now.getDay(); // 0 (воскресенье) - 6 (суббота)
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Расстояние до понедельника

    // Начало недели (понедельник)
    const start = new Date(now);
    start.setDate(now.getDate() - diffToMonday);
    start.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00:00

    // Конец недели (воскресенье)
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999); // Устанавливаем время на 23:59:59.999

    return { start, end };
  };
  const [dateRange, setDateRange] = useState(getCurrentWeekRange());
  const [selectedGCabinet, setSelectedGCabinet] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2025, 5, 23),
      views: {
        day: true,
        week: MyWeek,
      },
    }),
    []
  )
  useEffect(() => {
    if (shEvents.length) {
      const _perfEvents = [];
      shEvents.forEach(_event => {
        _event.start = new Date(
          parseInt(_event.year),
          parseInt(_event.month) - 1,
          parseInt(_event.day), parseInt(_event.hour_from), parseInt(_event.minute_from), 0);
        _event.end = new Date(
          parseInt(_event.year),
          parseInt(_event.month) - 1,
          parseInt(_event.day), parseInt(_event.hour_to), parseInt(_event.minute_to), 0);
      });
    }
    let filteredEvents;
    filteredEvents = {
      all: shEvents
    };

    setFilteredEvents(filteredEvents)
  }, [shEvents])

  useEffect(() => {
    if (eventsData.length) {
      const _perfEvents = [];
      eventsData.forEach(_event => {
        _event.start = new Date(
          parseInt(_event.year),
          parseInt(_event.month) - 1,
          parseInt(_event.day), parseInt(_event.hour_from), parseInt(_event.minute_from), 0);
        _event.end = new Date(
          parseInt(_event.year),
          parseInt(_event.month) - 1,
          parseInt(_event.day), parseInt(_event.hour_to), parseInt(_event.minute_to), 0);
        _event.desc = 'Some description'
      });
    }
    let filteredEvents;
    filteredEvents = {
      all: eventsData
    };
    setFilteredEvents(filteredEvents)
  }, [eventsData])

  const filterByCabinets = (cabinetId) => {
    let filteredEvents;
    if (selectedCabinet !== cabinetId && cabinetId !== 'all') {
      filteredEvents = {
        all: events.all.filter(event => event.cabinet_id === cabinetId)
      };
    } else {
      filteredEvents = {
        all: events.all
      }
    }
    setSelectedCabinet(cabinetId);
    setFilteredEvents(filteredEvents)
  };
  const filterByPerson = (cabinetId) => {
    let filteredEvents;
    if (selectedCabinet !== cabinetId && cabinetId !== 'all') {
      filteredEvents = {
        all: events.all.filter(event => event.cabinet_id === cabinetId)
      };
    } else {
      filteredEvents = {
        all: events.all
      }
    }
    setSelectedCabinet(cabinetId);
    setFilteredEvents(filteredEvents)
  };
  const shortenName = (fullName) => {
    if (!fullName || typeof fullName !== "string") {
      return "Неправильний формат імені";
    }

    const parts = fullName.trim().split(" ");
    if (parts.length < 2) {
      return "Потрібно щонайменше прізвище та ім'я";
    }

    const [lastName, firstName, middleName] = parts;
    let result = `${lastName} ${firstName[0]}.`;
    if (middleName) {
      result += `${middleName[0]}.`;
    }

    return result;
  }

  /**************************/
  /****** EVENTS ACTIONS */
  /**************************/
  const moveEvent = ({ event, start, end, allDay }) => {
    const eventId = event.id;
    const currEvent = events.all.find(_event => _event.id === event.id)

    setFilteredEvents((prev) => ({
      ...prev,
      all: prev.all.map((ev) =>
        ev.id === eventId ? { ...ev, start: start, end: end } : ev
      )
    }));
  };
  const onEventResize = ({ event, start, end }) => {
    const eventId = event.id;
    setFilteredEvents((prev) => ({
      ...prev,
      all: prev.all.map((ev) =>
        ev.id === eventId ? { ...ev, start: start, end: end } : ev
      )
    }));
  };
  const onDropFromOutside = ({ start, allDay }) => {
    if (!draggedTask) {
      console.error('No dragged task found');
      return;
    }

    console.log('Dropping task:', draggedTask);

    const eventStart = new Date(start);
    const eventEnd = new Date(
      eventStart.getTime() + parseInt(draggedTask.duration.split(':')[0]) * 60 * 60 * 1000
    );

    // Check date range
    const rangeStart = moment(dateRange.start).startOf('day').toDate();
    const rangeEnd = moment(dateRange.end || dateRange.start).endOf('day').toDate();
    if (eventStart < rangeStart || eventEnd > rangeEnd) {
      console.warn('Event is outside the selected date range:', { eventStart, eventEnd, dateRange });
      alert('Please place the event within the selected date range (31 May - 6 June 2025).');
      setDraggedTask(null);
      return;
    }

    const newEvent = {
      id: draggedTask.id,
      title: `${people.find((p) => p.id === activePerson).name} - ${draggedTask.title}`,
      start: eventStart,
      end: eventEnd,
      allDay: allDay || false,
      priority: draggedTask.priority,
      category: draggedTask.category,
      description: draggedTask.description,
    };

    console.log('New event created:', newEvent);

    // Delay state updates to avoid DOM conflicts
    try {
      setTimeout(() => {
        setEvents((prev) => {
          const updatedEvents = {
            ...prev,
            [activePerson]: [...(prev[activePerson] || []), newEvent],
          };
          console.log('Updated events:', updatedEvents);
          return updatedEvents;
        });

        setTasks((prev) => {
          const updatedTasks = prev.filter((task) => task.id !== draggedTask.id);
          console.log('Updated tasks:', updatedTasks);
          return updatedTasks;
        });

        setDraggedTask(null);
      }, 100); // Increased delay to ensure library cleanup
    } catch (error) {
      console.error('Error during drop operation:', error);
    }
  };
  const dragFromOutsideItem = () => {
    if (!draggedTask) return null;
    console.log('Providing dragFromOutsideItem:', draggedTask);
    // Minimal data to avoid library issues
    return {
      title: draggedTask.title,
      start: new Date(),
      end: new Date(new Date().getTime() + parseInt(draggedTask.duration.split(':')[0]) * 60 * 60 * 1000),
    };
  };
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ start, end: end || moment(start).add(6, 'days').toDate() });
  };
  const handleMouseLeave = () => {
  };
  const handleNavigate = useCallback((newDate, view, action) => {
    dispatch(updateSchedulerPeriodAction({action: action, newDate: moment(newDate).format('YYYY-MM-DD'), view: view}));
  }, []);

  /***** Click on cell and show popup *****/
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      // Текущее время
      const now = moment();
      // Сравнение start с текущим временем
      if (moment(start).isBefore(now)) {
        dispatch(showOverlayAction(true));
        setShowAlert(true); // Показать алерт
        return;
      }
      dispatch(showSchedulePopupAction(true));
      dispatch(showOverlayAction(true));
      dispatch(setScheduleDateAction(dayjs(start).format('YYYY-MM-DD HH:mm')));
      dispatch(setScheduleTimeAction(moment(start).toISOString())); // Сохраняем как ISO
      dispatch(setScheduleTimeAction(dayjs(start).format('HH:mm')));
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    },
    []
  )
  const closeAlert = () => {
    setShowAlert(false);
    dispatch(showOverlayAction(false));
  };

  /***** Render custom event view *****/
  const CustomEvent = ({ event, view }) => {
    const handleMouseEnter = (e) => {
      let servicesData = '';
      try {
        const parsedData = JSON.parse(event.services);
        if (Array.isArray(parsedData)) {
          parsedData.map((_s, index) => (
            servicesData += `<span class="block"><i key=${index}>${_s.name}</i></span>`
          ))
        }
      } catch (error) {
        console.error("Ошибка парсинга JSON:", error);
      }
      // Calculate position based on event's bounding box
      const rect = e.currentTarget.getBoundingClientRect();
      document.getElementById('bigViewEvent').style.top = `${rect.top  - 178}px`;
      document.getElementById('bigViewEvent').style.left = `${rect.left - 18}px`;
      document.getElementById('bigViewEvent').style.display = 'block';
      document.getElementById('bigViewEvent').innerHTML = `
        <div>
          <p class="block mb-1"><strong className={'hover-event-title'}>${event.title}</strong></p>
          <span class="block mb-1">${msg.get('scheduler.from')}: ${event.event_time_from} - ${event.event_time_to}</span>
          <span class="block mb-1">${msg.get('scheduler.form.doctor')}: <strong className={'sh-doctor'}>${event.last_name} ${event.first_name}</strong></span>
          <span class="block mb-1">${msg.get('scheduler.form.cabinet')}: ${event.cabinet_name}</span>
          <span class="block mb-1">${msg.get('scheduler.patient')}: <strong className={'sh-patient'}>${event.p_name} ${event.pl_name}</strong></span>
          <p>${msg.get('scheduler.manipulation')}:</p>
          <p>${servicesData}</p>
        </div>
      `;
    };
    if (view === 'week') {

    }
    return view === 'month' ? (
      <strong>{event.title}</strong>
    ) : (
      <div className={'rbc-event-data relative'}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
      >
        <p className={'block mb-1'}>
          <strong style={{marginLeft: '20px'}}>{event.title}</strong>
          <div className={'sh-event-status'} style={{background: event.status_color}}></div>
        </p>
        <span className={'block mb-1'}>{event.cabinet_name}</span>
        <div>{event.description}</div>

      </div>
    );
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Scheduler'} />
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Manrope, sans-serif' }}>
        {/* Кастомный алерт */}
        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
              <p className="text-gray-700 mb-6">
                {msg.get('scheduler.time_schedule_error')}
              </p>
              <button
                onClick={closeAlert}
                className="w-full bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600 transition"
              >
                ОК
              </button>
            </div>
          </div>
        )}
        {showPrice && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-0 max-w-[550px] pb-[30px] relative">
              <div className={'absolute right-[20px] top-[10px] cursor-pointer z-50'} onClick={() => {
                dispatch(showPricePopupAction(false))
              }}>
                <FontAwesomeIcon icon={faClose} className="ml-5" />
              </div>
              <div style={{maxHeight: '400px', overflow: 'scroll'}}>
                <Pricing clinicData={clinicData} currency={currency} services={services} tree={tree} />
              </div>
              <SecondaryButton
                className="btn-back float-right mt-4 mr-[30px]"
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
                title={msg.get('scheduler.close')}
              >
                {msg.get('scheduler.close')}
              </SecondaryButton>
            </div>
          </div>
        )}
        <div style={{ flex: 1, padding: '10px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px' }}>
              <label>{msg.get('scheduler.period')}:</label>
              <DatePicker
                selectsRange
                startDate={dateRange.start}
                endDate={dateRange.end}
                onChange={handleDateRangeChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select date range"
                className="date-picker"
              />
            </div>
            <div className={'clearfix'} />
          </div>
          <div className={'w-full flex relative z-10'}>
            <div className={'w-1/2 mb-5'}>
              <Select
                placeholder="Лікарі..."
                value={null}
                styles={customStyles}
                className={'sh-d-select'}
                onChange={() => console.log(1)}
                options={customerGroupped}
              />
            </div>
            <div className={'w-1/2 mb-5 ml-4'}>
              <Select
                placeholder="Кабінети..."
                value={selectedGCabinet}
                styles={customStyles}
                className={'sh-d-select'}
                onChange={(option) =>  {
                  setSelectedGCabinet(option);
                }}
                options={cabinetGroupped}
              />
            </div>
          </div>

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={'relative'}>
            <DnDCalendar
              culture="uk"
              key={activePerson}
              localizer={localizerFn}
              events={filteredEvents['all']}
              startAccessor="start"
              step={15}
              views={views}
              defaultView={'week'}
              defaultDate={dateRange.start}
              min={minTime} // Начало с 8:00
              max={maxTime}
              messages={shBtnsTitles}
              onEventResize={onEventResize}
              onEventDrop={moveEvent}
              onNavigate={handleNavigate}
              onDropFromOutside={onDropFromOutside}
              draggableAccessor={() => true}
              dragFromOutsideItem={dragFromOutsideItem}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={(event) => alert(`EventExist: ${event.id}`)}
              eventPropGetter={(event) => ({
                style: {
                  borderColor: event.priority === 'high' ? '#be21ea' : '#8d71ef',
                  borderRadius: '5px',
                  color: 'black',
                  border: 'solid 1px #be21ea',
                  padding: '5px',
                  zIndex: 10,
                  backgroundColor: '#fff'
                },
              })}
              //
              components={{
                event: CustomEvent, // Override default event rendering
              }}
              resizable
              selectable
            />
            <div onMouseLeave={() => {
              document.getElementById('bigViewEvent').style.display = 'none'
            }} className={'event-big-content'} id={'bigViewEvent'} style={{
              background: 'white',
              position: 'absolute',
              width: '200px',
              minHeight: '150px',
              zIndex: 99,
              display: 'none'
            }}></div>
          </div>

          {showEventPopup && <SchedulerFormCreate
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            customerData={customerData}
            currency={currency}
          />}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}