import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngImport from '../../Lang/Import/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import InputError from '../../Components/Form/InputError';
import { paletterDataSelector } from '../../Redux/Staff/selectors';
import { userSearchResultsSelector } from '../../Redux/Clinic/selectors';
import { Transition } from '@headlessui/react';

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
    type: ''
  });
  const [hideFields, setHideFields] = useState(false);
  const [importType, setImportType] = useState('');
  const colorSettings = useSelector(paletterDataSelector);
  const serchResults = useSelector(userSearchResultsSelector);
  // const { processing, recentlySuccessful } = useForm();
  const { data, setData, processing, post, recentlySuccessful, progress } =
    useForm({
      file: null,
      type: null,
    });


  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  const handleChangeFile = e => {
    const key = e.target.id;
    setValues(values => ({
      ...values,
      [key]: e.target.files[0],
    }));
  };

  const submit = e => {
    e.preventDefault();
    values['type'] = importType;
    console.log(values);
    router.post(`/import/save`, values);
    // post(route('import.update'));
  };

console.log(values)
  return (
    <AuthenticatedLayout header={<Head title="Import" />}>
      <Head title={msg.get('import.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <form
              onSubmit={submit}
              className="mt-0 w-full"
              encType="multipart/form-data"
            >
            <section>
                <div className="">
                  <h2 className={'w-full'}>{msg.get('import.title.list')}</h2>
                  <div>
                    <input type="radio" id={'patients'} onClick={() => setImportType('patients')} name="type" value={'patients'} />
                    <label for={'patients'} className={'ml-2'}>{msg.get('import.patients')}</label>
                  </div>
                  <div>
                    <input type="radio" id={'patients'} onClick={() => setImportType('dia')} name="type" value={'customers'} />
                    <label htmlFor={'customers'} className={'ml-2'}>{msg.get('import.customers')}</label>
                  </div>
                  <div>
                    <input type="radio" id={'patients'} onClick={() => setImportType('dia')} name="type" value={'dia'} />
                    <label htmlFor={'dia'} className={'ml-2'}>{msg.get('import.dia')}</label>
                  </div>

                  <div className="mt-2">
                    <div className="input-container">
                      <input
                        type="file"
                        id="file"
                        className="w-full px-0 py-0 mt-4"
                        style={{width: '100px', height: '40px', color: '#fff'}}
                        name="file"
                        onChange={handleChangeFile}
                      />
                      <InputError className="mt-2" message={errors.file} />
                    </div>
                    {/*<PrimaryButton>*/}
                    {/*  <NavLink href={'/role/create'}>*/}
                    {/*    {msg.get('import.customers')}*/}
                    {/*  </NavLink>*/}
                    {/*</PrimaryButton>*/}
                  </div>
                  {/*<div className="pl-5 mt-2">*/}
                  {/*  <PrimaryButton>*/}
                  {/*    <NavLink href={'/role/create'}>*/}
                  {/*      {msg.get('import.patients')}*/}
                  {/*    </NavLink>*/}
                  {/*  </PrimaryButton>*/}
                  {/*</div>*/}
                </div>
              <div className="flex items-center mt-[20px]">
                <PrimaryButton disabled={processing}>
                  {msg.get('import.save')}
                </PrimaryButton>

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
