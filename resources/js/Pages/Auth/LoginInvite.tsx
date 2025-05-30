import Checkbox from '../../Components/Form/Checkbox';
import InputError from '../../Components/Form/InputError';
import InputLabel from '../../Components/Form/InputLabel';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import TextInput from '../../Components/Form/TextInput';
import InviteLayout from '../../Layouts/InviteLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Lang from 'lang.js';
import lngClinic from '../../Lang/Clinic/translation';
import InputText from '../../Components/Form/InputText';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';

export default function LoginInvite({ status, clinicData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngClinic,
    locale: appLang,
  });

  const { errors, processing } = usePage().props;
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
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

    router.post(`/login-clinic`, values);

    // post(route('login'), {
    //     onFinish: () => reset('password'),
    // });
  };

  return (
    <InviteLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}
      <div>
        <h3>
          {msg.get('clinic.title.login')} «{clinicData.name}»
        </h3>
      </div>

      <form onSubmit={submit}>
        <div>
          <InputText
            name={'email'}
            values={values}
            onChange={handleChange}
            required
            label={msg.get('clinic.email')}
          />
          <InputText
            type="password"
            name="password"
            values={values}
            autoComplete="current-password"
            label={msg.get('clinic.password')}
            onChange={handleChange}
          />
          <input type="hidden" name="clinic_id" value={clinicData.id}></input>
        </div>

        {/*<div className="mt-4">*/}
        {/*    <InputLabel htmlFor="password" value="Password" />*/}

        {/*    */}

        {/*    <InputError message={errors.password} className="mt-2" />*/}
        {/*</div>*/}

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={values.remember}
              onChange={e =>
                setValues(values => ({
                  ...values,
                  ['remember']: e.target.checked,
                }))
              }
            />
            <span className="ms-2 text-sm text-gray-600">
              {msg.get('clinic.remember')}
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {/*{canResetPassword && (*/}
          {/*    <Link*/}
          {/*        href={route('password.request')}*/}
          {/*        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
          {/*    >*/}
          {/*        Forgot your password?*/}
          {/*    </Link>*/}
          {/*)}*/}

          <PrimaryButton className="ms-4" disabled={processing}>
            {msg.get('clinic.login')}
          </PrimaryButton>
        </div>
      </form>
    </InviteLayout>
  );
}
