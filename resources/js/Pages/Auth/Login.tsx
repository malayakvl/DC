import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Lang from 'lang.js';

import Checkbox from '../../Components/Form/Checkbox';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import GuestLayout from '../../Layouts/GuestLayout';
import { appLangSelector } from '../../Redux/Layout/selectors';
import lngAuth from '../../Lang/Auth/translation';

export default function Login({ status, canResetPassword }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAuth,
    locale: appLang,
  });

  const handleChange = (e) => {
    const { name, id, value, type, checked } = e.target;
    const key = name || id;
    const val = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));

    // Очищаємо помилку поля при вводі
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    axios
      .post('/login', values)
      .then((response) => {
        if (response.data.dashboardSelect) {
          window.location.href = '/dashboard-select';
        } else {
          window.location.href = '/dashboard';
        }
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else if (error.response.data.message) {
            setErrors({ general: error.response.data.message });
          }
        } else {
          console.error('ERROR:: ', error);
        }
      });
  };

  return (
    <GuestLayout>
      <Head title={msg.get('auth.login')} />

      {/* Decorative Blur Effect */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-brand-50 blur-2xl"></div>

      {/* Segmented Switcher / Tabs */}
      <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          className="flex-1 rounded-lg bg-white py-2 text-center text-xs font-bold text-slate-900 shadow-sm transition-all sm:text-sm"
        >
          {msg.get('auth.login')}
        </button>
        <Link
          href="/register"
          className="flex-1 rounded-lg py-2 text-center text-xs font-semibold text-slate-600 transition-all hover:text-slate-900 sm:text-sm"
        >
          Реєстрація
        </Link>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Вітаємо у кабінеті</h2>
        <p className="mt-1 text-xs text-slate-600 sm:text-sm">Увійдіть у ваш робочий простір</p>
      </div>

      {/* Status Message */}
      {status && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-200">
          {status}
        </div>
      )}

      {/* General Error Message */}
      {errors.general && (
        <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700 border border-rose-200">
          {errors.general}
        </div>
      )}

      {/* Quick Social Logins */}

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.email')}
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
              placeholder="doctor@clinic.ua"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.password')}
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
              value={values.password}
              onChange={handleChange}
              required
              placeholder="••••••••••••"
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

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
            <Checkbox
              name="remember"
              id="remember"
              checked={values.remember}
              onChange={handleChange}
            />
            <span>{msg.get('auth.remember')}</span>
          </label>

          {canResetPassword && (
            <Link
              href="/reset"
              className="font-semibold text-brand-700 hover:text-brand-800 hover:underline"
            >
              {msg.get('auth.forgot')}
            </Link>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <PrimaryButton
            className="w-full justify-center py-3 text-sm font-bold shadow-md shadow-brand-600/25"
            disabled={processing}
          >
            {processing ? 'Завантаження...' : msg.get('auth.login')}
          </PrimaryButton>
        </div>
      </form>

      {/* Security Footer Note */}
      <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Захищено шифруванням 256-bit • Сертифіковано МОЗ України</span>
      </div>
    </GuestLayout>
  );
}
