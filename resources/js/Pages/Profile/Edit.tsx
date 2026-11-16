import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngProfile from '../../Lang/Profile/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import ListHeader from '../../Components/Common/ListHeader';
import { KeyRound, LucideMailBadge, Network, User } from 'lucide-react';

export default function Edit({ profile }: { profile: any }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngProfile,
    locale: appLang,
  });

  const { data, setData, processing, errors, setError, clearErrors } = useForm({
    id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Перевірка на збіг, якщо пароль взагалі вводився
    if (data.password && data.password !== data.password_confirmation) {
      setError(
        'password_confirmation',
        msg.get('auth.password_mismatch') || 'Passwords do not match'
      );
      return;
    }

    // 2. Формуємо об'єкт для відправки:
    // Якщо пароль не заповнений, краще взагалі не відправляти ці поля,
    // щоб бекенд їх не чіпав (і не вимагав хешування/валідації старого).
    const payload = {
      ...data,
    };

    router.post(`/profile/update?id=${profile.id}`, payload, {
      // Очищуємо поля паролів у стейті після успішного відправлення заради безпеки
      onSuccess: () => {
        setData((prev) => ({
          ...prev,
          password: '',
          password_confirmation: '',
        }));
      },
    });
  };

  return (
    <AuthenticatedLayout header={<Head title={'Taxes'} />}>
      <Head title={msg.get('profile.title')} />
      <div className="mx-auto px-2 sm:px-4 mt-[30px]">
        <ListHeader
          title={msg.get('profile.information')}
          count={null}
          totalLabel={null}
          description={msg.get('profile.information.descr')}
          onCreateClick={null}
          createLabel={msg.get('producer.create')}
          isCreateDisabled={false}
          createHref={null}
        />
        <form onSubmit={handleSubmit} className="mt-0 space-y-4 mb-4" encType="multipart/form-data">
          <div>
            <label
              htmlFor="first_name"
              className="mb-1.5 block text-xs font-semibold text-slate-700"
            >
              {msg.get('profile.first_name')}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                required
                placeholder={msg.get('auth.placeholder_first')}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.first_name && <p className="mt-1 text-xs text-rose-600">{errors.first_name}</p>}
          </div>

          <div className="mt-4">
            <label
              htmlFor="last_name"
              className="mb-1.5 block text-xs font-semibold text-slate-700"
            >
              {msg.get('profile.last_name')}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Network className="w-4 h-4" />
              </div>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                required
                placeholder={msg.get('auth.placeholder_last')}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.last_name && <p className="mt-1 text-xs text-rose-600">{errors.last_name}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
              {msg.get('profile.email')}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <LucideMailBadge className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                placeholder="arhistrat.pupkin@clinic.ua"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700">
              {msg.get('profile.password')}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder=""
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
              {/* Toggle Visibility */}
              <button
                type="button"
                aria-label="Показати/приховати пароль"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
          </div>

          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="mb-1.5 block text-xs font-semibold text-slate-700"
            >
              {msg.get('profile.password_confirmation')}
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-rose-600">{errors.password_confirmation}</p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton className="ms-4" disabled={processing}>
              {msg.get('profile.update')}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}