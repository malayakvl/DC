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

export default function AssignFilialEdit({
  clinicData,
  filialData,
  rolesData,
  customer,
  assignedData,
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
    permissions: assignedData,
  });

  const handleChange = (pId, pValue) => {
    const tmpPermis = values['permissions'];
    tmpPermis.push({ filial_id: pId, role_id: pValue });
    setValues(values => ({
      ...values,
      ['permissions']: tmpPermis,
    }));
  };

  const submit = e => {
    e.preventDefault();
    router.post(`/customer/assign-submit`, {
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
                      <h5>{item.name}</h5>
                      <InputRoleSelect
                        name={`role_id_${item.id}`}
                        values={assignedData.find(
                          _data => _data.filial_id === item.id
                        )}
                        options={rolesData}
                        onChange={e => {
                          let tmpPerm = values['permissions'];
                          const filialId = e.target.id.replace('role_id_', '');
                          const _tmpPerm = tmpPerm.filter(function (obj) {
                            return obj.filial_id !== parseInt(filialId);
                          });
                          if (parseInt(e.target.value) > 0) {
                            _tmpPerm.push({
                              filial_id: item.id,
                              role_id: e.target.value,
                            });
                          }
                          tmpPerm = _tmpPerm;
                          setValues(values => ({
                            ...values,
                            ['permissions']: tmpPerm,
                          }));
                        }}
                        required
                        label={msg.get('customer.role')}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center mt-5">
                  <Link
                    className="btn-back"
                    title={msg.get('customer.back')}
                    href={`/customers`}
                  >
                    {msg.get('customer.back')}
                  </Link>
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
