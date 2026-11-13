import PrimaryButton from '../../Components/Form/PrimaryButton';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAuth from '../../Lang/Auth/translation';
import React from 'react';
import { User, Network, KeySquare, LucideMailBadge, KeyRound } from 'lucide-react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<any>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAuth,
    locale: appLang,
  });

  const submit = (e: any) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
        <Link
          href="/login"
          className="flex-1  rounded-lg py-2 text-center text-xs font-semibold text-slate-600 transition-all hover:text-slate-900 sm:text-sm"
        >
          {msg.get('auth.login')}
        </Link>
        <button
          type="button"
          className="flex-1 bg-white rounded-lg  py-2 text-center text-xs font-bold text-slate-900 shadow-sm transition-all sm:text-sm"
        >
          {msg.get('auth.register_tab')}
        </button>
      </div>
      <form onSubmit={submit} className="">
        <div>
          <label htmlFor="first_name" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.first_name')}
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
              onChange={(e: any) => setData('first_name', e.target.value)}
              required
              placeholder={msg.get('auth.placeholder_first')}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.first_name && <p className="mt-1 text-xs text-rose-600">{errors.first_name}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="last_name" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.last_name')}
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
              onChange={(e: any) => setData('last_name', e.target.value)}
              required
              placeholder={msg.get('auth.placeholder_last')}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.last_name && <p className="mt-1 text-xs text-rose-600">{errors.last_name}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.email')}
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
              onChange={(e: any) => setData('email', e.target.value)}
              required
              placeholder="arhistrat.pupkin@clinic.ua"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="last_name" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.password')}
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <KeySquare className="w-4 h-4" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e: any) => setData('password', e.target.value)}
              required
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="last_name" className="mb-1.5 block text-xs font-semibold text-slate-700">
            {msg.get('auth.password')}
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
              onChange={(e: any) => setData('password_confirmation', e.target.value)}
              required
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.password_confirmation && (
            <p className="mt-1 text-xs text-rose-600">{errors.password_confirmation}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ms-4" disabled={processing}>
            {msg.get('auth.register')}
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
