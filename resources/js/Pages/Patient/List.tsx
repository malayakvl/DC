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
console.log(listData.data)
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
              {listData.data?.map(item => (
                <li
                  className="patient-item grid grid-cols-1 place-content-between"
                  key={item.id}
                >
                  <Link href={`/patient/view/${item.id}`}>
                    <div className="inline-flex">
                      {item.avatar ? (
                        <img
                          src={`/uploads/patients/${item.avatar}`}
                          width="auto"
                          height="45"
                        />
                      ) : (
                        <img
                          className='p-photo'
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
                        <span className="ml-3 mt-3 text-[13px]">
                          <b>Виконано на:</b> <span className="text-kt">{item.kt_balance}&nbsp;</span>
                          <b>Сплачено:</b> <span className="text-dt">{item. dt_balance}&nbsp;</span>
                          {item.kt_balance > item.dt_balance && <><b>Борг:</b> <span className="text-debt">{item. dt_balance}</span></>}
                        </span>
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

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page {listData.current_page} of {listData.last_page}
                </p>
              </div>
              <nav className="flex space-x-2">
                {/* Previous Button */}
                <a
                  href={listData.prev_page_url || '#'}
                  className={`px-3 py-1 border rounded text-sm ${
                    listData.prev_page_url
                      ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={(e) => !listData.prev_page_url && e.preventDefault()}
                >
                  Previous
                </a>

                {/* Page Links */}
                {listData.links
                  .filter((link) => link.label !== 'Previous' && link.label !== 'Next')
                  .map((link) => (
                    <a
                      key={link.label}
                      href={link.url || '#'}
                      className={`px-3 py-1 border rounded text-sm ${
                        link.active
                          ? 'bg-blue-500 text-white border-blue-500'
                          : link.url
                            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={(e) => !link.url && e.preventDefault()}
                    >
                      {link.label}
                    </a>
                  ))}

                {/* Next Button */}
                <a
                  href={listData.next_page_url || '#'}
                  className={`px-3 py-1 border rounded text-sm ${
                    listData.next_page_url
                      ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={(e) => !listData.next_page_url && e.preventDefault()}
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
