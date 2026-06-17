import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngServiceCategories from '../../Lang/Services/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import { Link } from '@inertiajs/react';
import InputLabel from '../../Components/Form/InputLabel';
import InputError from '../../Components/Form/InputError';
import SecondaryButton from '../../Components/Form/SecondaryButton';
import Modal from '../../Components/Modal/Modal';
import InputText from '../../Components/Form/InputText';

export default function List({ clinicData, tree, services, currency }) {
  useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });
  const [confirmingCategory, setConfirmingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const { processing, reset, errors, clearErrors } = useForm({
    password: '',
  });

  const closeModal = () => {
    clearErrors();
    reset();
  };

  const submitForm = () => {
    router.post(`/service-category/update`, {
      name: categoryName,
      clinic_id: clinicData.id,
    });
    setConfirmingCategory(false);
  };

  const renderPriceBlock = (item) => {
    return (
      <>
        <div className="price-container">
          <b className="service-category-title">{item.name}</b>

          {services[item.id]?.map((_item) => (
            <Link key={_item.id} href={`service/edit/${_item.id}`} className="service-link">
              <div className="service-card">
                <div className="service-info">{_item.name}</div>

                <div className="service-meta">
                  <span className="service-price">
                    {_item.total_price} {currency}
                  </span>

                  <span className="service-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}

          <div className="mt-4">
            <NavLink href="/service/create" className="price-btn">
              {msg.get('service.add')}
            </NavLink>
          </div>
        </div>
      </>
    );
    // return Math.random().toString(16) + '000000'.substring(2, 8).toUpperCase()
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Services'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <header>
              <div className="flex inline-flex w-full mb-4">
                <h2 className="text-xl font-semibold leading-tight">
                  {msg.get('service.title.list')}
                </h2>
                <div className="flex-1 text-right mt-[5px]">
                  <PrimaryButton>
                    <a onClick={() => setConfirmingCategory(true)} href={'#'}>
                      {msg.get('service.create')}
                    </a>
                  </PrimaryButton>
                </div>
              </div>
            </header>
            <div className="mt-6">{tree?.map((item) => <>{renderPriceBlock(item)}</>)}</div>
          </div>
        </div>
        <Modal show={confirmingCategory} onClose={closeModal}>
          <form className="p-6 bg-black">
            <h2>{msg.get('service.create')}</h2>

            <div className="mt-0">
              <InputLabel htmlFor="password" value="Password" className="sr-only" />
              <InputText
                name={'name'}
                values={''}
                dataValue={''}
                value={''}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                label={msg.get('service.name')}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end">
              <SecondaryButton
                onClick={() => {
                  setConfirmingCategory(false);
                  closeModal();
                }}
              >
                {msg.get('service.close')}
              </SecondaryButton>

              <SecondaryButton
                className="ms-3 btn-submit"
                disabled={processing}
                onClick={() => submitForm()}
              >
                {msg.get('service.save')}
              </SecondaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </AuthenticatedLayout>
  );
}
