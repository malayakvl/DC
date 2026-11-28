import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faMinus, faStar, faRotateLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import { getPsrDataSelector } from '../../../Redux/Formula/selectors';
import { setPsrValues } from '../../../Redux/Formula';

const SEXTANT_META = [
  { index: 0, code: 'S1', teeth: '17–14', jaw: 'upper' },
  { index: 1, code: 'S2', teeth: '13–23', jaw: 'upper' },
  { index: 2, code: 'S3', teeth: '24–27', jaw: 'upper' },
  { index: 3, code: 'S6', teeth: '47–44', jaw: 'lower' },
  { index: 4, code: 'S5', teeth: '43–33', jaw: 'lower' },
  { index: 5, code: 'S4', teeth: '34–37', jaw: 'lower' },
];

const SCORE_BADGE_STYLES: Record<string, string> = {
  '0': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  '1': 'text-lime-600 bg-lime-50 border-lime-200',
  '2': 'text-amber-600 bg-amber-50 border-amber-200',
  '3': 'text-orange-600 bg-orange-50 border-orange-200',
  '4': 'text-rose-600 bg-rose-50 border-rose-200',
  '-': 'text-slate-500 bg-slate-100 border-slate-200',
};

export default function PSR() {
  const [values, setValues] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const [stars, setStars] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [minuses, setMinuses] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();
  const psrDefData = useSelector(getPsrDataSelector);

  useEffect(() => {
    if (psrDefData) {
      setValues(psrDefData.values || ['', '', '', '', '', '', '', '']);
      setStars(psrDefData.stars || [0, 0, 0, 0, 0, 0, 0, 0]);
      setMinuses(psrDefData.minuses || [0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }, [psrDefData]);

  const syncRedux = (nextValues: string[], nextStars: number[], nextMinuses: number[]) => {
    dispatch(
      setPsrValues({
        values: nextValues,
        stars: nextStars,
        minuses: nextMinuses,
      })
    );
  };

  const applyScoreToIndex = (index: number, rawChar: string) => {
    const newValues = [...values];
    const newMinuses = [...minuses];

    if (rawChar === '-') {
      newValues[index] = '-';
      newMinuses[index] = 1;
      const newStars = [...stars];
      newStars[index] = 0;
      setStars(newStars);
      setValues(newValues);
      setMinuses(newMinuses);
      syncRedux(newValues, newStars, newMinuses);
    } else if (/^[0-9]$/.test(rawChar)) {
      const parsed = parseInt(rawChar, 10);
      newValues[index] = parsed > 4 ? '4' : String(parsed);
      newMinuses[index] = 0;
      setValues(newValues);
      setMinuses(newMinuses);
      syncRedux(newValues, stars, newMinuses);
    } else if (rawChar === '') {
      newValues[index] = '';
      newMinuses[index] = 0;
      setValues(newValues);
      setMinuses(newMinuses);
      syncRedux(newValues, stars, newMinuses);
      return;
    }

    const nextIndex = index < 5 ? index + 1 : 0;
    setActiveIndex(nextIndex);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    if (raw === '') {
      applyScoreToIndex(index, '');
      return;
    }
    const lastChar = raw.slice(-1);
    applyScoreToIndex(index, lastChar);
  };

  const handleStarChange = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newStars = [...stars];
    const newMinuses = [...minuses];
    const newValues = [...values];

    newStars[index] = newStars[index] !== 1 ? 1 : 0;
    newMinuses[index] = 0;
    if (newValues[index] === '-') {
      newValues[index] = '0';
    }

    setStars(newStars);
    setMinuses(newMinuses);
    setValues(newValues);
    syncRedux(newValues, newStars, newMinuses);
  };

  const handleMinusChange = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newMinuses = [...minuses];
    const newStars = [...stars];
    const newValues = [...values];

    const isActivating = newMinuses[index] !== 1;
    newMinuses[index] = isActivating ? 1 : 0;
    newStars[index] = 0;
    newValues[index] = isActivating ? '-' : '';

    setMinuses(newMinuses);
    setStars(newStars);
    setValues(newValues);
    syncRedux(newValues, newStars, newMinuses);
  };

  const handleResetAll = () => {
    const emptyVals = ['', '', '', '', '', '', '', ''];
    const emptyFlags = [0, 0, 0, 0, 0, 0, 0, 0];
    setValues(emptyVals);
    setStars(emptyFlags);
    setMinuses(emptyFlags);
    setActiveIndex(0);
    syncRedux(emptyVals, emptyFlags, emptyFlags);
  };

  // Автоматичний клінічний висновок по заповнених секстантах
  const diagnosis = useMemo(() => {
    const activeVals = values.slice(0, 6);
    const filled = activeVals.filter((v) => v !== '');
    const numericScores = activeVals
      .filter((v) => ['0', '1', '2', '3', '4'].includes(v))
      .map((v) => parseInt(v, 10));
    const hasStar = stars.slice(0, 6).some((s) => s === 1);

    if (filled.length === 0) {
      return {
        filledCount: 0,
        tone: 'neutral',
        title: 'Скринінг не заповнено',
        desc: 'Оберіть секстант та введіть максимальний бал зондування (0–4) для автоматичного формування висновку.',
      };
    }

    const maxScore = numericScores.length > 0 ? Math.max(...numericScores) : -1;

    if (maxScore === 4) {
      return {
        filledCount: filled.length,
        tone: 'danger',
        title: `Код 4${hasStar ? '*' : ''} — Важкий пародонтит (> 5.5 мм)`,
        desc: 'Виявлено глибокі пародонтальні кишені. Показана повна пародонтологічна карта (6 точок), рентген-діагностика (ОПТГ/КТ) та комплексне лікування (SRP).',
      };
    }
    if (maxScore === 3) {
      return {
        filledCount: filled.length,
        tone: 'warning',
        title: `Код 3${hasStar ? '*' : ''} — Пародонтит середнього ступеня (3.5–5.5 мм)`,
        desc: 'Кольорова зона зонда частково занурена. Рекомендовано заповнення періо-карти уражених секстантів та під’ясенний скейлінг.',
      };
    }
    if (maxScore === 2) {
      return {
        filledCount: filled.length,
        tone: 'amber',
        title: `Код 2${hasStar ? '*' : ''} — Зубні відкладення / дефекти реставрацій`,
        desc: 'Кишені < 3.5 мм, наявний над-/під’ясенний камінь або нависаючі краї пломб. Показана професійна гігієна та корекція країв.',
      };
    }
    if (maxScore === 1) {
      return {
        filledCount: filled.length,
        tone: 'lime',
        title: `Код 1${hasStar ? '*' : ''} — Гінгівіт (кровоточивість)`,
        desc: 'Кишені < 3.5 мм, відсутній камінь, спостерігається кровоточивість при зондуванні. Корекція індивідуальної гігієни.',
      };
    }
    if (maxScore === 0) {
      return {
        filledCount: filled.length,
        tone: 'success',
        title: `Код 0${hasStar ? '*' : ''} — Здоровий пародонт`,
        desc: 'Ознаки запалення та патологічних кишень відсутні. Рекомендований плановий огляд через 6 місяців.',
      };
    }

    return {
      filledCount: filled.length,
      tone: 'neutral',
      title: 'Секстанти відсутні (—)',
      desc: 'У заповнених секстантах відсутні зуби для проведення PSR-тесту.',
    };
  }, [values, stars]);

  const activeMeta = SEXTANT_META[activeIndex];

  const renderSextantCard = (meta: (typeof SEXTANT_META)[number]) => {
    const { index, code, teeth } = meta;
    const val = values[index];
    const isStar = stars[index] === 1;
    const isMinus = minuses[index] === 1 || val === '-';
    const isActive = activeIndex === index;
    const badgeClass = SCORE_BADGE_STYLES[val] || 'text-slate-400 bg-slate-100 border-slate-200';

    return (
      <div
        key={index}
        onClick={() => {
          setActiveIndex(index);
          inputRefs.current[index]?.focus();
        }}
        className={`group relative bg-white rounded-xl p-3 border transition-all cursor-pointer select-none flex flex-col items-center ${
          isActive
            ? 'border-teal-500 ring-2 ring-teal-500/25 shadow-sm bg-teal-50/10'
            : 'border-slate-200 hover:border-teal-300'
        }`}
      >
        <div className="w-full flex items-center justify-between text-[11px] mb-1">
          <span className="font-bold text-slate-500">
            {code} <span className="font-normal text-slate-400">({teeth})</span>
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badgeClass}`}>
            {val !== '' ? `${val}${isStar ? '*' : ''}` : '—'}
          </span>
        </div>

        {/* Поле вводу + візуальний дріб */}
        <div className="w-full border-b-2 border-slate-200 pb-1.5 mb-2 flex justify-center">
          <input
            type="text"
            inputMode="numeric"
            placeholder="–"
            value={val}
            onFocus={() => setActiveIndex(index)}
            onChange={(e) => handleInputChange(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            maxLength={2}
            className="psr w-14 h-9 text-center text-2xl font-extrabold text-slate-800 bg-transparent border-0 focus:ring-0 p-0 placeholder:text-slate-300"
          />
        </div>

        {/* Кнопки Мінус (відсутні зуби) та Зірочка (ускладнення) */}
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            type="button"
            title="Відсутні зуби в секстанті (-)"
            onClick={(e) => handleMinusChange(index, e)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors border ${
              isMinus
                ? 'bg-slate-700 text-white border-slate-700'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <button
            type="button"
            title="Ускладнення (*): фуркація, рухомість II-III ст., рецесія ≥ 3.5 мм"
            onClick={(e) => handleStarChange(index, e)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors border ${
              isStar
                ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 sm:p-0">
      {/* Заголовок блоку */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Пародонтальний скринінг тест (PSR)
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 rounded-md">
              ВООЗ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Фіксується максимальний код зондування (0–4) для кожного секстанту.
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Заповнено: <strong className="text-slate-800">{diagnosis.filledCount} / 6</strong>
          </span>
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Очистити
          </button>
        </div>
      </div>

      {/* Основна сітка: Зліва зуби + матриця, Справа панель вводу + легенда */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ЛІВА ЧАСТИНА: Щелепи та матриця секстантів */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
          {/* Верхня щелепа */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2 mb-3">
            <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Верхня щелепа
            </span>
            <span>S1 (17–14) • S2 (13–23) • S3 (24–27)</span>
          </div>

          <section className="psr-jaw-up w-full overflow-x-auto py-1">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 2085 550"
              className="w-full max-w-2xl mx-auto h-auto"
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

          {/* Центральна матриця секстантів */}
          <div className="my-5 p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-3 px-1">
              <span>Правий сектор (R)</span>
              <span className="text-teal-700 uppercase tracking-wider font-bold">
                Матриця балів PSR
              </span>
              <span>Лівий сектор (L)</span>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
              {SEXTANT_META.map((meta) => renderSextantCard(meta))}
            </div>
          </div>

          {/* Нижня щелепа */}
          <section className="psr-jaw-down w-full overflow-x-auto py-1">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 1002.9 2085 550"
              className="w-full max-w-2xl mx-auto h-auto"
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
              {/* Виправлено: 34-й зуб належить до лівого бокового секстанту (values[5]) */}
              <Tooth34 psrValue={values[5]} psrStar={stars[5]} />
              <Tooth35 psrValue={values[5]} psrStar={stars[5]} />
              <Tooth36 psrValue={values[5]} psrStar={stars[5]} />
              <Tooth37 psrValue={values[5]} psrStar={stars[5]} />
              <Tooth38 />
            </svg>
          </section>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2 mt-3">
            <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Нижня щелепа
            </span>
            <span>S6 (47–44) • S5 (43–33) • S4 (34–37)</span>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: Швидкий пульт, шкала ВООЗ та висновок */}
        <div className="xl:col-span-4 space-y-4">
          {/* Панель швидкого введення */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Швидке введення
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                Секстант {activeMeta.code} ({activeMeta.teeth})
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  score: '0',
                  label: 'Здоровий',
                  cls: 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100',
                },
                {
                  score: '1',
                  label: 'Кровотеча',
                  cls: 'bg-lime-50 border-lime-200 text-lime-800 hover:bg-lime-100',
                },
                {
                  score: '2',
                  label: 'Камінь',
                  cls: 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100',
                },
                {
                  score: '3',
                  label: '3.5–5.5 мм',
                  cls: 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100',
                },
                {
                  score: '4',
                  label: '> 5.5 мм',
                  cls: 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100',
                },
              ].map((btn) => (
                <button
                  key={btn.score}
                  type="button"
                  onClick={() => applyScoreToIndex(activeIndex, btn.score)}
                  className={`h-13 py-1.5 rounded-xl border font-bold text-lg flex flex-col items-center justify-center transition active:scale-95 ${btn.cls}`}
                >
                  <span>{btn.score}</span>
                  <span className="text-[10px] font-medium opacity-80">{btn.label}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleStarChange(activeIndex)}
                className={`h-13 py-1.5 rounded-xl border font-bold text-base flex flex-col items-center justify-center transition active:scale-95 ${
                  stars[activeIndex] === 1
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
                }`}
              >
                <FontAwesomeIcon icon={faStar} />
                <span className="text-[10px] font-medium mt-0.5">Символ *</span>
              </button>
            </div>
          </div>

          {/* Шкала кодів PSR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Шкала кодів PSR (ВООЗ)
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <span>
                  <strong className="text-slate-800">Код 0:</strong> &lt;3.5 мм, чорна мітка видна,
                  без кровоточивості та каменю.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-500 mt-1 shrink-0" />
                <span>
                  <strong className="text-slate-800">Код 1:</strong> &lt;3.5 мм, є кровоточивість
                  при зондуванні (BOP).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <span>
                  <strong className="text-slate-800">Код 2:</strong> &lt;3.5 мм, зубний камінь або
                  нависаючі краї пломб.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1 shrink-0" />
                <span>
                  <strong className="text-slate-800">Код 3:</strong> Кишеня 3.5–5.5 мм (чорна зона
                  частково занурена).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <span>
                  <strong className="text-slate-800">Код 4:</strong> Кишеня &gt;5.5 мм (чорна зона
                  повністю зникла).
                </span>
              </li>
              <li className="flex items-start gap-2 pt-1.5 border-t border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 mt-1 shrink-0" />
                <span>
                  <strong className="text-purple-700">Символ (*):</strong> Фуркації, рухомість
                  II–III ст., рецесія ≥3.5 мм.
                </span>
              </li>
            </ul>
          </div>

          {/* Клінічний висновок */}
          <div
            className={`rounded-2xl border p-4 transition-colors ${
              diagnosis.tone === 'danger'
                ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                : diagnosis.tone === 'warning'
                  ? 'bg-orange-50/80 border-orange-200 text-orange-950'
                  : diagnosis.tone === 'amber'
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : diagnosis.tone === 'lime'
                      ? 'bg-lime-50/80 border-lime-200 text-lime-950'
                      : diagnosis.tone === 'success'
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <FontAwesomeIcon icon={faCheckCircle} className="text-teal-600 text-sm" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Клінічний висновок</h4>
            </div>
            <p className="text-xs font-bold mb-1">{diagnosis.title}</p>
            <p className="text-xs opacity-85 leading-relaxed">{diagnosis.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
