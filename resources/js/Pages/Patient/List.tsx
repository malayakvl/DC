import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../Lang/Patient/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonWalking,
  faEdit,
  faEuro,
  faFolder,
  faList,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';

export default function List({ listData, permissions }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

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
            <ul className="mt-5">
              {listData?.map(item => (
                <li
                  className="patient-item grid grid-cols-1 place-content-between"
                  key={item.id}
                >
                  <Link href={`/patient/view/${item.id}`}>
                    <div className="inline-flex">
                      {item.avatar ? (
                        <img
                          src={`/uploads/patients/${item.avatar}`}
                          width="45"
                          height="45"
                        />
                      ) : (
                        <img
                          src={`/images/patients/patient-avatar.jpg`}
                          width="45"
                          height="45"
                        />
                      )}
                      <div>
                        <span className="ml-3 mt-3">
                          {item.first_name} {item.last_name}
                        </span>
                        <i className="phone-patient">{item.phone}</i>
                      </div>
                    </div>
                  </Link>
                  <div className="icon-block">
                    <Link href="/patient/documents">
                      <FontAwesomeIcon icon={faCopy} className="mr-5" />
                    </Link>
                    <Link href="/patient/visits">
                      <FontAwesomeIcon
                        icon={faPersonWalking}
                        className="mr-5 font-gra"
                      />
                    </Link>
                    <Link href="/patient/plans">
                      <FontAwesomeIcon icon={faList} className="mr-5" />
                    </Link>
                    <Link href="/patient/history">
                      <FontAwesomeIcon icon={faFolder} className="mr-5" />
                    </Link>
                    <Link href="/patient/finance">
                      <FontAwesomeIcon icon={faEuro} className="mr-5" />
                    </Link>
                    <Link href={`patient/edit/${item.id}`}>
                      <FontAwesomeIcon icon={faEdit} className="mr-5" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
