import React, { useCallback, useState } from 'react';
import Select from "react-select";
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
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
} from '../../Redux/Scheduler';
import SchedulerFormCreate from './Form/FormPopupCreate';
import { setPopupAction, showOverlayAction } from '../../Redux/Layout';
import Pricing from './Pricing';
import { pricePopupSelector } from '../../Redux/Scheduler/selectors';
import dayjs from 'dayjs';
import SecondaryButton from '../../Components/Form/SecondaryButton';
import { faTrash,faClose } from '@fortawesome/free-solid-svg-icons';
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
  const [events, setEvents] = useState({
    all: [
      {
        id: 1,
        title: 'Пломбування кореню',
        start: new Date(2025, 4, 31, 10, 0), // 31 May 2025
        end: new Date(2025, 4, 31, 11, 30),
        allDay: false,
        priority: 'high',
        category: 'Work',
        description: 'Team sync-up',
        cabinet_id: 6,
        doctor_id: 1
      },
      {
        id: 2,
        title: 'Імплант',
        start: new Date(2025, 4, 31, 12, 0), // 31 May 2025
        end: new Date(2025, 4, 31, 13, 30),
        allDay: false,
        priority: 'lower',
        category: 'Work',
        description: 'Team sync-up',
        cabinet_id: 6,
        doctor_id: 1
      },
    ],
  });
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [activePerson, setActivePerson] = useState('all');
  const [selectedCabinet, setSelectedCabinet] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const showPrice = useSelector(pricePopupSelector);

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

  const [draggedTask, setDraggedTask] = useState(null);

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

  // Click on calendar for create event
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
      console.log('Dispatched time:', moment(start).toISOString()); // Для отладки
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    },
    [setEvents]
  )

  const closeAlert = () => {
    setShowAlert(false);
    dispatch(showOverlayAction(false));
  };

  const CustomEvent = ({ event, view }) => {
    return view === 'month' ? (
      <strong>{event.title}</strong>
    ) : (
      <div>
        <strong>{event.title}</strong>
        <div>Кабинет: Хирургия</div>
        <div>Приоритет: N/A</div>
        <div>Можем писать сюда любую херню</div>
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
        {/*<div style={{ width: '120px', padding: '10px', borderRight: '1px solid #ccc', background: '#f9f9f9' }}>*/}
        {/*  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>*/}
        {/*    {cabinetData.map((cabinet, index) => (*/}
        {/*      <button*/}
        {/*        key={`room_${index}`}*/}
        {/*        onClick={() => {*/}

        {/*          setSelectedCabinet(selectedCabinet !== cabinet.id ? cabinet.id : 'all');*/}
        {/*          filterByCabinets(selectedCabinet !== cabinet.id ? cabinet.id : 'all');*/}
        {/*        }}*/}
        {/*        style={{*/}
        {/*          padding: '8px',*/}
        {/*          background: selectedCabinet === cabinet.id ? '#6248a1' : '#f1eafd',*/}
        {/*          color: selectedCabinet === cabinet.id ? '#fff' : '#000',*/}
        {/*          borderRadius: '4px',*/}
        {/*          cursor: 'pointer',*/}
        {/*          textAlign: 'left',*/}
        {/*          fontSize: '12px'*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {cabinet.name}*/}
        {/*      </button>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
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

          {/*<ul*/}
          {/*  className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 sh-p-tabs">*/}
          {/*  {customerData.map((person) => (*/}
          {/*    <li className="me-2 nowrap">*/}
          {/*      <a href="#" aria-current="page"*/}
          {/*         className="">*/}
          {/*        {shortenName(person.name)}*/}
          {/*      </a>*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <DnDCalendar
            culture="uk"
            key={activePerson}
            localizer={localizerFn}
            events={filteredEvents['all']}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            defaultDate={dateRange.start}
            min={minTime} // Начало с 8:00
            max={maxTime}
            messages={shBtnsTitles}
            onEventResize={onEventResize}
            onEventDrop={moveEvent}
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
                background: 'white'
              },
            })}
            components={{
              event: CustomEvent
            }}
            resizable
            selectable
          />
          <SchedulerFormCreate
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            customerData={customerData}
            currency={currency}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}