import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngRole from '../../Lang/Role/translation';
import { Link } from '@inertiajs/react';
import InputText from '../../Components/Form/InputText';
import InputLabel from '../../Components/Form/InputLabel';
import Checkbox from '../../Components/Form/Checkbox';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Create({ roleData, permissionData, rolePermissions }) {
  const dispatch = useDispatch();
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const [values, setValues] = useState({
    name: roleData.name,
    permissions: rolePermissions,
  });
  const { processing, recentlySuccessful } = useForm();

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handlePermission = el => {
    const tmpPermis = values.permissions;
    if (el.checked) {
      tmpPermis.push(parseInt(el.id));
    } else {
      const index = tmpPermis.indexOf(parseInt(el.id));
      if (index > -1) {
        // only splice array when item is found
        tmpPermis.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setValues(values => ({
      ...values,
      ['permissions']: tmpPermis,
    }));
  };

  const submit = e => {
    e.preventDefault();
    router.post(`/role/update?id=${roleData.id}`, values);
  };
  const permCol = [
    'clinic',
    'filial',
    'customer',
    'store',
    'invoice-incoming',
    'invoice-outgoing',
    'invoice-exchange',
    'schedule',
    'price',
    'cabinet',
    'import'
  ];

  return (
    <AuthenticatedLayout header={<Head title="Roles" />}>
      <Head title="Roles" />
      <div className="py-0">
        <form
          onSubmit={submit}
          className="mt-0 space-y-4"
          encType="multipart/form-data"
        >
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>
                    <Link className="icon-back" href={'/roles'}>
                      &nbsp;
                    </Link>
                    {msg.get('role.title.edit')}
                  </h2>
                </div>
              </header>
            </section>
            <div>
              <div className="p-4 sm:p-8 mb-8 content-data bg-content">
                <div
                  className={`w-full mb-5 ${!roleData.clinic_id ? 'disabled-content-block' : ''}`}
                >
                  <InputText
                    name={'name'}
                    values={values}
                    value={values.name}
                    onChange={handleChange}
                    required
                    label={msg.get('role.name')}
                  />
                </div>
                <div>
                  <div className="grid-p">
                    {permCol.map((colName, i) => (
                      <div className="mb-[20px]">
                        {permissionData &&
                          permissionData
                            .filter(item => item.name.includes(colName))
                            .map(_p => (
                              <div>
                                <Checkbox
                                  id={`${_p.id}`}
                                  name={`remember[${_p.id}]`}
                                  checked={values['permissions'].includes(
                                    _p.id
                                  )}
                                  onChange={e => {
                                    handlePermission(e.target);
                                  }}
                                />
                                <label htmlFor={`${_p.id}`}>
                                  <span className="ms-2 text-sm text-gray-600">
                                    {msg.get(`role.${_p.name}`)}
                                  </span>
                                </label>
                              </div>
                            ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="flex items-center mt-5">
                  <Link
                    className="btn-back"
                    title={msg.get('role.back')}
                    href={`/roles`}
                  >
                    {msg.get('role.back')}
                  </Link>
                  <PrimaryButton disabled={processing}>
                    {msg.get('role.save')}
                  </PrimaryButton>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-600">
                      {msg.get('role.saved')}
                    </p>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
