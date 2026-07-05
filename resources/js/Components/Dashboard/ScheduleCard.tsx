import { IconChevronCompactRight, IconClock } from '@tabler/icons-react';

const appointments = [
  {
    time: '09:00',
    patient: 'Анна Коваленко',
    doctor: 'Др. Іваненко',
    procedure: 'Професійна гігієна',
    color: 'bg-emerald-500',
  },
  {
    time: '10:30',
    patient: 'Максим Петренко',
    doctor: 'Др. Іваненко',
    procedure: 'Імплантація',
    color: 'bg-blue-500',
  },
  {
    time: '11:15',
    patient: 'Ірина Шевченко',
    doctor: 'Др. Коваль',
    procedure: 'Консультація',
    color: 'bg-orange-500',
  },
];

export default function ScheduleCard() {
  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Найближчі прийоми</h2>

          <p className="text-sm text-slate-500">Сьогодні</p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Усі
          <IconChevronCompactRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="
                flex
                items-center
                record-visit
                justify-between
                border-b-1
                py-2 px-4
                hover:bg-slate-50
                transition
            "
          >
            <div className="flex items-center gap-4 w-full">
              {/*<div className={`w-1.5 h-14 rounded-full ${appointment.color}`} />*/}
              <div className="flex items-center gap-2 text-slate-500">
                <IconClock size={16} />
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="w-1/4">
                <div className="font-semibold text-slate-800">
                  {appointment.patient}
                  <span className="block text-slate-400">+39088811131</span>
                </div>
              </div>
              <div className="w-1/4">
                <div className="text-slate-500">{appointment.procedure}</div>
              </div>
              <div className="w-1/4">
                <div className="text-black mt-1">
                  <b>{appointment.doctor}</b>
                  <span className="block text-slate-400">Кабінет 1</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
