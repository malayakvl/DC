import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import {
  getPerioSelector,
  getPerioStatusChangeSelector,
  getTeethDiagnozisSelector,
  perioDiagnozisSelector,
} from '../../../Redux/Formula/selectors';
import { setPerioDiagnoze, setPerioStatusChange } from '../../../Redux/Formula';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';
import { appLangSelector } from '../../../Redux/Layout/selectors';

export default function Statuses({ toothNum, type }) {
  const dispatch = useDispatch<any>();
  const perioDiagnozis = useSelector(perioDiagnozisSelector);
  const [changeState, setChangeState] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const statusChange = useSelector(getPerioStatusChangeSelector);
  const appLang = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

  const setDiagnozis = (status) => {
    perioDiagnozis[`tooth${toothNum}`][`status`] = status;
    // perioDiagnozis[`tooth${toothNum}`][`fertilizer_${type}_st${stage}`] =
    //   !perioDiagnozis[`tooth${toothNum}`][`fertilizer_${type}_st${stage}`];
    dispatch(setPerioDiagnoze(perioDiagnozis));
    dispatch(setPerioStatusChange(!statusChange));
    // setChangeState(!changeState);
  };
  useEffect(() => {}, [changeState]);

  return (
    <>
      {/*<Select*/}
      {/*  className={'perio-statuses'}*/}
      {/*  value={selectedValue}*/}
      {/*  onChange={setDiagnozis}*/}
      {/*  options={options}*/}
      {/*/>*/}
      <select className="perio-select" data-tooth="18">
        <option value="intact" onClick={() => setDiagnozis('exist')}>{msgFormula.get('formula.perio_exist')}</option>
        <option value="absent" onClick={() => setDiagnozis('absent')}>{msgFormula.get('formula.perio_absent')}</option>
        <option value="implant" onClick={() => setDiagnozis('implant')}>{msgFormula.get('formula.perio_implant')}</option>
        <option value="crown" onClick={() => setDiagnozis('crown')}>{msgFormula.get('formula.perio_crown')}</option>
        <option value="middlepart" onClick={() => setDiagnozis('middlepart')}>{msgFormula.get('formula.perio_middlepart')}</option>
      </select>
    </>
  );
}
