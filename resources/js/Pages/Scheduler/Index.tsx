import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
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
import { faClose, faList, faUser, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

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
  const endDate = new Date(date);
  endDate.setDate(date.getDate() + 3);
  return `${date.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

const getCurrentWeekRange = () => {
  const now = new Date(); // Динамическое текущее время
  const dayOfWeek = now.getDay(); // 0 (воскресенье) - 6 (суббота)
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Расстояние до понедельника

  // Начало недели (понедельник)
  const start = new Date(now);
  const nowDay = new Date(now);
  start.setDate(now.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00:00

  // Конец недели (воскресенье)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999); // Устанавливаем время на 23:59:59.999
  return { start, end };
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
  // const clickRef = useRef(null);
  const clickRef = useRef<number | null>(null);
  const [popoverContent, setPopoverContent] = useState('')
  const shBtnsTitles = {
    today: msg.get('scheduler.today'),
    previous: msg.get('scheduler.prev'),
    next: msg.get('scheduler.next'),
    month: msg.get('scheduler.month'),
    week: msg.get('scheduler.3days'),
    day: msg.get('scheduler.day'),
    agenda: msg.get('scheduler.agenda'),
  }
  const now = new Date();
  const shEvents = useSelector(eventsDataSelector);
  const [events, setEvents] = useState(eventsData);
  const [filteredEvents, setFilteredEvents] = useState<any>([]);
  const [activePerson, setActivePerson] = useState('all');
  const [selectedCabinet, setSelectedCabinet] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const showPrice = useSelector(pricePopupSelector);
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const [dateRange, setDateRange] = useState(getCurrentWeekRange());
  const [draggedTask, setDraggedTask] = useState(null);
  const [showHower, setShowHover] = useState(true);
  const popoverRef = useRef(null);
  const [eventView, setEventView] = useState(null);
  const { views } = useMemo(
    () => ({
      views: {
        day: true,
        week: MyWeek,
      },
    }),
    []
  )


  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

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
    // let filteredEvents;
    // filteredEvents = {
    //   shEvents
    // };

    setFilteredEvents(shEvents)
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
    // let filteredEvents;
    // filteredEvents = {
    //   eventsData
    // };
    setFilteredEvents(eventsData)
  }, [eventsData]);


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

  const formatEventDateTime = (event, locale = 'uk') => {
    // Об'єкт із перекладами для місяців і днів тижня
    const translations = {
      uk: {
        months: [
          'Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня',
          'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'
        ],
        days: [
          'Неділя', 'Понеділок', 'Вівторок', 'Середа',
          'Четвер', 'П`ятниця', 'Субота'
        ]
      },
      en: {
        months: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        days: [
          'Sunday', 'Monday', 'Tuesday', 'Wednesday',
          'Thursday', 'Friday', 'Saturday'
        ]
      },
      ru: {
        months: [
          'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
          'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
        ],
        days: [
          'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
          'Четверг', 'Пятница', 'Суббота'
        ]
      }
    };

    // Перевірка наявності потрібних полів
    if (!event.event_date || !event.event_time_from || !event.event_time_to) {
      throw new Error('Missing required event fields');
    }

    // Перевірка, чи підтримується локаль
    // if (!translations[locale]) {
    //   console.warn(`Locale ${locale} not supported, falling back to 'uk'`);
    //   locale = 'uk';
    // }
    locale = 'uk';

    // Парсимо дату
    const date = new Date(event.event_date);
    // if (isNaN(date)) {
    //   throw new Error('Invalid event_date format');
    // }

    // Отримуємо день, місяць і день тижня
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();

    // Форматуємо час (беремо лише HH:MM)
    const timeFrom = event.event_time_from.slice(0, 5);
    const timeTo = event.event_time_to.slice(0, 5);

    // Формуємо результат
    return `${day} ${translations[locale].months[monthIndex]}, ${translations[locale].days[dayIndex]} ${timeFrom} - ${timeTo}`;
  }

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Если месяц текущий меньше месяца рождения или
    // если месяцы равны, но текущий день меньше дня рождения
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }


  const onSelectEvent = useCallback((event, e) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      const eventElement = e.target.closest('.rbc-event');
      if (eventElement) {
        setShowHover(false);
        setEventView(event);
        const rect = eventElement.getBoundingClientRect();
        const popoverWidth = 380;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const popoverEl = document.getElementById('bigActionEventView');
        const popoverArrowLeft = document.getElementById('arrowLeft');
        const popoverArrowRight = document.getElementById('arrowRight');
        const popoverHeight = 200; // Предполагаемая высота поповера, настройте по вашим нуждам
        // Проверяем, выходит ли поповер за правую границу
        let left = rect.left;
        if (left + popoverWidth > windowWidth) {
          left = rect.left - 300;
          popoverArrowLeft.style.display = 'none';
          popoverArrowRight.style.display = 'block';
        } else {
          popoverArrowLeft.style.display = 'block';
          popoverArrowRight.style.display = 'none';
        }

        // Проверяем, выходит ли поповер за левую границу
        if (left < 10) {
          left = 10; // Минимальный отступ слева
        }
        // Позиция сверху или снизу от события
        let top = rect.top - 100; // Поповер ниже события
        if (top + popoverHeight > windowHeight) {
          top = rect.top; // Поповер ниже собития ибо вилазит за границу екрана
        }

        // Позиция стрелочки: указывает на середину события
        popoverEl.style.left = `${left}px`;
        popoverEl.style.top = `${top}px`;
        popoverEl.style.display = 'block';
      }
    }, 250)
  }, [])

  const onDoubleClickEvent = useCallback((calEvent) => {
    /**
     * Notice our use of the same ref as above.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      window.alert('onDoubleClickEvent')
    }, 250)
  }, [])

  const renderViewEventBlock = () => {
    let parsedData = JSON.parse(eventView.services) || [];

    return (
      <>
        <div className="grid grid-cols-[1fr_auto] items-baseline-last">
          <div className={'pt-2'}>
            <span className="block mb-1">{msg.get('scheduler.patient')}:{eventView.pl_name} {eventView.p_name}</span>
            <span className="block mb-1 font-bold">{moment(eventView.birthday).format('DD.MM.YYYY')}, {calculateAge(eventView.birthday)} {msg.get('scheduler.age')}</span>
            <span className="block mb-1">{eventView.status_name ? `${eventView.status_name}` : ''} <em className={'sh-discount'}>{eventView.status_name ? `(-${eventView.status_discount}%)` : ''}</em></span>
            {/*<span className="block mb-1">{msg.get('scheduler.form.doctor')}: {eventView.last_name} {eventView.first_name}</span>*/}
            <span className="block text-gray-500  mb-1">
              {formatEventDateTime(eventView)}
            </span>
          </div>
          <div className={'pt-2'}>
            <span className={`p-balance block mb-1 ${eventView.dt_balance - eventView.kt_balance < 0 ? 'red' : ''}`}>{msg.get('scheduler.balance')} {eventView.dt_balance - eventView.kt_balance} {clinicData.currency.symbol}</span>
            <span className="block mb-1 p-doctor">{shortenName(`${eventView.last_name } ${eventView.first_name}`)}</span>
            <span className="p-cabinet  mb-1 block">{eventView.cabinet_name}</span>
          </div>
        </div>
        <div>
          <div className={'sch-services'}>
            {parsedData.map((_s, index) => (
              <div className="flex justify-between">
                <span>{_s.name}</span>
                <span>{_s.price} {clinicData.currency.symbol}</span>
              </div>
            ))}
          </div>
          <div className={'sh-btns-block'}>
            <span className={'btn-sch-act'}>{msg.get('scheduler.sch.act')}</span>
            <span className={'btn-sch-payment ml-2'}>{msg.get('scheduler.sch.payment')}</span>
            <span className={'btn-sch-icon ml-5'}>
              <FontAwesomeIcon icon={faCopy} />
            </span>
            <span className={'btn-sch-icon ml-1'}>
              <FontAwesomeIcon icon={faList} />
            </span>
            <span className={'btn-sch-icon ml-1'}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div className={'tabs-block mt-2 sch-tabs'}>
            <ul>
              <li className={'inline-block'}>Візити</li>
              <li className={'inline-block'}>Плани</li>
              <li className={'inline-block'}>Історія</li>
              <li className={'inline-block'}>Фінанси</li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  const closePopover = () => {
    document.getElementById('bigActionEventView').style.display = 'none';
    setShowHover(true);
  };

  /***** Render custom event view *****/
  const CustomEvent = ({ event, view }) => {
    let servicesData = '';
    try {
      const parsedData = JSON.parse(event.services);
      if (Array.isArray(parsedData)) {
        parsedData.map((_s, index) => (
          servicesData += `<span class="block service-item"><em key=${index}>${_s.name}</em></span>`
        ))
      }
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
    }
    const handleMouseEnter = (e) => {
      // Calculate position based on event's bounding box
      // const rect = e.currentTarget.getBoundingClientRect();
      // const parentElement = e.currentTarget.querySelector('.rbc-event-content')
      const parentElement = e.target.closest('.rbc-event-content');
      const rect = parentElement.getBoundingClientRect();
      console.log(parentElement)
      const width = parentElement.clientWidth;
      const popoverWidth = 380;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const popoverEl = document.getElementById('bigViewEvent');
      const popoverArrowLeft = document.getElementById('arrowLeft');
      const popoverArrowRight = document.getElementById('arrowRight');
      const popoverHeight = 200; // Предполагаемая высота поповера, настройте по вашим нуждам
      // Проверяем, выходит ли поповер за правую границу
      let left = rect.left - width;
      if (left + popoverWidth > windowWidth) {
        left = rect.left - 85;
        popoverArrowLeft.style.display = 'none';
        popoverArrowRight.style.display = 'block';
      } else {
        popoverArrowLeft.style.display = 'block';
        popoverArrowRight.style.display = 'none';
      }

      // Проверяем, выходит ли поповер за левую границу
      if (left < 10) {
        left = 10; // Минимальный отступ слева
      }
      // Позиция сверху или снизу от события
      let top = rect.top; // Поповер ниже события
      if (top + popoverHeight > windowHeight) {
        top = rect.top; // Поповер ниже собития ибо вилазит за границу екрана
      }
console.log(top, left);

      popoverEl.style.top = `${top}px`;
      popoverEl.style.left = `${left}px`;
      // popoverEl.style.display = showHower ? 'block' : 'none';
      popoverEl.style.display = 'block';
      popoverEl.innerHTML = `
        <div>
          <span class="block mb-1"><strong className={'hover-event-title'}>${event.title}</strong></span>
          <span class="block mb-1">${msg.get('scheduler.from')}: ${event.event_time_from} - ${event.event_time_to}</span>
          <span class="block mb-1">${msg.get('scheduler.form.doctor')}: <strong className={'sh-doctor'}>${event.last_name} ${event.first_name}</strong></span>
          <span class="block mb-1">${msg.get('scheduler.form.cabinet')}: ${event.cabinet_name}</span>
          <span class="block mb-1">${msg.get('scheduler.patient')}: <strong className={'sh-patient'}>${event.p_name} ${event.pl_name}</strong></span>
          ${servicesData ? '<span>'+msg.get('scheduler.manipulation')+'</span>' : ''}
          ${servicesData ? servicesData : ''}
        </div>
      `;
    };
    const handleMouseLeave = (e) => {
      document.getElementById('bigViewEvent').style.display = 'none'
    };

    return view === 'month' ? (
      <strong>{event.title}</strong>
    ) : (
      <div className={'rbc-event-data bg-blue-100'}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <span className={'block mb-1 pb-1 inline-block'}>
          <strong style={{marginLeft: '20px'}}>
            {event.title}
          </strong>
          <div className={'sh-event-status'} style={{background: event.status_color}}></div>
        </span>
        <span className={'block mb-2'}>{msg.get('scheduler.form.doctor')}: {shortenName(`${event.last_name} ${event.first_name}`)}</span>
        <span className={'block mb-2'}>{msg.get('scheduler.patient')}: {shortenName(`${event.p_name} ${event.pl_name}`)}</span>
        <div className={'block mb-2'}><strong>{event.description}</strong></div>
        <div dangerouslySetInnerHTML={{__html: servicesData || ''}} />
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
          </div>

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={'relative'}>
            <DnDCalendar
              culture="uk"
              localizer={localizerFn as any}
              events={filteredEvents}
              resources={cabinetData}
              resourceIdAccessor="resourceId"
              resourceTitleAccessor="resourceTitle"
              startAccessor="start"
              step={15 as any}
              views={views as any}
              defaultView={'week' as any}
              defaultDate={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)  as any}
              min={minTime as any} // Начало с 8:00
              max={maxTime as any}
              messages={shBtnsTitles as any}
              onEventResize={onEventResize as any}
              onEventDrop={moveEvent as any}
              onNavigate={handleNavigate as any}
              onDropFromOutside={onDropFromOutside as any}
              // draggableAccessor={() => true}
              dragFromOutsideItem={dragFromOutsideItem as any}
              onSelectSlot={handleSelectSlot as any}
              onSelectEvent={onSelectEvent as any}
              // onSelectEvent={onSelectEvent}
              onDoubleClickEvent={onDoubleClickEvent as any}
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
              }) as any}
              //
              components={{
                event: CustomEvent, // Override default event rendering
              } as any}
              resizable
              selectable
            />
            <div
              onMouseLeave={() => {
                document.getElementById('bigViewEvent').style.display = 'none'
              }}
              className={'event-big-content'} id={'bigViewEvent'}
              style={{
                background: 'white',
                position: 'absolute',
                width: '200px',
                minHeight: '130px',
                zIndex: 99,
                display: 'none'
              }} />

              <div
                className="sch_tooltip"
                id="bigActionEventView"
                ref={popoverRef}
                style={{
                  position: 'absolute',
                  width: '380px',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}
                onClick={closePopover}
              >
                <div id="arrowLeft" className={'arrow-left'}></div>
                <div id="arrowRight" className={'arrow-right'}></div>
                <div className={'event-close'} onClick={() => closePopover()}></div>
                <div
                  className="sch-content"
                  style={{
                    padding: '10px',
                    background: 'white', // Фон для контента
                    borderRadius: '4px', // Скругление углов контента
                  }}
                >
                  <div>{eventView && renderViewEventBlock()}</div>
                </div>
              </div>
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