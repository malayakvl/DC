import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngFormula from '../../../Lang/Formula/translation';

export default function ViewFormulaDiagnozis({ formulaData, formulaId }) {
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
    'no_inflammatory_process'
  ];

  const displayedDia = _dArray.concat(dColoredArray);

  const renderDiagnoze = num => {
    let _diagnozisStr = false;
    if (teethDiagnozis[`tooth${num}`]) {
      Object.keys(teethDiagnozis[`tooth${num}`]).forEach((key, _key) => {
        if (
          teethDiagnozis[`tooth${num}`][key] &&
          displayedDia.indexOf(key) >= 0
        ) {
          _diagnozisStr = true;
        }
      });
    }
    if (_diagnozisStr) {
      return (
        <li className="flex">
          <div className="min-w-[50px]">
            <i className="icon-tooth float-left" />
            <span className="descr-d">
              <b>{num}:</b>
            </span>
          </div>
          <div className="flex flex-wrap">
            {Object.keys(teethDiagnozis[`tooth${num}`]).map((_v, _k) => (
              <React.Fragment key={_k}>
                {teethDiagnozis[`tooth${num}`][_v] && _dArray.includes(_v) ? (
                  <span className="d-badge-view">
                    {msgFormula.get(`formula.${_v}`)} {_v === 'parodontit' ? msgFormula.get(`formula.${teethDiagnozis[`tooth${num}`]['parodontit_stage']}`) : ''}
                  </span>
                ) : (
                  ''
                )}
                {teethDiagnozis[`tooth${num}`][_v] &&
                dColoredArray.includes(_v) ? (
                  <span
                    className={`d-badge-view ${teethDiagnozis[`tooth${num}`][`${_v}_color`]}`}
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
    const jawUp = [
      18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
    ];
    const jawDown = [
      48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
    ];
    return (
      <div className="w-full flex">
        <div className="w-1/2" id={`dia-up-${formulaId}`}>
          {jawUp.map((index, num) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
        <div className="w-1/2" id={`dia-down-${formulaId}`}>
          {jawDown.map((index, num) => (
            <React.Fragment key={index}>{renderDiagnoze(index)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <ul>{renderJaw()}</ul>
    </>
  );
}
