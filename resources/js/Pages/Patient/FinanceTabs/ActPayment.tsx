import React, { useState, useEffect } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faInfo, faPrint, faPencil, faUserDoctor, faCopy, faTrash,faUser } from '@fortawesome/free-solid-svg-icons';
import {
  minusServiceAction,
  setExistServicesAction,
  plusServiceAction,
  setPatientSubTab,
} from '../../../Redux/Patient';
import { Transition } from '@headlessui/react';
import Pricing from '../Pricing';
import { patientServicesSelector, patientSubTabSelector } from '../../../Redux/Patient/selectors';
import SecondaryButton from '../../../Components/Form/SecondaryButton';
import moment from 'moment';

export default function ActPayment({
 patientData,
 pDiscountValue,
 pServices,
 tree,
 clinicData,
 currency,
 actData
}) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const subTab = useSelector(patientSubTabSelector);
  const initialServices = useSelector(patientServicesSelector) || [];

console.log(actData)
  const submit = e => {
    e.preventDefault();

  };

  // Применение массовой скидки

  return (
    <>
      <table className={`w-full act-payment-tbl mt-5`}>
        <thead>
        <tr>
          <th width="120px" colSpan="2">
            <span className="cliniccardsTooltip">Акти виконаних робіт
              <FontAwesomeIcon icon={faInfo} className={'aw-small'} />
            </span>
          </th>
          <th width="150px">
              <span data-patientid="11807460" className="tooltipster openAllInvoicesButton tooltipstered">
                <FontAwesomeIcon icon={faFolderOpen} className={'aw-small'} />
              </span>
          </th>
          <th className="sep"></th>
          <th width="14%" colSpan="3">
            <span className="cliniccardsTooltip ">Платежі
              <FontAwesomeIcon icon={faInfo} className={'aw-small'}  />
            </span>
          </th>
          <th className=" sep"></th>
          <th width="90px">
            <span className="cliniccardsTooltip ">Баланс
              <FontAwesomeIcon icon={faInfo} className={'aw-small'}  />
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        {actData.map(data => (
          <tr>
            <td style={{width: '100px'}}>{moment(data.doc_date).format('DD.MM.YYYY')}</td>
            <td className="textAlignRight">
              <div style={{display: 'inline-block', width: '1rem'}}></div>
              <span className={'float-right'}>{data.total}&nbsp;{clinicData.currency.symbol}</span>
            </td>

            <td style={{width: '190px', textAlign: 'center'}}>
              <button className="icon-btn">
                <FontAwesomeIcon icon={faFolderOpen} className={'white-icon'} size="xs" />
              </button>
              <a className={'icon-btn mx-0.5'}>
                <FontAwesomeIcon icon={faPrint} className={'white-icon'} size="xs" />
              </a>
              <Link href={`/patient/act/${data.id}`}>
                <a className={'icon-btn mx-0.5'}>
                  <FontAwesomeIcon icon={faPencil} className={'white-icon'} size="xs" />
                </a>
              </Link>
              <button className="icon-btn mx-0.5">
                <FontAwesomeIcon icon={faUser} className={'white-icon'} size="xs" />
              </button>
              <a className="icon-btn mx-0.5">
                <FontAwesomeIcon icon={faCopy} className={'white-icon'} size="xs" />
              </a>
              <button className="icon-btn red-btn">
                <FontAwesomeIcon icon={faTrash} className={'white-icon'} size="xs" />
              </button>
            </td>
            <td className="sep"></td>
            <td className="_paymentsPlaceholder" colSpan="3"></td>
            <td className="sep"></td>
            <td className="tdWhiteBG textAlignRight"></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}