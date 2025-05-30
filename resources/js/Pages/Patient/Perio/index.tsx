import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { perioDiagnozisSelector } from '../../../Redux/Formula/selectors';
import Furkacia from './Furkacia';
import FormulaPerio1828 from './FormulaPerio1828';
import FormulaPerio3848 from './FormulaPerio3848';
import DentalDeposits from './DentalDeposits';
import Fertilizer from './Fertilizer';
import Bleeding from './Bleeding';
import Moving from './Moving';
import DeepZond1828 from './DeepZoond1828';
import YasenKray1828 from './YasenKray1828';
import DeepZond4838 from './DeepZoond4838';
import YasenKray4838 from './YasenKray4838';

import IntersectChart1828Up from './IntersectChart1828Up';
import IntersectChart1828Down from './IntersectChart1828Down';

import IntersectChart4838Up from './IntersectChart4838Up';
import IntersectChart4838Down from './IntersectChart4838Down';
import { checkAction } from '../../../Redux/Formula';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';

export default function Index() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const perioDiagnozis = useSelector(perioDiagnozisSelector);
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });

  useEffect(() => {
    dispatch(checkAction());
  });

  console.log(perioDiagnozis);
  return (
    <div className="w-full scroll-x">
      <table className="table-auto perio-table">
        <tbody>
          <tr>
            <td className="title">{msgFormula.get('formula.teeth.status')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.moving')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Moving toothNum={48} />
            </td>
            <td>
              <Moving toothNum={47} />
            </td>
            <td>
              <Moving toothNum={46} />
            </td>
            <td>
              <Moving toothNum={45} />
            </td>
            <td>
              <Moving toothNum={44} />
            </td>
            <td>
              <Moving toothNum={43} />
            </td>
            <td>
              <Moving toothNum={42} />
            </td>
            <td>
              <Moving toothNum={41} />
            </td>
            <td>
              <Moving toothNum={31} />
            </td>
            <td>
              <Moving toothNum={32} />
            </td>
            <td>
              <Moving toothNum={33} />
            </td>
            <td>
              <Moving toothNum={34} />
            </td>
            <td>
              <Moving toothNum={35} />
            </td>
            <td>
              <Moving toothNum={36} />
            </td>
            <td>
              <Moving toothNum={37} />
            </td>
            <td>
              <Moving toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.furkacia')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Furkacia toothNum={48} />
            </td>
            <td>
              <Furkacia toothNum={47} />
            </td>
            <td>
              <Furkacia toothNum={46} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.bleeding')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Bleeding toothNum={48} />
            </td>
            <td>
              <Bleeding toothNum={47} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={46} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={45} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={44} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={43} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={42} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={41} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={31} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={32} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={33} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={34} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={35} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={36} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={37} type={'vest'} />
            </td>
            <td>
              <Bleeding toothNum={38} type={'vest'} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.fertilizer')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Fertilizer toothNum={48} />
            </td>
            <td>
              <Fertilizer toothNum={47} />
            </td>
            <td>
              <Fertilizer toothNum={46} />
            </td>
            <td>
              <Fertilizer toothNum={45} />
            </td>
            <td>
              <Fertilizer toothNum={44} />
            </td>
            <td>
              <Fertilizer toothNum={43} />
            </td>
            <td>
              <Fertilizer toothNum={42} />
            </td>
            <td>
              <Fertilizer toothNum={41} />
            </td>
            <td>
              <Fertilizer toothNum={31} />
            </td>
            <td>
              <Fertilizer toothNum={32} />
            </td>
            <td>
              <Fertilizer toothNum={33} />
            </td>
            <td>
              <Fertilizer toothNum={34} />
            </td>
            <td>
              <Fertilizer toothNum={35} />
            </td>
            <td>
              <Fertilizer toothNum={36} />
            </td>
            <td>
              <Fertilizer toothNum={37} />
            </td>
            <td>
              <Fertilizer toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.depozit')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <DentalDeposits toothNum={48} />
            </td>
            <td>
              <DentalDeposits toothNum={47} />
            </td>
            <td>
              <DentalDeposits toothNum={46} />
            </td>
            <td>
              <DentalDeposits toothNum={45} />
            </td>
            <td>
              <DentalDeposits toothNum={44} />
            </td>
            <td>
              <DentalDeposits toothNum={43} />
            </td>
            <td>
              <DentalDeposits toothNum={42} />
            </td>
            <td>
              <DentalDeposits toothNum={41} />
            </td>
            <td>
              <DentalDeposits toothNum={31} />
            </td>
            <td>
              <DentalDeposits toothNum={32} />
            </td>
            <td>
              <DentalDeposits toothNum={33} />
            </td>
            <td>
              <DentalDeposits toothNum={34} />
            </td>
            <td>
              <DentalDeposits toothNum={35} />
            </td>
            <td>
              <DentalDeposits toothNum={36} />
            </td>
            <td>
              <DentalDeposits toothNum={37} />
            </td>
            <td>
              <DentalDeposits toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.yasn')}</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <div className="col-xs-12 action-zone-v">
                <YasenKray1828 type={'vest'} idx={0} />
                <YasenKray1828 type={'vest'} idx={1} />
                <YasenKray1828 type={'vest'} idx={2} />
              </div>
            </td>
            <td>
              <div className="col-xs-12 action-zone-v">
                <YasenKray1828 type={'vest'} idx={3} />
                <YasenKray1828 type={'vest'} idx={4} />
                <YasenKray1828 type={'vest'} idx={5} />
              </div>
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={6} />
              <YasenKray1828 type={'vest'} idx={7} />
              <YasenKray1828 type={'vest'} idx={8} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={9} />
              <YasenKray1828 type={'vest'} idx={10} />
              <YasenKray1828 type={'vest'} idx={11} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={12} />
              <YasenKray1828 type={'vest'} idx={13} />
              <YasenKray1828 type={'vest'} idx={14} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={15} />
              <YasenKray1828 type={'vest'} idx={16} />
              <YasenKray1828 type={'vest'} idx={17} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={18} />
              <YasenKray1828 type={'vest'} idx={19} />
              <YasenKray1828 type={'vest'} idx={20} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={21} />
              <YasenKray1828 type={'vest'} idx={22} />
              <YasenKray1828 type={'vest'} idx={23} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={24} />
              <YasenKray1828 type={'vest'} idx={25} />
              <YasenKray1828 type={'vest'} idx={26} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={27} />
              <YasenKray1828 type={'vest'} idx={28} />
              <YasenKray1828 type={'vest'} idx={29} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={30} />
              <YasenKray1828 type={'vest'} idx={31} />
              <YasenKray1828 type={'vest'} idx={32} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={33} />
              <YasenKray1828 type={'vest'} idx={34} />
              <YasenKray1828 type={'vest'} idx={35} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={36} />
              <YasenKray1828 type={'vest'} idx={37} />
              <YasenKray1828 type={'vest'} idx={38} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={39} />
              <YasenKray1828 type={'vest'} idx={40} />
              <YasenKray1828 type={'vest'} idx={41} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={42} />
              <YasenKray1828 type={'vest'} idx={43} />
              <YasenKray1828 type={'vest'} idx={44} />
            </td>
            <td>
              <YasenKray1828 type={'vest'} idx={45} />
              <YasenKray1828 type={'vest'} idx={46} />
              <YasenKray1828 type={'vest'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title">{msgFormula.get('formula.zond')}</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <div className="col-xs-12 action-zone-v">
                <DeepZond1828 type={'vest'} idx={0} />
                <DeepZond1828 type={'vest'} idx={1} />
                <DeepZond1828 type={'vest'} idx={2} />
              </div>
            </td>
            <td>
              <div className="col-xs-12 action-zone-v">
                <DeepZond1828 type={'vest'} idx={3} />
                <DeepZond1828 type={'vest'} idx={4} />
                <DeepZond1828 type={'vest'} idx={5} />
              </div>
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={6} />
              <DeepZond1828 type={'vest'} idx={7} />
              <DeepZond1828 type={'vest'} idx={8} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={9} />
              <DeepZond1828 type={'vest'} idx={10} />
              <DeepZond1828 type={'vest'} idx={11} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={12} />
              <DeepZond1828 type={'vest'} idx={13} />
              <DeepZond1828 type={'vest'} idx={14} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={15} />
              <DeepZond1828 type={'vest'} idx={16} />
              <DeepZond1828 type={'vest'} idx={17} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={18} />
              <DeepZond1828 type={'vest'} idx={19} />
              <DeepZond1828 type={'vest'} idx={20} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={21} />
              <DeepZond1828 type={'vest'} idx={22} />
              <DeepZond1828 type={'vest'} idx={23} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={24} />
              <DeepZond1828 type={'vest'} idx={25} />
              <DeepZond1828 type={'vest'} idx={26} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={27} />
              <DeepZond1828 type={'vest'} idx={28} />
              <DeepZond1828 type={'vest'} idx={29} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={30} />
              <DeepZond1828 type={'vest'} idx={31} />
              <DeepZond1828 type={'vest'} idx={32} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={33} />
              <DeepZond1828 type={'vest'} idx={34} />
              <DeepZond1828 type={'vest'} idx={35} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={36} />
              <DeepZond1828 type={'vest'} idx={37} />
              <DeepZond1828 type={'vest'} idx={38} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={39} />
              <DeepZond1828 type={'vest'} idx={40} />
              <DeepZond1828 type={'vest'} idx={41} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={42} />
              <DeepZond1828 type={'vest'} idx={43} />
              <DeepZond1828 type={'vest'} idx={44} />
            </td>
            <td>
              <DeepZond1828 type={'vest'} idx={45} />
              <DeepZond1828 type={'vest'} idx={46} />
              <DeepZond1828 type={'vest'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title" style={{ backgroundColor: 'none' }}>
              <span style={{ display: 'block', marginTop: '50px' }}>
                Вестибулярно/Орально
              </span>
            </td>
            <td
              colSpan={16}
              style={{
                textAlign: 'center',
                width: '1050px',
                borderRight: 'none',
                borderLeft: 'none',
              }}
            >
              <div className="relative">
                <IntersectChart1828Up />
              </div>
              <FormulaPerio1828 />
              <div className="relative">
                <IntersectChart1828Down />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={17} style={{ height: '40px' }}></td>
          </tr>
          <tr>
            <td className="title">Глибина зондування</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <DeepZond1828 type={'oral'} idx={0} />
              <DeepZond1828 type={'oral'} idx={1} />
              <DeepZond1828 type={'oral'} idx={2} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={3} />
              <DeepZond1828 type={'oral'} idx={4} />
              <DeepZond1828 type={'oral'} idx={5} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={6} />
              <DeepZond1828 type={'oral'} idx={7} />
              <DeepZond1828 type={'oral'} idx={8} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={9} />
              <DeepZond1828 type={'oral'} idx={10} />
              <DeepZond1828 type={'oral'} idx={11} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={12} />
              <DeepZond1828 type={'oral'} idx={13} />
              <DeepZond1828 type={'oral'} idx={14} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={15} />
              <DeepZond1828 type={'oral'} idx={16} />
              <DeepZond1828 type={'oral'} idx={17} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={18} />
              <DeepZond1828 type={'oral'} idx={19} />
              <DeepZond1828 type={'oral'} idx={20} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={21} />
              <DeepZond1828 type={'oral'} idx={22} />
              <DeepZond1828 type={'oral'} idx={23} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={24} />
              <DeepZond1828 type={'oral'} idx={25} />
              <DeepZond1828 type={'oral'} idx={26} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={27} />
              <DeepZond1828 type={'oral'} idx={28} />
              <DeepZond1828 type={'oral'} idx={29} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={30} />
              <DeepZond1828 type={'oral'} idx={31} />
              <DeepZond1828 type={'oral'} idx={32} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={33} />
              <DeepZond1828 type={'oral'} idx={34} />
              <DeepZond1828 type={'oral'} idx={35} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={36} />
              <DeepZond1828 type={'oral'} idx={37} />
              <DeepZond1828 type={'oral'} idx={38} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={39} />
              <DeepZond1828 type={'oral'} idx={40} />
              <DeepZond1828 type={'oral'} idx={41} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={42} />
              <DeepZond1828 type={'oral'} idx={43} />
              <DeepZond1828 type={'oral'} idx={44} />
            </td>
            <td>
              <DeepZond1828 type={'oral'} idx={45} />
              <DeepZond1828 type={'oral'} idx={46} />
              <DeepZond1828 type={'oral'} idx={47} />
            </td>
          </tr>

          <tr>
            <td className="title">Ясений край</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <YasenKray1828 type={'oral'} idx={0} />
              <YasenKray1828 type={'oral'} idx={1} />
              <YasenKray1828 type={'oral'} idx={2} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={3} />
              <YasenKray1828 type={'oral'} idx={4} />
              <YasenKray1828 type={'oral'} idx={5} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={6} />
              <YasenKray1828 type={'oral'} idx={7} />
              <YasenKray1828 type={'oral'} idx={8} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={9} />
              <YasenKray1828 type={'oral'} idx={10} />
              <YasenKray1828 type={'oral'} idx={11} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={12} />
              <YasenKray1828 type={'oral'} idx={13} />
              <YasenKray1828 type={'oral'} idx={14} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={15} />
              <YasenKray1828 type={'oral'} idx={16} />
              <YasenKray1828 type={'oral'} idx={17} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={18} />
              <YasenKray1828 type={'oral'} idx={19} />
              <YasenKray1828 type={'oral'} idx={20} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={21} />
              <YasenKray1828 type={'oral'} idx={22} />
              <YasenKray1828 type={'oral'} idx={23} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={24} />
              <YasenKray1828 type={'oral'} idx={25} />
              <YasenKray1828 type={'oral'} idx={26} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={27} />
              <YasenKray1828 type={'oral'} idx={28} />
              <YasenKray1828 type={'oral'} idx={29} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={30} />
              <YasenKray1828 type={'oral'} idx={31} />
              <YasenKray1828 type={'oral'} idx={32} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={33} />
              <YasenKray1828 type={'oral'} idx={34} />
              <YasenKray1828 type={'oral'} idx={35} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={36} />
              <YasenKray1828 type={'oral'} idx={37} />
              <YasenKray1828 type={'oral'} idx={38} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={39} />
              <YasenKray1828 type={'oral'} idx={40} />
              <YasenKray1828 type={'oral'} idx={41} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={42} />
              <YasenKray1828 type={'oral'} idx={43} />
              <YasenKray1828 type={'oral'} idx={44} />
            </td>
            <td>
              <YasenKray1828 type={'oral'} idx={45} />
              <YasenKray1828 type={'oral'} idx={46} />
              <YasenKray1828 type={'oral'} idx={47} />
            </td>
          </tr>

          <tr>
            <td className="title">Зубні відкладення</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <DentalDeposits toothNum={48} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={47} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={46} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={45} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={44} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={43} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={42} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={41} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={31} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={32} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={33} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={34} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={35} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={36} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={37} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Гноєтеча</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Fertilizer toothNum={48} />
            </td>
            <td>
              <Fertilizer toothNum={47} />
            </td>
            <td>
              <Fertilizer toothNum={46} />
            </td>
            <td>
              <Fertilizer toothNum={45} />
            </td>
            <td>
              <Fertilizer toothNum={44} />
            </td>
            <td>
              <Fertilizer toothNum={43} />
            </td>
            <td>
              <Fertilizer toothNum={42} />
            </td>
            <td>
              <Fertilizer toothNum={41} />
            </td>
            <td>
              <Fertilizer toothNum={31} />
            </td>
            <td>
              <Fertilizer toothNum={32} />
            </td>
            <td>
              <Fertilizer toothNum={33} />
            </td>
            <td>
              <Fertilizer toothNum={34} />
            </td>
            <td>
              <Fertilizer toothNum={35} />
            </td>
            <td>
              <Fertilizer toothNum={36} />
            </td>
            <td>
              <Fertilizer toothNum={37} />
            </td>
            <td>
              <Fertilizer toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Кровоточивість</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <Bleeding toothNum={48} />
            </td>
            <td>
              <Bleeding toothNum={47} />
            </td>
            <td>
              <Bleeding toothNum={46} />
            </td>
            <td>
              <Bleeding toothNum={45} />
            </td>
            <td>
              <Bleeding toothNum={44} />
            </td>
            <td>
              <Bleeding toothNum={43} />
            </td>
            <td>
              <Bleeding toothNum={42} />
            </td>
            <td>
              <Bleeding toothNum={41} />
            </td>
            <td>
              <Bleeding toothNum={31} />
            </td>
            <td>
              <Bleeding toothNum={32} />
            </td>
            <td>
              <Bleeding toothNum={33} />
            </td>
            <td>
              <Bleeding toothNum={34} />
            </td>
            <td>
              <Bleeding toothNum={35} />
            </td>
            <td>
              <Bleeding toothNum={36} />
            </td>
            <td>
              <Bleeding toothNum={37} />
            </td>
            <td>
              <Bleeding toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Фуркація</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Furkacia toothNum={48} />
            </td>
            <td>
              <Furkacia toothNum={47} />
            </td>
            <td>
              <Furkacia toothNum={46} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
          </tr>
          <tr>
            <td
              colSpan={17}
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            ></td>
          </tr>
          <tr>
            <td
              colSpan={17}
              style={{
                paddingTop: '1px',
                paddingBottom: '1px',
                backgroundColor: '#cdcdcd',
              }}
            ></td>
          </tr>
          <tr>
            <td
              colSpan={17}
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            ></td>
          </tr>
          <tr>
            <td className="title">Фуркація</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Furkacia toothNum={48} />
            </td>
            <td>
              <Furkacia toothNum={47} />
            </td>
            <td>
              <Furkacia toothNum={46} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Кровоточивість</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Bleeding toothNum={48} />
            </td>
            <td>
              <Bleeding toothNum={47} />
            </td>
            <td>
              <Bleeding toothNum={46} />
            </td>
            <td>
              <Bleeding toothNum={45} />
            </td>
            <td>
              <Bleeding toothNum={44} />
            </td>
            <td>
              <Bleeding toothNum={43} />
            </td>
            <td>
              <Bleeding toothNum={42} />
            </td>
            <td>
              <Bleeding toothNum={41} />
            </td>
            <td>
              <Bleeding toothNum={31} />
            </td>
            <td>
              <Bleeding toothNum={32} />
            </td>
            <td>
              <Bleeding toothNum={33} />
            </td>
            <td>
              <Bleeding toothNum={34} />
            </td>
            <td>
              <Bleeding toothNum={35} />
            </td>
            <td>
              <Bleeding toothNum={36} />
            </td>
            <td>
              <Bleeding toothNum={37} />
            </td>
            <td>
              <Bleeding toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Гноєтеча</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Fertilizer toothNum={48} />
            </td>
            <td>
              <Fertilizer toothNum={47} />
            </td>
            <td>
              <Fertilizer toothNum={46} />
            </td>
            <td>
              <Fertilizer toothNum={45} />
            </td>
            <td>
              <Fertilizer toothNum={44} />
            </td>
            <td>
              <Fertilizer toothNum={43} />
            </td>
            <td>
              <Fertilizer toothNum={42} />
            </td>
            <td>
              <Fertilizer toothNum={41} />
            </td>
            <td>
              <Fertilizer toothNum={31} />
            </td>
            <td>
              <Fertilizer toothNum={32} />
            </td>
            <td>
              <Fertilizer toothNum={33} />
            </td>
            <td>
              <Fertilizer toothNum={34} />
            </td>
            <td>
              <Fertilizer toothNum={35} />
            </td>
            <td>
              <Fertilizer toothNum={36} />
            </td>
            <td>
              <Fertilizer toothNum={37} />
            </td>
            <td>
              <Fertilizer toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Зубні відкладення</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <DentalDeposits toothNum={48} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={47} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={46} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={45} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={44} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={43} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={42} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={41} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={31} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={32} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={33} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={34} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={35} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={36} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={37} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Ясений край</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <YasenKray4838 type={'vest'} idx={0} />
              <YasenKray4838 type={'vest'} idx={1} />
              <YasenKray4838 type={'vest'} idx={2} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={3} />
              <YasenKray4838 type={'vest'} idx={4} />
              <YasenKray4838 type={'vest'} idx={5} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={6} />
              <YasenKray4838 type={'vest'} idx={7} />
              <YasenKray4838 type={'vest'} idx={8} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={9} />
              <YasenKray4838 type={'vest'} idx={10} />
              <YasenKray4838 type={'vest'} idx={11} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={12} />
              <YasenKray4838 type={'vest'} idx={13} />
              <YasenKray4838 type={'vest'} idx={14} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={15} />
              <YasenKray4838 type={'vest'} idx={16} />
              <YasenKray4838 type={'vest'} idx={17} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={18} />
              <YasenKray4838 type={'vest'} idx={19} />
              <YasenKray4838 type={'vest'} idx={20} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={21} />
              <YasenKray4838 type={'vest'} idx={22} />
              <YasenKray4838 type={'vest'} idx={23} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={24} />
              <YasenKray4838 type={'vest'} idx={25} />
              <YasenKray4838 type={'vest'} idx={26} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={27} />
              <YasenKray4838 type={'vest'} idx={28} />
              <YasenKray4838 type={'vest'} idx={29} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={30} />
              <YasenKray4838 type={'vest'} idx={31} />
              <YasenKray4838 type={'vest'} idx={32} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={33} />
              <YasenKray4838 type={'vest'} idx={34} />
              <YasenKray4838 type={'vest'} idx={35} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={36} />
              <YasenKray4838 type={'vest'} idx={37} />
              <YasenKray4838 type={'vest'} idx={38} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={39} />
              <YasenKray4838 type={'vest'} idx={40} />
              <YasenKray4838 type={'vest'} idx={41} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={42} />
              <YasenKray4838 type={'vest'} idx={43} />
              <YasenKray4838 type={'vest'} idx={44} />
            </td>
            <td>
              <YasenKray4838 type={'vest'} idx={45} />
              <YasenKray4838 type={'vest'} idx={46} />
              <YasenKray4838 type={'vest'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title">Глибина зондування</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <DeepZond4838 type={'vest'} idx={0} />
              <DeepZond4838 type={'vest'} idx={1} />
              <DeepZond4838 type={'vest'} idx={2} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={3} />
              <DeepZond4838 type={'vest'} idx={4} />
              <DeepZond4838 type={'vest'} idx={5} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={6} />
              <DeepZond4838 type={'vest'} idx={7} />
              <DeepZond4838 type={'vest'} idx={8} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={9} />
              <DeepZond4838 type={'vest'} idx={10} />
              <DeepZond4838 type={'vest'} idx={11} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={12} />
              <DeepZond4838 type={'vest'} idx={13} />
              <DeepZond4838 type={'vest'} idx={14} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={15} />
              <DeepZond4838 type={'vest'} idx={16} />
              <DeepZond4838 type={'vest'} idx={17} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={18} />
              <DeepZond4838 type={'vest'} idx={19} />
              <DeepZond4838 type={'vest'} idx={20} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={21} />
              <DeepZond4838 type={'vest'} idx={22} />
              <DeepZond4838 type={'vest'} idx={23} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={24} />
              <DeepZond4838 type={'vest'} idx={25} />
              <DeepZond4838 type={'vest'} idx={26} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={27} />
              <DeepZond4838 type={'vest'} idx={28} />
              <DeepZond4838 type={'vest'} idx={29} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={30} />
              <DeepZond4838 type={'vest'} idx={31} />
              <DeepZond4838 type={'vest'} idx={32} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={33} />
              <DeepZond4838 type={'vest'} idx={34} />
              <DeepZond4838 type={'vest'} idx={35} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={36} />
              <DeepZond4838 type={'vest'} idx={37} />
              <DeepZond4838 type={'vest'} idx={38} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={39} />
              <DeepZond4838 type={'vest'} idx={40} />
              <DeepZond4838 type={'vest'} idx={41} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={42} />
              <DeepZond4838 type={'vest'} idx={43} />
              <DeepZond4838 type={'vest'} idx={44} />
            </td>
            <td>
              <DeepZond4838 type={'vest'} idx={45} />
              <DeepZond4838 type={'vest'} idx={46} />
              <DeepZond4838 type={'vest'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title" style={{ backgroundColor: 'none' }}>
              <span style={{ display: 'block', marginTop: '50px' }}>
                Вестибулярно/Орально
              </span>
            </td>
            <td
              colSpan={16}
              style={{
                textAlign: 'center',
                width: '1024px',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <div className="relative">
                <IntersectChart4838Up />
              </div>
              <FormulaPerio3848 />
              <div className="relative">
                <IntersectChart4838Down />
              </div>
            </td>
          </tr>
          <tr>
            <td
              colSpan={17}
              style={{
                height: '40px',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            ></td>
          </tr>
          <tr>
            <td className="title">Глибина зондування</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <DeepZond4838 type={'oral'} idx={0} />
              <DeepZond4838 type={'oral'} idx={1} />
              <DeepZond4838 type={'oral'} idx={2} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={3} />
              <DeepZond4838 type={'oral'} idx={4} />
              <DeepZond4838 type={'oral'} idx={5} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={6} />
              <DeepZond4838 type={'oral'} idx={7} />
              <DeepZond4838 type={'oral'} idx={8} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={9} />
              <DeepZond4838 type={'oral'} idx={10} />
              <DeepZond4838 type={'oral'} idx={11} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={12} />
              <DeepZond4838 type={'oral'} idx={13} />
              <DeepZond4838 type={'oral'} idx={14} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={15} />
              <DeepZond4838 type={'oral'} idx={16} />
              <DeepZond4838 type={'oral'} idx={17} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={18} />
              <DeepZond4838 type={'oral'} idx={19} />
              <DeepZond4838 type={'oral'} idx={20} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={21} />
              <DeepZond4838 type={'oral'} idx={22} />
              <DeepZond4838 type={'oral'} idx={23} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={24} />
              <DeepZond4838 type={'oral'} idx={25} />
              <DeepZond4838 type={'oral'} idx={26} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={27} />
              <DeepZond4838 type={'oral'} idx={28} />
              <DeepZond4838 type={'oral'} idx={29} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={30} />
              <DeepZond4838 type={'oral'} idx={31} />
              <DeepZond4838 type={'oral'} idx={32} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={33} />
              <DeepZond4838 type={'oral'} idx={34} />
              <DeepZond4838 type={'oral'} idx={35} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={36} />
              <DeepZond4838 type={'oral'} idx={37} />
              <DeepZond4838 type={'oral'} idx={38} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={39} />
              <DeepZond4838 type={'oral'} idx={40} />
              <DeepZond4838 type={'oral'} idx={41} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={42} />
              <DeepZond4838 type={'oral'} idx={43} />
              <DeepZond4838 type={'oral'} idx={44} />
            </td>
            <td>
              <DeepZond4838 type={'oral'} idx={45} />
              <DeepZond4838 type={'oral'} idx={46} />
              <DeepZond4838 type={'oral'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title">Ясений край</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <YasenKray4838 type={'oral'} idx={0} />
              <YasenKray4838 type={'oral'} idx={1} />
              <YasenKray4838 type={'oral'} idx={2} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={3} />
              <YasenKray4838 type={'oral'} idx={4} />
              <YasenKray4838 type={'oral'} idx={5} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={6} />
              <YasenKray4838 type={'oral'} idx={7} />
              <YasenKray4838 type={'oral'} idx={8} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={9} />
              <YasenKray4838 type={'oral'} idx={10} />
              <YasenKray4838 type={'oral'} idx={11} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={12} />
              <YasenKray4838 type={'oral'} idx={13} />
              <YasenKray4838 type={'oral'} idx={14} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={15} />
              <YasenKray4838 type={'oral'} idx={16} />
              <YasenKray4838 type={'oral'} idx={17} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={18} />
              <YasenKray4838 type={'oral'} idx={19} />
              <YasenKray4838 type={'oral'} idx={20} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={21} />
              <YasenKray4838 type={'oral'} idx={22} />
              <YasenKray4838 type={'oral'} idx={23} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={24} />
              <YasenKray4838 type={'oral'} idx={25} />
              <YasenKray4838 type={'oral'} idx={26} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={27} />
              <YasenKray4838 type={'oral'} idx={28} />
              <YasenKray4838 type={'oral'} idx={29} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={30} />
              <YasenKray4838 type={'oral'} idx={31} />
              <YasenKray4838 type={'oral'} idx={32} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={33} />
              <YasenKray4838 type={'oral'} idx={34} />
              <YasenKray4838 type={'oral'} idx={35} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={36} />
              <YasenKray4838 type={'oral'} idx={37} />
              <YasenKray4838 type={'oral'} idx={38} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={39} />
              <YasenKray4838 type={'oral'} idx={40} />
              <YasenKray4838 type={'oral'} idx={41} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={42} />
              <YasenKray4838 type={'oral'} idx={43} />
              <YasenKray4838 type={'oral'} idx={44} />
            </td>
            <td>
              <YasenKray4838 type={'oral'} idx={45} />
              <YasenKray4838 type={'oral'} idx={46} />
              <YasenKray4838 type={'oral'} idx={47} />
            </td>
          </tr>
          <tr>
            <td className="title">Зубні відкладення</td>
            <td style={{ borderLeft: 'none', borderRight: 'none' }}>
              <DentalDeposits toothNum={48} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={47} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={46} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={45} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={44} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={43} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={42} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={41} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={31} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={32} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={33} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={34} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={35} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={36} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={37} />
            </td>
            <td style={{ paddingTop: '10px' }}>
              <DentalDeposits toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Гноєтеча</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Fertilizer toothNum={48} />
            </td>
            <td>
              <Fertilizer toothNum={47} />
            </td>
            <td>
              <Fertilizer toothNum={46} />
            </td>
            <td>
              <Fertilizer toothNum={45} />
            </td>
            <td>
              <Fertilizer toothNum={44} />
            </td>
            <td>
              <Fertilizer toothNum={43} />
            </td>
            <td>
              <Fertilizer toothNum={42} />
            </td>
            <td>
              <Fertilizer toothNum={41} />
            </td>
            <td>
              <Fertilizer toothNum={31} />
            </td>
            <td>
              <Fertilizer toothNum={32} />
            </td>
            <td>
              <Fertilizer toothNum={33} />
            </td>
            <td>
              <Fertilizer toothNum={34} />
            </td>
            <td>
              <Fertilizer toothNum={35} />
            </td>
            <td>
              <Fertilizer toothNum={36} />
            </td>
            <td>
              <Fertilizer toothNum={37} />
            </td>
            <td>
              <Fertilizer toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Гноєтеча</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Bleeding toothNum={48} />
            </td>
            <td>
              <Bleeding toothNum={47} />
            </td>
            <td>
              <Bleeding toothNum={46} />
            </td>
            <td>
              <Bleeding toothNum={45} />
            </td>
            <td>
              <Bleeding toothNum={44} />
            </td>
            <td>
              <Bleeding toothNum={43} />
            </td>
            <td>
              <Bleeding toothNum={42} />
            </td>
            <td>
              <Bleeding toothNum={41} />
            </td>
            <td>
              <Bleeding toothNum={31} />
            </td>
            <td>
              <Bleeding toothNum={32} />
            </td>
            <td>
              <Bleeding toothNum={33} />
            </td>
            <td>
              <Bleeding toothNum={34} />
            </td>
            <td>
              <Bleeding toothNum={35} />
            </td>
            <td>
              <Bleeding toothNum={36} />
            </td>
            <td>
              <Bleeding toothNum={37} />
            </td>
            <td>
              <Bleeding toothNum={38} />
            </td>
          </tr>

          <tr>
            <td className="title">Фуркація</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Furkacia toothNum={48} />
            </td>
            <td>
              <Furkacia toothNum={47} />
            </td>
            <td>
              <Furkacia toothNum={46} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
            <td>
              <Furkacia toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Рухомість</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <Moving toothNum={48} />
            </td>
            <td>
              <Moving toothNum={47} />
            </td>
            <td>
              <Moving toothNum={46} />
            </td>
            <td>
              <Moving toothNum={45} />
            </td>
            <td>
              <Moving toothNum={44} />
            </td>
            <td>
              <Moving toothNum={43} />
            </td>
            <td>
              <Moving toothNum={42} />
            </td>
            <td>
              <Moving toothNum={41} />
            </td>
            <td>
              <Moving toothNum={31} />
            </td>
            <td>
              <Moving toothNum={32} />
            </td>
            <td>
              <Moving toothNum={33} />
            </td>
            <td>
              <Moving toothNum={34} />
            </td>
            <td>
              <Moving toothNum={35} />
            </td>
            <td>
              <Moving toothNum={36} />
            </td>
            <td>
              <Moving toothNum={37} />
            </td>
            <td>
              <Moving toothNum={38} />
            </td>
          </tr>
          <tr>
            <td className="title">Статус зуба</td>
            <td style={{ borderRight: 'none', borderLeft: 'none' }}>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
            <td>
              <select className="perio-select" data-tooth="18">
                <option value="other">Інший</option>
                <option value="intact">Наявний</option>
                <option value="empty">Відсутній</option>
                <option value="implant">Імплант</option>
                <option value="crown">Коронка</option>
                <option value="pontic">Проміжна частина</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
