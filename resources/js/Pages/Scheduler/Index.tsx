import React, { useState } from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Head } from '@inertiajs/react';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function Index({
  customerData,
  formData,
  clinicData,
  cabinetData,
  eventsData,
}) {
  const [people] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
  const [rooms] = useState([
    { id: 'A', name: 'Cabinet 1' },
    { id: 'B', name: 'Cabinet 2' },
    { id: 'C', name: 'Cabinet 3' },
  ]);

  const [events] = useState({
    1: [
      {
        id: 1,
        title: 'Alice Meeting',
        start: new Date(2025, 4, 31, 10, 0), // 31 May 2025
        end: new Date(2025, 4, 31, 11, 0),
        allDay: false,
        priority: 'high',
        category: 'Work',
        description: 'Team sync-up',
        room: 'A',
      },
      {
        id: 3,
        title: 'Alice Presentation',
        start: new Date(2025, 4, 31, 14, 0),
        end: new Date(2025, 4, 31, 15, 0),
        allDay: false,
        priority: 'low',
        category: 'Work',
        description: 'Client presentation',
        room: 'B',
      },
    ],
    2: [
      {
        id: 2,
        title: 'Bob Lunch',
        start: new Date(2025, 4, 31, 12, 0),
        end: new Date(2025, 4, 31, 13, 0),
        allDay: false,
        priority: 'low',
        category: 'Personal',
        description: 'Lunch with friends',
        room: 'C',
      },
    ],
    3: [
      {
        id: 4,
        title: 'Charlie Review',
        start: new Date(2025, 4, 31, 11, 0),
        end: new Date(2025, 4, 31, 12, 0),
        allDay: false,
        priority: 'high',
        category: 'Work',
        description: 'Project review',
        room: 'A',
      },
    ],
  });

  const [tasks, setTasks] = useState([
    {
      id: 3,
      title: 'Task 1',
      duration: '1:00',
      priority: 'high',
      category: 'Work',
      description: 'Prepare presentation',
    },
    {
      id: 4,
      title: 'Task 2',
      duration: '2:00',
      priority: 'low',
      category: 'Personal',
      description: 'Call client',
    },
  ]);

  const [activePerson, setActivePerson] = useState(1);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(2025, 4, 31), // 31 May 2025
    end: new Date(2025, 5, 6),   // 6 June 2025
  });

  const filteredEvents = (events[activePerson] || []).filter((event) =>
    filter === 'all' ? true : event.category === filter
  );
  const [draggedTask, setDraggedTask] = useState(null);

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.category === filter
  );

  const onEventDrop = ({ event, start, end, allDay }) => {
    console.log('Event dropped:', { event, start, end, allDay });
    setEvents((prev) => ({
      ...prev,
      [activePerson]: prev[activePerson].map((ev) =>
        ev.id === event.id ? { ...ev, start, end, allDay } : ev
      ),
    }));
  };

  const onEventResize = ({ event, start, end }) => {
    console.log('Event resized:', { event, start, end });
    setEvents((prev) => ({
      ...prev,
      [activePerson]: prev[activePerson].map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      ),
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

  const handleDragStart = (task) => {
    setDraggedTask(task);
    console.log('Drag started for task:', task);
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
console.log(rooms)
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Scheduler'} />
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '250px', padding: '10px', borderRight: '1px solid #ccc', background: '#f9f9f9' }}>
        <h3 style={{ margin: '0 0 10px' }}>Filter Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {rooms.map((room, index) => (
            <button
              key={`room_${index}`}
              onClick={() => setFilter(room.id)}
              style={{
                padding: '8px',
                background: filter === room.name ? '#007bff' : '#e0e0e0',
                color: filter === room.id ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {room === 'all' ? 'All Cabinets' : room.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => setActivePerson(person.id)}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                background: activePerson === person.id ? '#007bff' : '#f0f0f0',
                color: activePerson === person.id ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: activePerson === person.id ? 'bold' : 'normal',
              }}
            >
              {person.name}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>Date Range:</label>
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
        </div>
        <DnDCalendar
          key={activePerson}
          localizer={localizer}
          events={events[activePerson] || []}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          defaultDate={dateRange.start}
          min={moment(dateRange.start).startOf('day').toDate()}
          max={moment(dateRange.end || dateRange.start).endOf('day').toDate()}
          style={{ height: '80vh', zIndex: 1 }}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onDropFromOutside={onDropFromOutside}
          draggableAccessor={() => true}
          dragFromOutsideItem={dragFromOutsideItem}
          resizable
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.priority === 'high' ? '#ff4d4d' : '#007bff',
              borderRadius: '5px',
              color: 'white',
              border: 'none',
              padding: '5px',
              zIndex: 10,
            },
          })}
          onSelectEvent={(event) => alert(`Event: ${event.title}\nDescription: ${event.description}`)}
        />
      </div>
    </div>
    </AuthenticatedLayout>
  );
}