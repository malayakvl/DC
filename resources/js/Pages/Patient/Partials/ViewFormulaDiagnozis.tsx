import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';

export default function ViewFormulaDiagnozis({
  formulaData,
  formulaId,
}: {
  formulaData: any;
  formulaId: number;
}) {
  const appLang = useSelector(appLangSelector);
  const tData = formulaData;
  const msgFormula = new Lang({
    messages: lngFormula,
    locale: appLang,
  });
  const teethDiagnozis = tData;
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

  const renderDiagnoze = (num: any) => {
    let _diagnozisStr = false;
    if (teethDiagnozis[`tooth${num}`]) {
      Object.keys(teethDiagnozis[`tooth${num}`]).forEach((key: any, _key: number) => {
        if (teethDiagnozis[`tooth${num}`][key] && displayedDia.indexOf(key) >= 0) {
          _diagnozisStr = true;
        }
      });
    }
    if (_diagnozisStr) {
      return (
        <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 transition-all mb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-md bg-white border border-slate-300 shadow-xs flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs">🦷</span>
                <span className="text-[11px] font-bold text-slate-800 leading-none">{num}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-800">Третій моляр</span>
                  <span className="text-[10px] text-slate-400 font-mono">Q4 • НЧ</span>
                </div>
                {/*Diagnozis*/}
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {Object.keys(teethDiagnozis[`tooth${num}`]).map((_v, _k) => (
                    <React.Fragment key={_k}>
                      {teethDiagnozis[`tooth${num}`][_v] && _dArray.includes(_v) ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200w">
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
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200 ${teethDiagnozis[`tooth${num}`][`${_v}_color`]}`}
                        >
                          {msgFormula.get(`formula.${_v}`)}
                        </span>
                      ) : (
                        ''
                      )}
                    </React.Fragment>
                  ))}
                  {/*<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">*/}
                  {/*  Імплант (Хірургія)*/}
                  {/*</span>*/}
                  {/*<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">*/}
                  {/*  Карієс корінь*/}
                  {/*</span>*/}
                  {/*<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">*/}
                  {/*  Карієс право (D)*/}
                  {/*</span>*/}
                  {/*<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">*/}
                  {/*  Карієс центр (O)*/}
                  {/*</span>*/}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:text-teal-700 text-slate-400 rounded">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
              <button className="p-1 hover:text-red-600 text-slate-400 rounded">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {/*<div className="min-w-[50px] part-maxilla">*/}
          {/*  <i className="icon-tooth float-left" />*/}
          {/*  <span className="descr-d">*/}
          {/*    <b>{num}:</b>*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
      );
    } else {
      return;
    }
  };

  const renderJaw = () => {
    const jawUp = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    const jawDown = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
    return (
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span>Верхня щелепа (Maxilla)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">1 зуб із патологією</span>
        </div>
        <div className="w-full" id={`dia-up-${formulaId}`}>
          {jawUp.map((index: number) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span>Нижня щелепа (Mandibula)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">5 зубів із записами</span>
        </div>
        <div className="w-full" id={`dia-down-${formulaId}`}>
          {jawDown.map((index: number) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return <>{renderJaw()}</>;
}
