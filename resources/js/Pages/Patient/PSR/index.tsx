import { Transition } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../../Lang/Material/translation';
import InputText from '../../../Components/Form/InputText';
import InputTreeSelect from '../../../Components/Form/InputTreeSelect';
import {
  emptyProducersAutocompleteAction,
  findProducersAction,
} from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import InputSelect from '../../../Components/Form/InputSelect';
import {
  faMinus,
  faStar,
  faTrash,
  faCopy,
  faPrint,
  faUserDoctor, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tooth48 from './Tooth48';
import Tooth47 from './Tooth47';
import Tooth46 from './Tooth46';
import Tooth45 from './Tooth45';
import Tooth44 from './Tooth44';
import Tooth43 from './Tooth43';
import Tooth42 from './Tooth42';
import Tooth41 from './Tooth41';
import Tooth31 from './Tooth31';
import Tooth32 from './Tooth32';
import Tooth33 from './Tooth33';
import Tooth34 from './Tooth34';
import Tooth35 from './Tooth35';
import Tooth36 from './Tooth36';
import Tooth37 from './Tooth37';
import Tooth38 from './Tooth38';
import Tooth28 from './Tooth28';
import Tooth27 from './Tooth27';
import Tooth26 from './Tooth26';
import Tooth25 from './Tooth25';
import Tooth24 from './Tooth24';
import Tooth23 from './Tooth23';
import Tooth22 from './Tooth22';
import Tooth21 from './Tooth21';
import Tooth11 from './Tooth11';
import Tooth12 from './Tooth12';
import Tooth13 from './Tooth13';
import Tooth14 from './Tooth14';
import Tooth15 from './Tooth15';
import Tooth16 from './Tooth16';
import Tooth17 from './Tooth17';
import Tooth18 from './Tooth18';
//
import {
  getPsrDataSelector,
  getActiveToothNumberSelector,
} from '../../../Redux/Formula/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPsrValues } from '../../../Redux/Formula';

export default function PSR({ psrData }) {
  const [values, setValues] = useState(['', '', '', '', '', '', '', '']); // Массив для хранения значений
  const [stars, setStars] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // Массив для хранения звездочек
  const [minuses, setMinuses] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // Массив для хранения звездочек
  const inputRefs = useRef([null, null, null, null, null, null]); // Массив для хранения ссылок на input
  const dispatch = useDispatch();
  const psrDefData = useSelector(getPsrDataSelector);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const newValues = [...values]; // Создаем копию массива для обновления
    // Проверяем, что введено число
    if (/^\d*$/.test(newValue)) {
      const lastDigit = event.target.value.replace(newValues[index], '');
      const numValue = lastDigit === '' ? '' : parseInt(lastDigit);
      // Если число больше 4, устанавливаем 4, иначе последнее введенное значение
      newValues[index] = numValue > 4 ? '4' : lastDigit;
      setValues(newValues);
      inputRefs.current[index < 5 ? index +1 : 0].focus();
    } else {
      const lastDigit = event.target.value.replace(newValues[index], '');
      newValues[index] = parseInt(lastDigit) > 4 ? '4' : lastDigit;
      setValues(newValues);
      inputRefs.current[index < 5 ? index +1 : 0].focus();
    }
  };

  const handleStarChange = (index) => {
    const newStars = [...stars]; // Создаем копию массива для обновления
    const newMinuses = [...minuses]; // Создаем копию массива для обновления
    const newValues = [...values];
    newStars[index] = newStars[index] != 1 ? 1 : 0;
    newMinuses[index] = 0;
    if (newValues[index] === '-') {
      newValues[index] = '0'
    }
    setMinuses(newMinuses);
    setStars(newStars);
    setValues(newValues);
  }

  const handleMinusChange = (index) => {
    const newMinuses = [...minuses]; // Создаем копию массива для обновления
    const newStars = [...stars]; // Создаем копию массива для обновления
    const newValues = [...values];
    newMinuses[index] = newMinuses[index] != 1 ? 1 : 0;
    newStars[index] = 0;
    newValues[index] = '-';
    setMinuses(newMinuses);
    setStars(newStars);
    setValues(newValues);
  }

  // Привязываем ссылки на input при рендере
  useEffect(() => {
    inputRefs.current = [
      ...document.querySelectorAll('input[type="text"]') // Получаем все input
    ];
  }, []);

  useEffect(() => {
    dispatch(setPsrValues({
      values: values,
      stars: stars,
      minuses: minuses
    }));
  }, [values, stars, minuses]);

  useEffect(() => {
    setValues(psrDefData.values)
    setStars(psrDefData.stars)
    setMinuses(psrDefData.minuses)
  }, [psrDefData])

  return (
    <div className="w-full scroll-x">
      <section className="psr-jaw-up">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 2085 550"
          xmlSpace="preserve"
        >
          <Tooth28 />
          <Tooth27 psrValue={values[2]} psrStar={stars[2]} />
          <Tooth26 psrValue={values[2]} psrStar={stars[2]} />
          <Tooth25 psrValue={values[2]} psrStar={stars[2]} />
          <Tooth24 psrValue={values[2]} psrStar={stars[2]} />
          <Tooth23 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth22 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth21 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth11 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth12 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth13 psrValue={values[1]} psrStar={stars[1]} />
          <Tooth14 psrValue={values[0]} psrStar={stars[0]} />
          <Tooth15 psrValue={values[0]} psrStar={stars[0]} />
          <Tooth16 psrValue={values[0]} psrStar={stars[0]} />
          <Tooth17 psrValue={values[0]} psrStar={stars[0]} />
          <Tooth18 />
        </svg>
      </section>
      <div className="clearfix" />
      <div
        className="flex flex-row psr-b-inputs"
        style={{ margin: '15px 0', height: '32px' }}
      >
        <div
          style={{ maxWidth: '450px', margin: 'auto' }}
          className=" flex flex-row max-w-[650px] pl-[20px]"
        >
          <div className="flex">
            {
              [0, 1, 2].map((index) => (
                <div className={`text-center grid mr-[${index != 2 ? 6 : ''}0px] mt-[10px]`}>
                  <input
                    key={index}
                    type="text"
                    className="psr"
                    value={values[index]}
                    onChange={(event) => handleInputChange(index, event)}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    maxLength={2}  // Ограничиваем ввод до одного символа
                  />
                  <div>
                    <span className={`c-gray ${minuses[index] === 1 ? 'active' : ''}`}>
                      <FontAwesomeIcon onClick={() => {
                        handleMinusChange(index)
                      }} icon={faMinus} className="mr-3" />
                    </span>
                      <span className={`c-gray ${stars[index] === 1 ? 'active' : ''}`}>
                      <FontAwesomeIcon onClick={() => {
                        handleStarChange(index)
                      }} icon={faStar} className="mr-3" />
                    </span>
                  </div>
                  <div className="clearfix" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div
        className="flex flex-row psr-b-inputs"
        style={{ margin: '45px 0', height: '32px' }}
      >
        <div
          style={{ maxWidth: '450px', margin: 'auto' }}
          className=" flex flex-row max-w-[650px] pl-[20px]"
        >
          <div className="flex">
            {
              [3, 4, 5].map((index) => (
                <div className={`text-center grid mr-[${index != 2 ? 6 : ''}0px] mt-[10px]`}>
                  <input
                    key={index}
                    type="text"
                    className="psr"
                    value={values[index]}
                    onChange={(event) => handleInputChange(index, event)}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    maxLength={2}  // Ограничиваем ввод до одного символа
                  />
                  <div>
                    <span className={'c-gray'}>
                      <FontAwesomeIcon onClick={() => {
                        handleMinusChange(index)
                      }} icon={faMinus} className="mr-3" />
                    </span>
                    <span className={`c-gray ${stars[index] === 1 ? 'active' : ''}`}>
                      <FontAwesomeIcon onClick={() => {
                        handleStarChange(index)
                      }} icon={faStar} className="mr-3" />
                    </span>
                  </div>
                  <div className="clearfix" />
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <section className="psr-jaw-down">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 1002.9 2085 550"
          xmlSpace="preserve"
        >
          <Tooth48 />
          <Tooth47 psrValue={values[3]} psrStar={stars[3]} />
          <Tooth46 psrValue={values[3]} psrStar={stars[3]} />
          <Tooth45 psrValue={values[3]} psrStar={stars[3]} />
          <Tooth44 psrValue={values[3]} psrStar={stars[3]} />
          <Tooth43 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth42 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth41 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth31 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth32 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth33 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth34 psrValue={values[4]} psrStar={stars[4]} />
          <Tooth35 psrValue={values[5]} psrStar={stars[5]} />
          <Tooth36 psrValue={values[5]} psrStar={stars[5]} />
          <Tooth37 psrValue={values[5]} psrStar={stars[5]} />
          <Tooth38 />
        </svg>
      </section>
    </div>
  );
}
