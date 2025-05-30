import InputError from '../../../Components/Form/InputError';
import InputLabel from '../../../Components/Form/InputLabel';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import TextInput from '../../../Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngProfile from '../../../Lang/Profile/translation';

export default function UpdatePasswordForm({ className = '' }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngProfile,
    locale: appLang,
  });

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  const updatePassword = e => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: errors => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2>{msg.get('profile.update.title')}</h2>

        <p className="mt-1 text-sm text-gray-600">
          {msg.get('profile.update.descr')}
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div>
          <InputLabel
            htmlFor="current_password"
            value={msg.get('profile.password.current')}
          />

          <TextInput
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={e => setData('current_password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
          />

          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <InputLabel
            htmlFor="password"
            value={msg.get('profile.password.new')}
          />

          <TextInput
            id="password"
            ref={passwordInput}
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel
            htmlFor="password_confirmation"
            value={msg.get('profile.password.confirm')}
          />

          <TextInput
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={e => setData('password_confirmation', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>
            {msg.get('profile.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">{msg.get('profile.saved')}</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
