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
  const [selectedValue, setSelectedValue] = useState('exist');
  const statusChange = useSelector(getPerioStatusChangeSelector);
  const appLang = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });


  const setDiagnozis = (status) => {
    perioDiagnozis[`tooth${toothNum}`][`status`] = status;
    dispatch(setPerioDiagnoze(perioDiagnozis));
    dispatch(setPerioStatusChange(!statusChange));
  };
  useEffect(() => {}, [changeState]);

  useEffect(() => {
    if (perioDiagnozis[`tooth${toothNum}`]?.status) {
      setSelectedValue(perioDiagnozis[`tooth${toothNum}`]?.status);
    }
  }, [perioDiagnozis[`tooth${toothNum}`]])

  return (
    <>
      <select className="perio-select" data-tooth="18" defaultValue={selectedValue}>
        <option value="intact" onClick={() => setDiagnozis('exist')}>{msgFormula.get('formula.perio_exist')}</option>
        <option value="absent" onClick={() => setDiagnozis('absent')} selected={selectedValue === 'absent'}>{msgFormula.get('formula.perio_absent')}</option>
        <option value="implant" onClick={() => setDiagnozis('implant')} selected={selectedValue === 'implant'}>{msgFormula.get('formula.perio_implant')}</option>
        <option value="crown" onClick={() => setDiagnozis('crown')} selected={selectedValue === 'crown'}>{msgFormula.get('formula.perio_crown')}</option>
        <option value="middlepart" onClick={() => setDiagnozis('middlepart')} selected={selectedValue === 'middlepart'}>{msgFormula.get('formula.perio_middlepart')}</option>
      </select>
    </>
  );
}
