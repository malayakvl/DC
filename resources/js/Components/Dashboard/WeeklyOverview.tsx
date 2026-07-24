import { TrendingUp, Wallet, Users, CalendarDays, Star } from 'lucide-react';

const stats = [
  {
    title: 'Дохід',
    value: '₴128 450',
    icon: Wallet,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Прийомів',
    value: '74',
    icon: CalendarDays,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Нових пацієнтів',
    value: '18',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Середній рейтинг',
    value: '4.9',
    icon: Star,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
];

export default function WeeklyOverview() {
  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Огляд за цей тиждень</h2>

          <p className="text-sm text-slate-500">Загальна статистика клініки</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
          <TrendingUp size={16} />
          +18%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-slate-50 p-5 hover:bg-slate-100 transition"
            >
              <div className="flex flex-row">
                <div
                  className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                >
                  <Icon className={item.color} size={22} />
                </div>

                <div className="text-2xl font-bold text-slate-800 ml-1 mt-1">{item.value}</div>
              </div>

              <div className="text-sm text-slate-500 mt-1">{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
