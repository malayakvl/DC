import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faPencil,
  faTrash,
  faCopy,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import lngFormula from '../../../Lang/Formula/translation';
import InputText from '../../../Components/Form/InputText';
import ViewFormula from './../ViewFormula';
import ViewPerio from './../ViewPerio';
import moment from 'moment';
import {
  setChangeDia,
  setClearFormula,
  setSelectedToothNumber,
} from '../../../Redux/Formula';
import { emptyFormula } from '../../../Constants';
import ViewDiagnoze from './../ViewDiagnoze';
import ViewPSR from './../ViewPSR'


export default function Finances({ patientData, type, financesData }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<string>(type ? type : 'history');
  const [stageTab, setStageTab] = useState<string>('');
  const [_, setDisableTeethTab] = useState<string>('');
  const [trType, setTrType] = useState<string>('');
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngPatient,
    locale: appLang,
  });
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const [stageName, setStageName] = useState('');

  const handleTabClick = tabName => {
    setTab(tabName);
  };


  const submit = e => {
    e.preventDefault();
    router.post(`/patient/create-treatment`, {
      user_id: patientData.id,
      stage_name: stageName,
      type: trType,
    });
  };

  const setActiveStageTab = (tab) => {
    if (stageTab === tab)
      setStageTab('');
    else
      setStageTab(tab);

  }

  return (
    <>
      {/*TABS BLOCK*/}
      <div className="tabs-block w-full bg-white mt-10 flex">
        <div className={`w-full`}>
          <div className="sh-btns-block">
            <div className={'mt-2'}>
              <Link href={`/`}>
                <span className={'btn-quickact cursor-pointer'}>{msg.get('patient.quickact')}</span>
              </Link>
              <Link href={`/`} className={'ml-2'}>
                <span className={'btn-acceptpayment cursor-pointer'}>{msg.get('patient.acceptpayment')}</span>
              </Link>
              <Link href={`/`} className={'ml-2'}>
                <span className={'btn-returnmoney cursor-pointer'}>{msg.get('patient.returnmoney')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={'clearfix'} />
      <div className={'bg-white mt-[40px] rounded-md border shadow-lg w-[700px] min-h-[100px] pb-10'}>
        <h1 className={'text-center uppercase text-black mt-4'}>Акт виконаних робіт</h1>
        <table className={'w-full mt-10'}>
          <thead>
            <tr>
              <th>Послуга</th>
              <th>Вартість</th>
              <th>Кількість</th>
              <th>Знижка</th>
              <th>Зі знижкою</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={'clearfix'} />
    </>
  )
}
