import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import { Link } from '@inertiajs/react';
import lngCustomer from '../../Lang/Customer/translation';
import InputRoleSelect from '../../Components/Form/InputRoleSelect';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import { Transition } from '@headlessui/react';

import { InputColor } from '../../Components/Form/InputColor';

export default function AssignFilial({
  clinicData,
  filialData,
  rolesData,
  customer,
}) {
  const dispatch = useDispatch();
  const user = usePage().props.auth.user;
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngCustomer,
    locale: appLang,
  });
  const { processing, recentlySuccessful } = useForm();
  const [values, setValues] = useState({
    permissions: [],
  });

  const submit = e => {
    e.preventDefault();

    router.post(`/customer/assign-submit?id=${clinicData.id}`, {
      customerId: customer.id,
      clinicId: clinicData.id,
      values,
    });
  };

  return (
    <AuthenticatedLayout header={<Head title="Customers" />}>
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>
                    <Link className="icon-back" href={'/customers'}>
                      &nbsp;
                    </Link>
                    {msg.get('customer.attach')} «{customer.name}»
                  </h2>
                </div>
              </header>
            </section>
            <div>
              <form
                onSubmit={submit}
                className="mt-0 space-y-4"
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-4 gap-4">
                  {filialData?.map(item => (
                    <div key={item.id}>
                      <h5 className="text-lg font-bold text-[#f344b8]">{item.name}</h5>
                      <InputRoleSelect
                        name={`role_id_${item.id}`}
                        values={null}
                        options={rolesData}
                        onChange={e => {
                          let tmpPerm = values['permissions'];
                          const filialId = parseInt(e.target.id.replace('role_id_', ''));
                          const existingIdx = tmpPerm.findIndex(obj => obj.filial_id === filialId);
                          
                          if (existingIdx !== -1) {
                            if (parseInt(e.target.value) > 0) {
                              tmpPerm[existingIdx].role_id = e.target.value;
                            } else {
                              tmpPerm.splice(existingIdx, 1);
                            }
                          } else if (parseInt(e.target.value) > 0) {
                            tmpPerm.push({
                              filial_id: item.id,
                              role_id: e.target.value,
                              color: customer.color || '#000000'
                            });
                          }
                          setValues(values => ({
                            ...values,
                            permissions: [...tmpPerm],
                          }));
                        }}
                        required
                        label={msg.get('customer.role')}
                      />
                      <div className="relative mt-2">
                        <InputColor
                          defaultColor={customer.color || '#000000'}
                          name={`color_${item.id}`}
                          onChange={e => {
                            let tmpPerm = values['permissions'];
                            const filialId = parseInt(e.target.id.replace('color_', ''));
                            const existingIdx = tmpPerm.findIndex(obj => obj.filial_id === filialId);
                            if (existingIdx !== -1) {
                              tmpPerm[existingIdx].color = e.target.value;
                              setValues(values => ({
                                ...values,
                                permissions: [...tmpPerm],
                              }));
                            }
                          }}
                          label={msg.get('customer.color')}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-5">
                  <PrimaryButton disabled={processing}>
                    {msg.get('customer.save')}
                  </PrimaryButton>

                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-600">
                      {msg.get('customer.saved')}
                    </p>
                  </Transition>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
