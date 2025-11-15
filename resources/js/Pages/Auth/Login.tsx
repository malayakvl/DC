import Checkbox from '../../Components/Form/Checkbox';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import InputText from '../../Components/Form/InputText';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAuth from '../../Lang/Auth/translation';
import axios from 'axios';

export default function Login({ status, canResetPassword }) {
  const { processing } = useForm({});
  const [values, setValues] = useState({
    name: '',
    password: '',
    remember: '',
  });
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAuth,
    locale: appLang,
  });

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const submit = e => {
    e.preventDefault();
    // post(route('password.confirm'), {
    //     onFinish: () => reset('password'),
    // });
    axios
      .post('/login', values)
      .then(response => {
        if (response.data.dashboardSelect) {
          location.href = '/dashboard-select';
        } else {
          location.href = '/dashboard';
        }
      })
      .catch(error => {
        console.log('ERROR:: ', error.response.data);
      });
    // router.post(`/login`, values);
  };

  return (
    <GuestLayout>
      <Head title={msg.get('auth.login')} />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit} className="dark-form">
        <div>
          <InputText
            name={'email'}
            type="email"
            values={values}
            onChange={handleChange}
            label={msg.get('auth.email')}
            required
          />
          
        </div>
        <div className="mt-2">
          <InputText
            name={'password'}
            type="password"
            values={values}
            onChange={handleChange}
            required
            label={msg.get('auth.password')}
          />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={values.remember}
              onChange={
                e => handleChange(e)
                // setData('remember', e.target.checked)
              }
            />
            <span className="ms-2 text-sm text-[#01bffb]">
              {msg.get('auth.remember')}
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link
              // href={route('password.request')}
              href={'/reset'}
              className="rounded-md text-sm text-[#01bffb] underline hover:text-[#9562dd] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {msg.get('auth.forgot')}
            </Link>
          )}

          <PrimaryButton className="ms-4" disabled={processing}>
            {msg.get('auth.login')}
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
