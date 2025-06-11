import React from 'react';
import { useSelector } from 'react-redux';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';
import { appLangSelector } from '../../../Redux/Layout/selectors';

export default function Statuses() {
  const appLang = useSelector(appLangSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

  return (
    <>
      <select className="perio-select" data-tooth="18">
        <option value="intact">{msgFormula.get('formula.perio_exist')}</option>
        <option value="absent">{msgFormula.get('formula.perio_absent')}</option>
        <option value="implant">{msgFormula.get('formula.perio_implant')}</option>
        <option value="crown">{msgFormula.get('formula.perio_crown')}</option>
        <option value="middlepart">{msgFormula.get('formula.perio_middlepart')}</option>
      </select>
    </>
  );
}
