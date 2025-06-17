import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
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
  });
  const [hideFields, setHideFields] = useState(false);
  const [_, setCustomerColor] = useState('#000000');
  const colorSettings = useSelector(paletterDataSelector);
  const serchResults = useSelector(userSearchResultsSelector);
  const { processing, recentlySuccessful } = useForm();


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

  return (
    <AuthenticatedLayout header={<Head title="Import" />}>
      <Head title={msg.get('import.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="">
                  <h2 className={'w-full'}>{msg.get('import.title.list')}</h2>
                  <div>
                    <input type="radio" id={'patients'} name="address" value={'patients'} />
                    <label for={'patients'} className={'ml-2'}>{msg.get('import.patients')}</label>
                  </div>
                  <div>
                    <input type="radio" id={'patients'} name="address" value={'customers'} />
                    <label htmlFor={'customers'} className={'ml-2'}>{msg.get('import.customers')}</label>
                  </div>
                  <div>
                    <input type="radio" id={'patients'} name="address" value={'dia'} />
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
              </header>
            </section>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
