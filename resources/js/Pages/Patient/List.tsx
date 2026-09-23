import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import Filters from './Partials/Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from './Partials/Pagination';
import {
  faPersonWalking,
  faEdit,
  faEuro,
  faList,
  faTooth,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import ListHeader from '../../Components/Common/ListHeader';

export default function List({ listData, currency }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  console.log('List data', listData.data.length);
  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={msg.get('patient.title.list')} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-4 mb-8 content-data bg-content">
            <ListHeader
              title={msg.get('patient.title.list')}
              count={listData.data.length || 0}
              totalLabel={msg.get('patient.title.total')}
              description={msg.get('patient.title.description')}
              createHref="patient/create"
              createLabel={msg.get('patient.title.create')}
            />

            <Filters />

            <Pagination listData={listData} />

            <ul className="patient-list mt-5">
              {listData.data?.map((item) => (
                <li key={item.id} className={`patient-item ${item.discount ? 'bg-discount' : ''}`}>
                  <Link href={`/patient/view/${item.id}`} className="patient-main">
                    <div className="patient-avatar-wrap">
                      {item.avatar ? (
                        <img
                          className="patient-avatar"
                          src={`/uploads/patients/${item.avatar}`}
                          alt=""
                        />
                      ) : (
                        <div className="patient-avatar patient-abbr">
                          {item.patient_name
                            ?.split(' ')
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}

                      {item.discount && <span className="discount-badge">{item.discount}%</span>}
                    </div>

                    <div className="patient-info">
                      <div className="patient-name">{item.patient_name}</div>

                      <div className="patient-phone">{item.primary_phone}</div>

                      <div className="patient-finance">
                        <span className="finance worked">
                          {msg.get('patient.worked.at')}: {item.sum_acts}
                          {currency}
                        </span>

                        <span className="finance paid">
                          {msg.get('patient.payed.at')}: {item.sum_payments}
                          {currency}
                        </span>

                        {item.sum_acts > item.sum_payments && (
                          <span className="finance debt">
                            {msg.get('patient.dept.at')}:{item.sum_acts - item.sum_payments}
                            {currency}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="patient-actions">
                    <Link href="/patient/visits" className="action-btn">
                      <FontAwesomeIcon icon={faPersonWalking} />
                    </Link>

                    <Link href="/patient/plans" className="action-btn">
                      <FontAwesomeIcon icon={faList} />
                    </Link>

                    <Link href={`/patient/view/${item.id}`} className="action-btn">
                      <FontAwesomeIcon icon={faTooth} />
                    </Link>

                    <Link href={`/patient/finances/${item.id}`} className="action-btn">
                      <FontAwesomeIcon icon={faEuro} />
                    </Link>

                    <Link href={`/patient/edit/${item.id}`} className="action-btn">
                      <FontAwesomeIcon icon={faEdit} />
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
