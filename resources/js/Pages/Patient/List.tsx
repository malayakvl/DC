import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import Filters from './Partials/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from './Partials/Pagination'
import {
  faPersonWalking,
  faEdit,
  faEuro,
  faFolder,
  faList,
  faCopy,
  faTooth
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';

export default function List({ listData, clinicData, currency }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('patient.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="inline-flex">
                  <h2>{msg.get('patient.title.list')}</h2>
                  <div className="pl-5 mt-2">
                    <PrimaryButton>
                      <NavLink href={'/patient/create'}>
                        {msg.get('patient.title.create')}
                      </NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>

            {/*Filters*/}
            <Filters />

            {/*Pagination*/}
            <Pagination listData={listData} />

            <ul className="mt-5">
              {listData.data?.map(item => (
                <li
                  className={`patient-item grid grid-cols-1 place-content-between ${item.discount ? 'bg-discount' : ''}`}  
                  key={item.id}
                >
                  <Link href={`/patient/view/${item.id}`}>
                    <div className="inline-flex">
                      <div className="relative">
                        {item.avatar ? (
                          <img
                            className='p-photo'
                            src={`/uploads/patients/${item.avatar}`}
                            width="auto"
                            height="60"
                          />
                        ) : (
                          <div className='p-photo flex items-center justify-center rounded-full p-abbr font-bold' style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                            {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="ml-3 mt-3">
                          {item.first_name} {item.last_name}
                        </span>
                        <i className="phone-patient">{item.phone}</i>
                        {item.discount ? <i className="discount-patient">{item.discount}%</i> : null}
                        <span className="ml-3 mt-3 text-[13px]">
                          <b>{msg.get('patient.worked.at')}:</b> <span className="text-kt">{item.kt_balance}{currency}&nbsp;</span>
                          <b>{msg.get('patient.payed.at')}:</b> <span className="text-dt">{item. dt_balance}{currency}&nbsp;</span>
                          {item.kt_balance > item.dt_balance && <span className='p-dept'><b>{msg.get('patient.dept.at')}:</b> <span className="text-debt">{item.kt_balance - item.dt_balance}{currency}</span></span>}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="icon-block">
                    <Link href="/patient/documents">
                      <FontAwesomeIcon style={{ color: 'white' }} icon={faCopy} className="mr-5" title={msg.get('patient.list.documents')} />
                    </Link>
                    <Link href="/patient/visits">
                      <FontAwesomeIcon
                        icon={faPersonWalking} 
                        style={{ color: 'white' }}
                        title={msg.get('patient.list.visits')}
                        className="mr-5 font-gra"
                      />
                    </Link>
                    <Link href="/patient/plans">
                      <FontAwesomeIcon icon={faList} style={{ color: 'white' }} className="mr-5" />
                    </Link>
                    <Link href={`/patient/view/${item.id}`}>
                      <FontAwesomeIcon icon={faTooth} style={{ color: 'white' }} className="mr-5" title={msg.get('patient.list.history')} />
                    </Link>
                    <Link href={`/patient/finances/${item.id}`}>
                      <FontAwesomeIcon icon={faEuro} style={{ color: 'white' }} className="mr-5" title={msg.get('patient.list.payment')} />
                    </Link>
                    <Link href={`patient/edit/${item.id}`}>
                      <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} className="mr-5" title={msg.get('patient.list.edit')} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <Pagination listData={listData} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
