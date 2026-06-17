import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faFloppyDisk,
  faPencil,
  faTrash,
  faPrint,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';

export default function DetailsNew({ patientData, discountStatus, discountValue, className = '' }) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const [tab, setTab] = useState('history');
  console.log('patient data', patientData);
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  // const { files } = usePage().props

  return (
    <section className={className}>
      <div className="pv-shell">
        <div className="pv-top">
          <div className="pv-user">
            {patientData.avatar ? (
              <div
                className="pv-avatar"
                style={{
                  backgroundImage: `url(/uploads/patients/${patientData.avatar})`,
                }}
              />
            ) : (
              <div className="pv-avatar pv-avatar-empty">
                {patientData.first_name?.[0]}
                {patientData.last_name?.[0]}
              </div>
            )}

            <div className="pv-info">
              <div className="pv-name">
                {patientData.first_name} {patientData.last_name}
              </div>

              <div className="pv-phone">{patientData.primary_phone}</div>

              {patientData.discount && (
                <div className="pv-discount">
                  {discountStatus || msg.get('patient.discount')}
                  {discountValue || patientData.discount}%
                </div>
              )}
            </div>
          </div>

          <div className="pv-actions">
            <Link href="/" className="pv-action-btn">
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>

            <Link href={`/patient/edit/${patientData.id}`} className="pv-action-btn">
              <FontAwesomeIcon icon={faPencil} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
