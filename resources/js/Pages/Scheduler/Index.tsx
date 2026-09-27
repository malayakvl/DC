import React, { useMemo, useState, useEffect } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { SchedulerEvent } from './_mock/data';
import { generateTimeSlots } from './engine/timeEngine';
import Index3Days from './Index3Days';
import { Head } from '@inertiajs/react';
import Lang from 'lang.js';
import lngScheduler from '../../Lang/Scheduler/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import {
  pricePopupSelector,
  showEditPopupSelector,
  showSchedulePopupSelector,
  viewScheduleSelector,
} from '@/Redux/Scheduler/selectors';
import SchedulerFormCreate from '@/Pages/Scheduler/Form/FormPopupCreate';
import SchedulerFormEdit from '@/Pages/Scheduler/Form/FormPopupEdit';
import { showPricePopupAction } from '@/Redux/Scheduler';
import Pricing from './Pricing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Form/SecondaryButton';
import { SchedulerToolbar } from './components/SchedulerToolbar';

// ================= CORE GRID ENGINE =================
const SLOT_HEIGHT = 30;
function getDays(baseDate: string, count: number, appLang: string) {
  const start = parseISO(baseDate);

  return Array.from({ length: count }).map((_, i) => {
    const d = addDays(start, i);

    return {
      date: format(d, 'yyyy-MM-dd'),
      label: new Intl.DateTimeFormat(appLang, {
        weekday: 'short',
        day: '2-digit',
      }).format(d),
    };
  });
}

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  groupedOptions,
  assistantData,
  eventsData,
  currencyData,
  tree,
  services,
  serviceCategories,
  initialView = '3days',
  allowViewSwitch = true,
  statusesData,
}) {
  const [baseDate, setBaseDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [typeView, setTypeView] = useState(initialView);
  const appLang = useSelector(appLangSelector);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setShowAlert] = useState(false);
  useSelector(pricePopupSelector);
  const showEventPopup = useSelector(showSchedulePopupSelector);
  const editEventPopup = useSelector(showEditPopupSelector);
  // Рефы для блокировки кликов после перетаскивания / ресайза
  const isResizingRef = React.useRef(false);
  const tab = useSelector(viewScheduleSelector);
  const showPrice = useSelector(pricePopupSelector);
  const [hoverPreview, setHoverPreview] = useState<{
    x: number;
    y: number;
    event: any;
    services: any[];
  } | null>(null);
//   const hoverTimeout = useRef<number>();

  // Динамическая фильтрация и группировка опций для вкладок
  const { doctorsTabOptions, assistantsTabOptions, othersTabOptions } = useMemo(() => {
    let doctorsOptions: any[] = [];
    let assistantsOptions: any[] = [];
    let othersOptions: any[] = [];

    groupedOptions?.forEach((group: any) => {
      if (group.label === 'roles.doctor') {
        doctorsOptions = [...doctorsOptions, ...(group.options || [])];
      } else if (group.label === 'roles.assistant') {
        assistantsOptions = [...assistantsOptions, ...(group.options || [])];
      } else {
        // Все остальные роли (ceo, nurse, receptionist и т.д.) уходят во вкладку "Інші"
        othersOptions = [...othersOptions, ...(group.options || [])];
      }
    });

    return {
      doctorsTabOptions: doctorsOptions,
      assistantsTabOptions: assistantsOptions,
      othersTabOptions: othersOptions,
    };
  }, [groupedOptions]);

  // Определяем, какой список людей рендерить в сетке в зависимости от активной вкладки
  const currentTabPeople = useMemo(() => {
    switch (tab) {
      case 'patients': // Первая вкладка (по логике в коде она называется patients, но там врачи)
        return doctorsTabOptions;
      case 'visits': // Вкладка "Асистенти"
        return assistantsTabOptions;
      case 'plans': // Вкладка "Інші"
        return othersTabOptions;
      default:
        return doctorsTabOptions;
    }
  }, [tab, doctorsTabOptions, assistantsTabOptions, othersTabOptions]);

  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const dayStep = typeView === 'day' ? 1 : 3;
  const days = useMemo(() => {
    return getDays(baseDate, dayStep, appLang);
  }, [baseDate, dayStep]);

  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 15), []);
  const gridHeight = timeSlots.length * SLOT_HEIGHT;

  // ================= INTERACTIVE EVENTS STATE =================
  const [localEvents, setLocalEvents] = useState<SchedulerEvent[]>(() => {
    return eventsData.map((event) => ({
      id: String(event.id),
      title: event.title,
      doctor_id: event.doctor_id,
      patient_id: event.patient_id,
      cabinet_id: event.cabinet_id,
      event_date: event.event_date,
      event_time_from: event.event_time_from.slice(0, 5),
      event_time_to: event.event_time_to.slice(0, 5),
      start: `${event.event_date}T${event.event_time_from}`,
      end: `${event.event_date}T${event.event_time_to}`,
      status_color: event.status_color,
      status_name: event.status_name,
      patient_name: event.last_name + ' ' + event.first_name,
      services: event.services,
      cabinet_name: event.cabinet_name,
      doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
    }));
  });

  // АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ СЕТКИ ПРИ ИЗМЕНЕНИИ ДАННЫХ С СЕРВЕРА
  useEffect(() => {
    if (eventsData) {
      setLocalEvents(
        eventsData.map((event) => ({
          id: String(event.id),
          title: event.title,
          doctor_id: event.doctor_id,
          patient_id: event.patient_id,
          cabinet_id: event.cabinet_id,
          event_date: event.event_date,
          event_time_from: event.event_time_from.slice(0, 5),
          event_time_to: event.event_time_to.slice(0, 5),
          start: `${event.event_date}T${event.event_time_from}`,
          end: `${event.event_date}T${event.event_time_to}`,
          status_color: event.status_color,
          status_name: event.status_name,
          patient_name: event.last_name + ' ' + event.first_name,
          services: event.services,
          cabinet_name: event.cabinet_name,
          doctor_name: event.doctor_first_name + ' ' + event.doctor_last_name,
        }))
      );
    }
  }, [eventsData]); // Реагирует на любые изменения пропса eventsData

  // ================= DRAG & DROP ENGINE =================

  const handleTabClick = (tab) => {
    console.log(tab);
  };

  // ================= RESIZE ENGINE =================
  const handleResizeStart = (e: React.MouseEvent, eventId: string, currentEndISO: string) => {
    e.stopPropagation();
    e.preventDefault();

    const startY = e.clientY;
    const baseEnd = parseISO(currentEndISO);
    isResizingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const minutesDelta = Math.round(deltaY / 2 / 15) * 15;

      if (minutesDelta !== 0) {
        const newEndDate = new Date(baseEnd.getTime() + minutesDelta * 60000);
        const newEndISO = `${format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss")}`;
        const newEndTimeHuman = format(newEndDate, 'HH:mm');

        setLocalEvents((prevEvents) =>
          prevEvents.map((ev) => {
            if (ev.id !== eventId) return ev;
            const startTime = parseISO(ev.start).getTime();
            if (newEndDate.getTime() <= startTime) return ev;

            return {
              ...ev,
              end: newEndISO,
              event_time_to: newEndTimeHuman,
            };
          })
        );
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      setTimeout(() => {
        isResizingRef.current = false;
      }, 50);
      console.log('✅ Ресайз закончен, стейт зафиксирован!');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // ================= НАЖАТИЕ НА СЕТКУ (ВРЕМЯ) =================
  // const handleCellClick = (
  //   e: React.MouseEvent<HTMLDivElement>,
  //   date: string,
  //   cabinet: (typeof cabinets)[0],
  //   doctor: (typeof doctors)[0]
  // ) => {
  //   if (isResizingRef.current || isDraggingRef.current) return;
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const clickY = e.clientY - rect.top;
  //   const slotIndex = Math.floor(clickY / SLOT_HEIGHT);
  //
  //   if (slotIndex >= 0 && slotIndex < timeSlots.length) {
  //     const clickedSlot = timeSlots[slotIndex];
  //     const now = moment();
  //     dispatch(setExistServicesAction([]));
  //     // Создаем полную дату и время из выбранной даты и временного слота
  //     const selectedDateTime = moment(`${date} ${clickedSlot.label}`, 'YYYY-MM-DD HH:mm');
  //
  //     // Проверка: нельзя планировать на прошедшее время
  //     if (selectedDateTime.isBefore(now)) {
  //       alert(msg.get('scheduler.error.pastTime'));
  //       setShowAlert(true); // Показать алерт
  //       return;
  //     }
  //
  //     dispatch(showSchedulePopupAction(true));
  //     dispatch(setPopupCabinetAction(cabinet.id));
  //     dispatch(setSchedulePopupDoctorAction(doctor.id));
  //     dispatch(showOverlayAction(true));
  //     dispatch(setScheduleDateAction(dayjs(date).format('DD.MM.YYYY')));
  //     dispatch(setScheduleTimeAction(clickedSlot.label)); // Сохраняем как HH:mm
  //   }
  // };

  // const handleEventClick = (e: React.MouseEvent, cellEvent: SchedulerEvent) => {
  //   console.log(1);
  //   // ЖЕЛЕЗОБЕТОННО останавливаем всплытие, чтобы клик по ивенту НЕ вызывал клик по ячейке!
  //   e.stopPropagation();
  //
  //   // Если ивент только что перетаскивали, ресайзили или сработал блок клика — полностью блокируем
  //   if (isDraggingRef.current || isResizingRef.current || blockClickRef.current) {
  //     e.preventDefault();
  //     return;
  //   }
  //
  //   dispatch(setScheduleEditEventAction(cellEvent));
  //   dispatch(setScheduleDateAction(cellEvent.event_date));
  //   dispatch(initServicesAction(JSON.parse(cellEvent.services || '[]')));
  //   dispatch(setScheduleTimeAction(cellEvent.event_time_from));
  //   dispatch(showOverlayAction(true));
  //   dispatch(showScheduleEditPopupAction(true));
  // };

  // Функция для добавления или обновления ивента в реальном времени
  const handleSaveLocalEvent = (rawEvent: any) => {
    const formattedEvent = {
      id: String(rawEvent.id),
      title: rawEvent.title,
      doctor_id: Number(rawEvent.doctor_id),
      patient_id: Number(rawEvent.patient_id),
      cabinet_id: Number(rawEvent.cabinet_id),
      event_date: rawEvent.event_date,
      event_time_from: rawEvent.event_time_from.slice(0, 5),
      event_time_to: rawEvent.event_time_to.slice(0, 5),
      start: `${rawEvent.event_date}T${rawEvent.event_time_from}`,
      end: `${rawEvent.event_date}T${rawEvent.event_time_to}`,
      status_color: rawEvent.status_color || '#0ea5a4',
      status_name: rawEvent.status_name,
      patient_name: rawEvent.last_name
        ? `${rawEvent.last_name} ${rawEvent.first_name}`
        : rawEvent.patient_name,
      services:
        typeof rawEvent.services === 'string'
          ? rawEvent.services
          : JSON.stringify(rawEvent.services || []),
      cabinet_name: rawEvent.cabinet_name,
      doctor_name: rawEvent.doctor_first_name
        ? `${rawEvent.doctor_first_name} ${rawEvent.doctor_last_name}`
        : rawEvent.doctor_name,
    };

    setLocalEvents((prev) => {
      const exists = prev.some((ev) => ev.id === formattedEvent.id);
      if (exists) {
        // Если редактировали — обновляем старый
        return prev.map((ev) => (ev.id === formattedEvent.id ? formattedEvent : ev));
      }
      // Если новый — добавляем в массив
      return [...prev, formattedEvent];
    });
  };

  const PREVIEW_WIDTH = 340;
  const PREVIEW_HEIGHT = 280;

  const showPreview = (e: React.MouseEvent<HTMLDivElement>, event: any, services: any[]) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const margin = 12;

    let x = rect.right + margin;
    let y = rect.top;

    // ---------- справа не помещается ----------
    if (x + PREVIEW_WIDTH > window.innerWidth - margin) {
      x = rect.left - PREVIEW_WIDTH - margin;
    }

    // ---------- если и слева мало места ----------
    if (x < margin) {
      x = margin;
    }

    // ---------- снизу не помещается ----------
    if (y + PREVIEW_HEIGHT > window.innerHeight - margin) {
      y = window.innerHeight - PREVIEW_HEIGHT - margin;
    }

    // ---------- сверху ----------
    if (y < margin) {
      y = margin;
    }
    const _services = event ? JSON.parse(event.services) : [];
    const previewTotal = event
      ? _services.reduce(
          (sum, service) =>
            sum + Number(service.total_price ?? service.price) * Number(service.qty ?? 1),
          0
        )
      : 0;
    event.amount_total = previewTotal;

    setHoverPreview({
      x,
      y,
      event,
      services,
    });
  };

  const formatDuration = (from: string, to: string) => {
    const [fh, fm] = from.split(':').map(Number);
    const [th, tm] = to.split(':').map(Number);

    const minutes = th * 60 + tm - (fh * 60 + fm);

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} хв`;
    if (mins === 0) return `${hours} год`;

    return `${hours} год ${mins} хв`;
  };

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <Head title="Scheduler Management" />
      <div>
        <div className="p-4 sm:py-8 sm:px-4 mb-4 content-data bg-content">
          <SchedulerToolbar
            currentDate={`${days[0].label} ${days.length > 1 ? `→ ${days[days.length - 1].label}` : ''}`}
            onPrevDay={() =>
              setBaseDate((prev) => format(addDays(parseISO(prev), -dayStep), 'yyyy-MM-dd'))
            }
            onNextDay={() =>
              setBaseDate((prev) => format(addDays(parseISO(prev), dayStep), 'yyyy-MM-dd'))
            }
            onToday={() => setBaseDate(format(new Date(), 'yyyy-MM-dd'))}
            allowViewSwitch={allowViewSwitch}
            statusesData={statusesData}
            cabinetsData={cabinetData}
            customerData={customerData}
            onNewAppointment={() => {
              // Логіка відкриття створення нового запису через Redux, якщо потрібно
              // наприклад: dispatch(showSchedulePopupAction(true)); dispatch(showOverlayAction(true));
            }}
          />
        </div>
        {showEventPopup && (
          <SchedulerFormCreate
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
            onSuccess={handleSaveLocalEvent}
          />
        )}
        {editEventPopup && (
          <SchedulerFormEdit
            formData={formData}
            clinicData={clinicData}
            cabinetData={cabinetData}
            assistantData={assistantData}
            customerData={customerData}
            currency={currencyData}
            serviceCategories={serviceCategories}
            services={services}
            onSuccess={handleSaveLocalEvent}
          />
        )}
        {showPrice && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-0 max-w-[550px] pb-[30px] relative">
              <div
                className={'absolute right-[20px] top-[10px] cursor-pointer z-50'}
                onClick={() => {
                  dispatch(showPricePopupAction(false));
                }}
              >
                <FontAwesomeIcon icon={faClose} className="ml-5" />
              </div>
              <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
                <Pricing
                  clinicData={clinicData}
                  currency={currencyData}
                  services={services}
                  tree={tree}
                />
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
        {typeView === '3days' ? (
          <div>
            <Index3Days
              baseDate={baseDate}
              days={days}
              clinicData={clinicData}
              customerData={customerData}
              formData={formData}
              cabinetData={cabinetData}
              groupedOptions={groupedOptions}
              assistantData={assistantData}
              eventsData={eventsData}
              currencyData={currencyData}
              tree={tree}
              services={services}
              serviceCategories={serviceCategories}
              initialView={initialView}
              doctorsTabOptions={doctorsTabOptions}
              assistantsTabOptions={assistantsTabOptions}
              othersTabOptions={othersTabOptions}
            />
          </div>
        ) : (
          <>Day View</>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
