import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, auth }) {
  return (
    <>
      <Head title="DentalCare system" />

      <div className="min-h-screen flex flex-col bg-slate-50/50">
        {/* Шапка сайта */}
        <Header auth={auth} />

        {/* Основной контент */}
        <main className="flex-grow flex items-center py-10 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-[100px]">
              {/* Левая колонка: Промо / Преимущества */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Бейдж */}
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                  Платформа нового покоління
                </div>

                {/* Заголовок */}
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
                  Почніть{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600">
                    безкоштовно
                  </span>
                  .<br />
                  Управління клінікою без рутини.
                </h1>

                {/* Описание */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
                  Створіть єдиний простір для всієї команди. Автоматизуйте онлайн-запис,
                  інтерактивну 3D зубну формулу, склад матеріалів та повний фінансовий аудит за 14
                  днів безкоштовного доступу.
                </p>

                {/* Карточки с фичами */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* Карточка 1 */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Пробний період
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">14 днів</div>
                    <p className="text-xs text-teal-700 font-medium mt-1">
                      Без прив&#39;язки картки
                    </p>
                  </div>

                  {/* Карточка 2 */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Лікарі та філії
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">Мережа клінік</div>
                    <p className="text-xs text-slate-700 font-medium mt-1">Централізований облік</p>
                  </div>

                  {/* Карточка 3 */}
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Готово до роботи
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">Імпорт за 1 хв</div>
                    <p className="text-xs text-teal-700 font-medium mt-1">З Excel або 1C</p>
                  </div>
                </div>

                {/* Социальное доказательство / Статистика */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-200/60">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      ОК
                    </div>
                    <div className="w-9 h-9 rounded-full ring-2 ring-white bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-800">
                      ДМ
                    </div>
                    <div className="w-9 h-9 rounded-full ring-2 ring-white bg-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-800">
                      СТ
                    </div>
                    <div className="w-9 h-9 rounded-full ring-2 ring-white bg-slate-900 flex items-center justify-center text-xs font-semibold text-white">
                      +240
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    <span className="font-bold text-slate-800">240+ клінік</span> уже підключено в
                    Україні •{' '}
                    <span className="text-emerald-700 font-semibold">99.9% доступність</span>
                  </div>
                </div>
              </div>

              {/* Правая колонка: Форма авторизации/регистрации из children */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-50 rounded-full blur-2xl pointer-events-none" />

                  {/* Сюда подставляется сама страница (Login / Register / ForgotPassword) */}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Подвал */}
        <Footer />
      </div>
    </>
  );
}
