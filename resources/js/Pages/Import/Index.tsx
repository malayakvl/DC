import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import { setDataLoadingAction } from '@/Redux/Layout';
import Lang from 'lang.js';
import lngImport from '../../Lang/Import/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import InputError from '../../Components/Form/InputError';
import { Transition } from '@headlessui/react';
import { toast } from 'react-toastify';

export default function Index() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);

  const msg = new Lang({
    messages: lngImport,
    locale: appLang,
  });
  const { errors } = usePage().props;
  const [values, setValues] = useState({
    file: null,
    type: '',
  });
  const [importType, setImportType] = useState('');
  const { processing, recentlySuccessful } = useForm({
    file: null,
    type: null,
  });
  const handleChangeFile = (e) => {
    const key = e.target.id;
    setValues((values) => ({
      ...values,
      [key]: e.target.files[0],
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    values['type'] = importType;

    // Set loading state to true
    dispatch(setDataLoadingAction(true));

    router.post(`/import/save`, values, {
      onSuccess: () => {
        // Set loading state to false
        dispatch(setDataLoadingAction(false));
        toast.success(msg.get('import.success_message') || 'File uploaded successfully!', {
          theme: 'colored',
          position: 'top-right',
          autoClose: 5000,
        });
      },
      onError: () => {
        // Set loading state to false
        dispatch(setDataLoadingAction(false));
        toast.error(msg.get('import.error_message') || 'File upload failed!', {
          theme: 'colored',
          position: 'top-right',
          autoClose: 5000,
        });
      },
    });
  };

  return (
    <AuthenticatedLayout header={<Head title="Import" />}>
      <Head title={msg.get('import.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <form onSubmit={submit} className="mt-0 w-full" encType="multipart/form-data">
              <section>
                <div className="">
                  <header>
                    <div className="flex inline-flex w-full mb-4">
                      <h2 className="text-xl font-semibold leading-tight">
                        {msg.get('import.title.list')}
                      </h2>
                    </div>
                  </header>
                </div>
              </section>
              <section className="table-card">
                <div>
                  <input
                    type="radio"
                    id={'customers'}
                    onClick={() => setImportType('customers')}
                    name="type"
                    value={'customers'}
                  />
                  <label
                    htmlFor={'customers'}
                    onClick={() => setImportType('customers')}
                    className={'ml-2 text-[14px]'}
                  >
                    {msg.get('import.customers')}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={'patients'}
                    onClick={() => setImportType('patients')}
                    name="type"
                    value={'patients'}
                  />
                  <label
                    htmlFor={'patients'}
                    onClick={() => setImportType('patients')}
                    className={'ml-2 text-[14px]'}
                  >
                    {msg.get('import.patients')}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={'dia'}
                    onClick={() => setImportType('dia')}
                    name="type"
                    value={'dia'}
                  />
                  <label
                    htmlFor={'dia'}
                    onClick={() => setImportType('dia')}
                    className={'ml-2 text-[14px]'}
                  >
                    {msg.get('import.dia')}
                  </label>
                </div>

                <div className="mt-2">
                  <div className="input-container">
                    <input
                      type="file"
                      id="file"
                      className="w-full px-0 py-0 mt-4"
                      style={{ width: '100px', height: '40px', color: '#fff' }}
                      name="file"
                      onChange={handleChangeFile}
                    />
                    <InputError className="mt-2" message={errors.file} />
                  </div>
                </div>
                <div className="flex items-center mt-[20px]">
                  <PrimaryButton disabled={processing}>{msg.get('import.save')}</PrimaryButton>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-600">{msg.get('import.processing')}</p>
                  </Transition>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
