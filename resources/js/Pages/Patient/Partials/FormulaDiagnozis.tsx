import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';
import { getTeethDiagnozisSelector, getRemoveDiaSelector } from '../../../Redux/Formula/selectors';
import { setToothDiagnoze, setChangeDia } from '../../../Redux/Formula';

export default function FormulaDiagnozis() {
  const dispatch = useDispatch<any>();
  const appLang = useSelector(appLangSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeDia = useSelector(getRemoveDiaSelector); //important for update state do not remove
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const teethDiagnozis = useSelector(getTeethDiagnozisSelector);
  const _dArray = [
    'absent',
    'abutment',
    'apex',
    'change_color',
    'culttab',
    'fissure',
    'implant',
    'parodontit',
    'periodontit',
    'pin',
    'shaper',
    'tartar',
    'temporary_crown',
    'wedge_shaped_defect',
  ];
  const dColoredArray = [
    'caries_bottom',
    'caries_center',
    'caries_left',
    'caries_right',
    'caries_top',
    'cervical_caries',
    'ceramic_crown',
    'channel_not_sealed',
    'channel_part_sealed',
    'channel_top_sealed',
    'pulpit',
    'seal_cervical',
    'seal_bottom',
    'seal_center',
    'seal_left',
    'seal_right',
    'seal_top',
    'metalic_crown',
    'mceramic_crown',
    'zirconia_crown',
    'vinir',
    'inflamed_gums',
    'significantly_gums',
    'no_inflammatory_process',
  ];

  const displayedDia = _dArray.concat(dColoredArray);

  const disableDia = (num: any, key: any) => {
    const currentDiagnozis = teethDiagnozis;
    currentDiagnozis[`tooth${num}`][`${key}`] = false;
    if (key === 'parodontit') {
      currentDiagnozis[`tooth${num}`][`parodontit_stage`] = '';
    }
    dispatch(setToothDiagnoze(currentDiagnozis));
    dispatch(setChangeDia(Math.random()));
  };
  const disableColorDia = (num: any, key: any) => {
    const currentDiagnozis = teethDiagnozis;
    currentDiagnozis[`tooth${num}`][`${key}`] = false;
    currentDiagnozis[`tooth${num}`][`${key}_color`] = null;
    if (
      key === 'pulpit' ||
      key === 'channel_not_sealed' ||
      key === 'channel_part_sealed' ||
      key === 'channel_top_sealed'
    ) {
      currentDiagnozis[`tooth${num}`][`channel_class`] = null;
    }
    dispatch(setToothDiagnoze(currentDiagnozis));
    dispatch(setChangeDia(Math.random()));
  };

  const renderDiagnoze = (num: any) => {
    let _diagnozisStr = false;
    if (teethDiagnozis[`tooth${num}`]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.keys(teethDiagnozis[`tooth${num}`]).forEach((key: any, _key: number) => {
        if (teethDiagnozis[`tooth${num}`][key] && displayedDia.indexOf(key) >= 0) {
          _diagnozisStr = true;
        }
      });
    }
    if (_diagnozisStr) {
      return (
        <li className="flex">
          <div className="min-w-[50px]">
            <span className="descr-d">
              🦷 <b>{num}:</b>
            </span>
          </div>
          <div className="flex flex-wrap">
            {Object.keys(teethDiagnozis[`tooth${num}`]).map((_v, _k) => (
              <React.Fragment key={_k}>
                {teethDiagnozis[`tooth${num}`][_v] && _dArray.includes(_v) ? (
                  <span className={`d-badge ${_v}`} onClick={() => disableDia(num, _v)}>
                    {msgFormula.get(`formula.${_v}`)}{' '}
                    {_v === 'parodontit'
                      ? msgFormula.get(
                          `formula.${teethDiagnozis[`tooth${num}`]['parodontit_stage']}`
                        )
                      : ''}
                  </span>
                ) : (
                  ''
                )}
                {teethDiagnozis[`tooth${num}`][_v] && dColoredArray.includes(_v) ? (
                  <span
                    className={`d-badge ${_v} ${teethDiagnozis[`tooth${num}`][`${_v}_color`]}`}
                    onClick={() => disableColorDia(num, _v)}
                  >
                    {msgFormula.get(`formula.${_v}`)}
                  </span>
                ) : (
                  ''
                )}
              </React.Fragment>
            ))}
          </div>
        </li>
      );
    } else {
      return;
    }
  };

  const renderJaw = () => {
    const jawUp = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    const jawDown = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
    return (
      <div className="w-full flex ">
        <div className="w-1/2 md:col-span-4 bg-white/80 rounded-lg border border-slate-200/80 p-2.5 flex flex-col gap-2 shadow-xs mr-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                {msgFormula.get('formula.formula_maxilla')}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">(Maxilla)</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
              1 зуб
            </span>
          </div>
          {jawUp.map((index) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
        <div className="w-1/2 md:col-span-4 bg-white/80 rounded-lg border border-slate-200/80 p-2.5 flex flex-col gap-2 shadow-xs ml-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                {msgFormula.get('formula.formuala_mandibula')}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">(Mandibula)</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
              {Object.keys(jawUp).length}! зубів
            </span>
          </div>
          {jawDown.map((index) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            {msgFormula.get('formula.formula_used_teeth')}
          </span>
          <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full shadow-2xs">
            7 {msgFormula.get('formula.teeth_selected')}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-slate-500 hidden sm:inline-flex">
            <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            {msgFormula.get('formula.click_for_cancel')}
          </span>
          <button
            type="button"
            className="text-teal-700 hover:text-teal-900 font-semibold transition-colors cursor-pointer"
          >
            {msgFormula.get('formula.cancel_all')}
          </button>
        </div>
      </div>
      <ul className={'mt-4'}>{renderJaw()}</ul>
    </>
  );
}
