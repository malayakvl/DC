import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
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
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });
  const [confirmingCategory, setConfirmingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const closeModal = () => {
    clearErrors();
    reset();
  };

  const submitForm = () => {
    router.post(`/price-category/update`, {
      name: categoryName,
      clinic_id: clinicData.id,
    });
    setConfirmingCategory(false);
  };

  const renderPriceBlock = (item, num) => {
    // let bgColor =  ((Math.random().toString(16) + '000000').substring(2, 8).toUpperCase());

    return (
      <>
        <div className={`price-container pr-${num}`}>
          <b className="mb-4 block">{item.name}</b>
          {services[item.id]?.map((_item, _index) => (
            <Link href={`pricing/edit/${_item.id}`}>
              <div
                className={`mt-0 price-row ${_index === 0 ? 'first-child' : ''}`}
              >
                <div className="inline-block">
                  <span className="px-[5px] py-[4px] ">{_item.name}</span>
                </div>
                <div className="price-value">
                  <span className="px-[5px] py-[4px] ">
                    {_item.price} {currency}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="mt-4">
            <div className="price-btn">
              <NavLink href={'/pricing/create'}>
                {msg.get('mCategories.add.price')}
              </NavLink>
            </div>
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
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('mCategories.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <a onClick={() => setConfirmingCategory(true)} href={'#'}>
                        {msg.get('mCategories.create')}
                      </a>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <div className="mt-6">
              {tree?.map((item, index) => <>{renderPriceBlock(item, index)}</>)}
            </div>
          </div>
        </div>
        <Modal show={confirmingCategory} onClose={closeModal}>
          <form className="p-6 bg-black">
            <h2>
              {msg.get('mCategories.create')}
            </h2>

            <div className="mt-0">
              <InputLabel
                htmlFor="password"
                value="Password"
                className="sr-only"
              />
              <InputText
                name={'name'}
                values={''}
                dataValue={''}
                value={''}
                onChange={e => setCategoryName(e.target.value)}
                required
                label={msg.get('mCategories.name')}
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
                {msg.get('mCategories.close')}
              </SecondaryButton>

              <SecondaryButton
                className="ms-3 btn-submit"
                disabled={processing}
                onClick={() => submitForm()}
              >
                {msg.get('mCategories.save')}
              </SecondaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </AuthenticatedLayout>
  );
}
