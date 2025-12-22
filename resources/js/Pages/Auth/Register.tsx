import InputError from '../../Components/Form/InputError';
import InputLabel from '../../Components/Form/InputLabel';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import TextInput from '../../Components/Form/TextInput';
import GuestLayout from '../../Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAuth from '../../Lang/Auth/translation';


export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
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

  const submit = e => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit} className="dark-form">
        <div>
          <InputLabel htmlFor="name" value={msg.get('auth.first_name')} />

          <TextInput
            id="first_name"
            name="fitst_name"
            value={data.name}
            className="input-text"
            isFocused={true}
            onChange={e => setData('first_name', e.target.value)}
            required
          />

          <InputError message={errors.first_name} className="mt-2" />
        </div>


        <div>
          <InputLabel htmlFor="last_name" value={msg.get('auth.last_name')} />

          <TextInput
            id="last_name"
            name="last_name"
            value={data.name}
            className="input-text"
            isFocused={true}
            onChange={e => setData('last_name', e.target.value)}
            required
          />

          <InputError message={errors.last_name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value={msg.get('auth.email')} />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="input-text"
            autoComplete="username"
            onChange={e => setData('email', e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value={msg.get('auth.password')} />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="input-text"
            autoComplete="new-password"
            onChange={e => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value={msg.get('auth.confirm_password')}
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="input-text"
            autoComplete="new-password"
            onChange={e => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-[#01bffb] underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {msg.get('auth.already_registered')}
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            {msg.get('auth.register')}
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
