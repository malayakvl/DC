export const doctors = [
  { id: 1, name: 'Sergey' },
  { id: 2, name: 'Anna' },
  { id: 3, name: 'Iryna' },
];

export const cabinets = [
  { id: 1, name: 'Cabinet 1' },
  { id: 2, name: 'Cabinet 2' },
];

export interface SchedulerEvent {
  id: string;
  cabinet_id: number;
  doctor_id: number;
  assistant_id: number | null;
  event_date: string;
  start: string;
  end: string;
  event_time_from: string;
  event_time_to: string;
  title: string;
  status_color?: string;
  patient_id: number;
  patient_name: string;
  services: any[]; // Changed from services: any;
  price: number;
  duration: number;
}

// export const events: SchedulerEvent[] = [
//   {
//     id: '1',
//     cabinet_id: 1,
//     doctor_id: 1,
//     assistant_id: null,
//     event_date: '2026-06-21',
//     start: '2026-06-21T09:00:00',
//     end: '2026-06-21T09:30:00',
//     event_time_from: '09:00',
//     event_time_to: '09:30',
//     title: 'Caries',
//     patient_id: 1,
//     patient_name: 'John Doe',
//   },
//   {
//     id: '2',
//     cabinet_id: 1,
//     doctor_id: 2,
//     assistant_id: null,
//     event_date: '2026-06-21',
//     start: '2026-06-21T09:15:00',
//     end: '2026-06-21T10:00:00',
//     event_time_from: '09:15',
//     event_time_to: '10:00',
//     title: 'Cleaning',
//     patient_id: 2,
//     patient_name: 'Jane Smith',
//   },
//   {
//     id: '3',
//     cabinet_id: 2,
//     doctor_id: 1,
//     assistant_id: null,
//     event_date: '2026-06-21',
//     start: '2026-06-21T10:00:00',
//     end: '2026-06-21T10:30:00',
//     event_time_from: '10:00',
//     event_time_to: '10:30',
//     title: 'Consultation',
//     patient_id: 3,
//     patient_name: 'Ivan Ivanov',
//   },
// ];
