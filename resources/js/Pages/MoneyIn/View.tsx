import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMoneyIn from '../../Lang/MoneyIn/translation';
import lngDropdown from '../../Lang/Dropdown/translation';


export function numberToWordsUa(amount: number | string): string {
  if (amount === null || amount === undefined || amount === '') return '';

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '';

  const units = ['', 'один', 'два', 'три', 'чотири', 'п’ять', 'шість', 'сім', 'вісім', 'дев’ять'];
  const unitsFemale = [
    '',
    'одна',
    'дві',
    'три',
    'чотири',
    'п’ять',
    'шість',
    'сім',
    'вісім',
    'дев’ять',
  ];
  const teens = [
    'десять',
    'одинадцять',
    'дванадцять',
    'тринадцять',
    'чотирнадцять',
    'п’ятнадцять',
    'шістнадцять',
    'сімнадцять',
    'вісімнадцять',
    'дев’ятнадцять',
  ];
  const tens = [
    '',
    'десять',
    'двадцять',
    'тридцять',
    'сорок',
    'п’ятдесят',
    'шістдесят',
    'сімдесят',
    'вісімдесят',
    'дев’ятдесят',
  ];
  const hundreds = [
    '',
    'сто',
    'двісті',
    'триста',
    'чотириста',
    'п’ятсот',
    'шістсот',
    'сімсот',
    'вісімсот',
    'дев’ятсот',
  ];

  const intPart = Math.floor(Math.abs(num));
  const coins = Math.round((Math.abs(num) - intPart) * 100);
  const coinsStr = coins < 10 ? `0${coins}` : `${coins}`;

  if (intPart === 0) {
    return `Нуль грн. ${coinsStr} коп.`;
  }

  // Функція для розбору трійок цифр (сотки, десятки, одиниці)
  const tripleToWords = (n: number, isFemale = false) => {
    let res = '';
    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (h > 0) res += hundreds[h] + ' ';

    if (t === 1) {
      res += teens[u] + ' ';
    } else {
      if (t > 0) res += tens[t] + ' ';
      if (u > 0) {
        res += (isFemale ? unitsFemale[u] : units[u]) + ' ';
      }
    }
    return res;
  };

  let words = '';

  // Мільйони
  const millions = Math.floor(intPart / 1000000);
  if (millions > 0) {
    const mStr = tripleToWords(millions, false);
    const lastTwo = millions % 100;
    const lastOne = millions % 10;
    let mEnding = 'мільйонів';
    if (lastTwo < 10 || lastTwo > 20) {
      if (lastOne === 1) mEnding = 'мільйон';
      else if (lastOne >= 2 && lastOne <= 4) mEnding = 'мільйони';
    }
    words += `${mStr}${mEnding} `;
  }

  // Тисячі (використовують жіночий рід: "одна тисяча", "дві тисячі")
  const thousands = Math.floor((intPart % 1000000) / 1000);
  if (thousands > 0) {
    const tStr = tripleToWords(thousands, true);
    const lastTwo = thousands % 100;
    const lastOne = thousands % 10;
    let tEnding = 'тисяч';
    if (lastTwo < 10 || lastTwo > 20) {
      if (lastOne === 1) tEnding = 'тисяча';
      else if (lastOne >= 2 && lastOne <= 4) tEnding = 'тисячі';
    }
    words += `${tStr}${tEnding} `;
  }

  // Залишок (одиниці гривень)
  const remainder = intPart % 1000;
  if (remainder > 0) {
    words += tripleToWords(remainder, true); // гривні жіночого роду ("дві гривні")
  }

  // Відмінювання слова "гривня"
  const lastTwo = intPart % 100;
  const lastOne = intPart % 10;
  let currencyEnding = 'грн.';

  if (lastTwo < 10 || lastTwo > 20) {
    if (lastOne === 1) currencyEnding = 'грн.';
    else if (lastOne >= 2 && lastOne <= 4) currencyEnding = 'грн.';
  }

  words = words.trim();
  if (words.length > 0) {
    words = words.charAt(0).toUpperCase() + words.slice(1);
  }

  return `${words} ${currencyEnding} ${coinsStr} коп.`;
}

export default function View({
  clinicData,
  formData,
  paymentMethods,
  customerData,
  currencyData,
}: {
  clinicData: any;
  formData: any;
  paymentMethods: any[];
  customerData: any[];
  currencyData: any[];
}) {
  const appLang = useSelector(appLangSelector);

  console.log('Clinic Data:', clinicData);
  console.log('Form Data (Document):', formData);
  console.log('Payment Methods:', paymentMethods);
  console.log('Currency Data:', currencyData);
  console.log('Customer Data:', customerData);

  const msg = new Lang({
    messages: lngMoneyIn,
    locale: appLang,
  });
  new Lang({
    messages: lngDropdown,
    locale: appLang,
  });

  const handlePrintKO1 = () => {
    window.print();
  };



  // Функция для парсинга даты вида "2026-10-12"
  const parseDocumentDate = (dateString: string) => {
    if (!dateString) {
      return { day: '___', month: '_______________', year: '2026' };
    }

    const [year, monthNum, day] = dateString.split('-');



    const monthsNames: { [key: string]: string } = {
      '01': 'січня',
      '02': 'лютого',
      '03': 'березня',
      '04': 'квітня',
      '05': 'травня',
      '06': 'червня',
      '07': 'липня',
      '08': 'серпня',
      '09': 'вересня',
      '10': 'жовтня',
      '11': 'листопада',
      '12': 'грудня',
    };

    return {
      day: day ? parseInt(day, 10).toString() : '___',
      month: monthsNames[monthNum] || '_______________',
      year: year || '2026',
    };
  };

  // Использование внутри компонента:
  const docDate = parseDocumentDate(formData?.document_date);
  const handleBack = () => {
    window.history.back();
  };

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={`Прибутковий ордер № ${formData?.document_number || formData?.id || ''}`} />

      <div className="p-3.5 mb-8 content-data bg-content max-w-5xl mx-auto">
        {/* Шапка управления (скрывается при печати) */}
        <section className="mb-6 mt-2 print:hidden">
          <header className="pb-4 border-b border-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition"
                  title="Назад"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold text-on-surface tracking-tight">
                  Перегляд прибуткового касового ордера №{' '}
                  {formData?.document_number || formData?.id}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  Типова форма № КО-1
                </span>
              </div>
              <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed pl-8">
                Офіційний документ оприбуткування та фіксації надходження коштів до каси клініки.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintKO1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Друк бланка КО-1
              </button>
            </div>
          </header>
        </section>

        {/* САМ БЛАНК ПРИХОДНОГО ОРДЕРА КО-1 */}
        <section className="bg-white p-8 border border-slate-300 shadow-sm text-black text-xs font-serif print:border-none print:shadow-none print:p-0 print:m-0">
          {/* Шапка бланка (Додаток) */}
          <div className="flex justify-between items-start mb-4 text-[10px]">
            <div></div>
            <div className="text-right leading-tight">
              <p>Додаток 2</p>
              <p>до Положення про ведення касових операцій</p>
              <p>у національній валюті в Україні</p>
              <p>(пункт 25 розділу III)</p>
              <p className="font-bold mt-1">Типова форма № КО-1</p>
            </div>
          </div>

          {/* Сетка бланка: Левая часть (Ордер) + Правая часть (Квитанция) */}
          <div className="grid grid-cols-12 gap-4 border-t-2 border-b-2 border-black py-3">
            {/* ЛЕВАЯ ЧАСТЬ: ПРИБУТКОВИЙ КАСОВИЙ ОРДЕР */}
            <div className="col-span-8 pr-4 border-r border-dashed border-black flex flex-col justify-between">
              <div>
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>
                      Ідентифікаційний код ЄДРПОУ <b>{clinicData?.edrpou || '_________'}</b>
                    </span>
                  </div>
                  <div className="text-center font-bold text-sm border-b border-black pb-1 uppercase tracking-wider">
                    {clinicData?.name || 'КЛІНІКА'}
                  </div>
                  <div className="text-center text-[9px] text-slate-600 mb-3">
                    (найменування підприємства/установи/організації)
                  </div>
                </div>

                <div className="text-center font-bold text-sm mb-3">
                  Прибутковий касовий ордер №{' '}
                  <span className="underline">
                    {formData?.document_number || formData?.id || '—'}
                  </span>
                  <div className="text-xs font-normal mt-1">
                    від «<span className="underline font-bold">{docDate.day}</span>»{' '}
                    <span className="underline font-bold">{docDate.month}</span> {docDate.year} року
                  </div>
                </div>

                {/* Таблица реквизитов */}
                <table className="w-full border-collapse border border-black text-center mb-4 text-[10px]">
                  <thead>
                    <tr className="bg-slate-50 print:bg-transparent">
                      <th className="border border-black p-1">№ з/п</th>
                      <th className="border border-black p-1">
                        Кореспондуючий рахунок, субрахунок
                      </th>
                      <th className="border border-black p-1">Код аналітичного рахунку</th>
                      <th className="border border-black p-1">Сума цифрами</th>
                      <th className="border border-black p-1">Код цільового призначення</th>
                      <th className="border border-black p-1">Примітки</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-1">1</td>
                      <td className="border border-black p-1 font-bold">311</td>
                      <td className="border border-black p-1"></td>
                      <td className="border border-black p-1 font-bold text-right pr-2">
                        {formData?.amount
                          ? Number(formData.amount).toLocaleString('uk-UA', {
                              minimumFractionDigits: 2,
                            })
                          : '0,00'}
                      </td>
                      <td className="border border-black p-1"></td>
                      <td className="border border-black p-1"></td>
                    </tr>
                  </tbody>
                </table>

                <div className="space-y-2.5 mb-6 text-[11px]">
                  <div>
                    Прийнято від:{' '}
                    <span className="border-b border-black inline-block w-full font-bold pb-0.5">
                      {formData?.customer_name ||
                        formData?.payer ||
                        '__________________________________________________'}
                    </span>
                  </div>
                  <div>
                    Підстава:{' '}
                    <span className="border-b border-black inline-block w-full font-bold italic pb-0.5">
                      {formData?.comment || formData?.description || 'Оплата медичних послуг'}
                    </span>
                  </div>
                  <div>
                    Сума:{' '}
                    <span className="border-b border-black inline-block w-4/5 font-bold pb-0.5">
                      {formData?.amount_string ||
                        (formData?.amount
                          ? numberToWordsUa(Number(formData.amount))
                          : '__________________________________________________________________')}
                    </span>
                  </div>
                  <div>
                    Додатки:{' '}
                    <span className="border-b border-black inline-block w-full pb-0.5">
                      {formData?.appendices ||
                        '___________________________________________________________'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Подписи ордера */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 print:border-none text-xs">
                <div>
                  <div className="mb-1 text-[10px]">Головний бухгалтер</div>
                  <div className="border-b border-black pb-1 font-bold text-center">
                    {formData?.chief_accountant || ''}
                  </div>
                  <div className="text-[8px] text-center text-slate-500">
                    (підпис, прізвище, ініціали)
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-[10px]">Одержав касир</div>
                  <div className="border-b border-black pb-1 font-bold text-center">
                    {formData?.cashier || ''}
                  </div>
                  <div className="text-[8px] text-center text-slate-500">
                    (підпис, прізвище, ініціали)
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: КВИТАНЦИЯ */}
            <div className="col-span-4 pl-2 flex flex-col justify-between text-[10px]">
              <div>
                <div className="text-right font-bold mb-2 text-[10px]">
                  {clinicData?.name || 'КЛІНІКА'}
                  <div className="text-[8px] font-normal text-slate-600">
                    (найменування підприємства)
                  </div>
                </div>

                <div className="text-center font-bold text-xs mb-1">
                  Квитанція
                  <br />
                  до прибуткового касового ордера №{' '}
                  <span className="underline">
                    {formData?.document_number || formData?.id || '—'}
                  </span>
                </div>
                <div className="text-center text-[9px] mb-3">
                  від «<span className="underline font-bold">{docDate.day}</span>»{' '}
                  <span className="underline font-bold">{docDate.month}</span> {docDate.year} року
                </div>

                <div className="space-y-2.5">
                  <div>
                    Прийнято від:{' '}
                    <div className="border-b border-black font-bold mt-0.5 pb-0.5">
                      {formData?.customer_name || formData?.payer || '_________________'}
                    </div>
                  </div>
                  <div>
                    Підстава:{' '}
                    <div className="border-b border-black font-bold mt-0.5 pb-0.5 italic">
                      {formData?.comment || formData?.description || '___________'}
                    </div>
                  </div>
                  <div>
                    Сума:{' '}
                    <div className="border-b border-black font-bold mt-0.5 pb-0.5">
                      {formData?.amount_string ||
                        (formData?.amount ? numberToWordsUa(Number(formData.amount)) : '_________')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Подписи квитанции */}
              <div className="space-y-3 pt-4">
                <div className="border border-black p-1 text-center font-bold text-[8px] uppercase tracking-wider">
                  М. П.
                </div>
                <div>
                  <div className="text-[9px]">Головний бухгалтер</div>
                  <div className="border-b border-black text-center font-bold pb-0.5">
                    {formData?.chief_accountant || ''}
                  </div>
                </div>
                <div>
                  <div className="text-[9px]">Касир</div>
                  <div className="border-b border-black text-center font-bold pb-0.5">
                    {formData?.cashier || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
