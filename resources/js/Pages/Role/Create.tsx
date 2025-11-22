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
import { PERMISSION_CATEGORIES } from '../../Constants/Permissions';

export default function Create({ clinicData, permissionData }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngRole,
    locale: appLang,
  });

  const { processing, recentlySuccessful } = useForm();

  const [values, setValues] = useState({
    name: '',
    permissions: [],
  });

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handlePermission = el => {
    const tmpPermis = [...values.permissions]; // Create a copy to avoid mutation
    const permissionId = parseInt(el.id);
    
    if (el.checked) {
      // Only add if not already present
      if (!tmpPermis.includes(permissionId)) {
        tmpPermis.push(permissionId);
      }
    } else {
      const index = tmpPermis.indexOf(permissionId);
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
    router.post(`/role/store`, values);
  };

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
                    {msg.get('role.title.create')}
                  </h2>
                </div>
              </header>
            </section>
            <div>
              <div className="p-0 mb-8 content-data bg-content">
                <div className={'w-full mb-5'}>
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
                  {/* Using a grid layout to evenly distribute permission categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PERMISSION_CATEGORIES.map((colName, i) => {
                      const filteredPermissions = permissionData && 
                        permissionData.filter(item => item.name.includes(colName));
                      
                      // Only render category if it has permissions
                      if (!filteredPermissions || filteredPermissions.length === 0) {
                        return null;
                      }
                      
                      return (
                        <div key={colName} className="permission-block">
                          <h3 className="role-name-head">
                            {colName.replace('-', ' ')}
                          </h3>
                          <div className="space-y-2">
                            {filteredPermissions.map(_p => {
                              const permissionId = parseInt(_p.id);
                              const isChecked = values['permissions'].includes(permissionId);
                              return (
                                <div 
                                  key={_p.id}
                                  className={
                                    _p.name === 'clinic-delete'
                                      ? 'flex items-center'
                                      : 'flex items-center'
                                  }
                                >
                                  <Checkbox
                                    id={`${_p.id}`}
                                    name={`remember[${_p.id}]`}
                                    className="permission-checkbox"
                                    checked={isChecked}
                                    onChange={e => {
                                      handlePermission(e.target);
                                    }}
                                  />
                                  <label htmlFor={`${_p.id}`} className="ml-2 text-sm role-label">
                                    {msg.get(`role.${_p.name}`)}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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