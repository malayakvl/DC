import { useForm } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngServiceCategories from '../../Lang/Services/translation';
import { setServicesAction } from '../../Redux/Patient';
import { patientServicesSelector } from '../../Redux/Patient/selectors';

export default function Pricing({ clinicData, tree, services, currency }) {
  const dispatch = useDispatch();
  const servicesPopup = useSelector(patientServicesSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngServiceCategories,
    locale: appLang,
  });
  const {
    delete: destroy,
  } = useForm({
    password: '',
  });

  const renderPriceBlock = (item, num) => {
    return (
      <div>
        <div className={`price-container pr-${num}`}>
          <b className="mb-4 block">{item.name}</b>
          {services[item.id]?.map((_item, _index) => (
            <span className={`add-minpulation-row ${servicesPopup.find(_s => _s.id === _item.id)?.id ? 'selected' : ''}`} onClick={() => {
              dispatch(setServicesAction(_item));
            }}>
              <div
                className={`mt-0 price-row ${_index === 0 ? 'first-child' : ''}`}
              >
                <div className="inline-block">
                  <span className="px-[5px] py-[4px] ">{_item.name}</span>
                </div>
                <div className="price-value">
                  <span className="px-[5px] py-[4px] ">
                    {_item.total} {currency}
                  </span>
                </div>
              </div>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={'price-popup relative'}>
      <div className="py-0">
        <div>
          <div className="sm:p-8 mb-3">
            <div className="mt-6">
              {tree?.map((item, index) => <>{renderPriceBlock(item, index)}</>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
