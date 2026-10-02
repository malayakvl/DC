import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchResultServicesSelector,
  searchResultServicesElementsSelector,
} from '@/Redux/Service/selectors';
import {
  emptyServicesAutocompleteAction,
  findServiceMaterialAction,
} from '@/Redux/Service/actions';
import { setPriceItems, setShowTableError, setTotalPrice } from '@/Redux/Service';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngServices from '../../../Lang/Services/translation';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  ({ formRowData = null, unitData }, ref) => {
    const appLang = useSelector(appLangSelector);
    const msg = new Lang({
      messages: { ...lngServices },
      locale: appLang,
    });
    // Хелпер для нормалізації та фіксації константних цін у рядку
    const normalizeRow = (item: any) => {
      const price = parseFloat(item.price) || 0;
      const markup = parseFloat(item.mark_up) || 0;
      const qty = parseFloat(item.quantity) || 1;

      // Отримуємо або відновлюємо базову ціну закупівлі з даних БД
      let basePrice = parseFloat(
        item.base_price ?? item.purchase_price ?? item.price_per_unit ?? 0
      );
      if (!basePrice && price > 0) {
        basePrice = markup > 0 ? price / (1 + markup / 100) : price;
      }

      const total = item.total ? parseFloat(item.total) : parseFloat((qty * price).toFixed(2));

      return {
        ...item,
        quantity: qty.toFixed(2),
        price: parseFloat(price.toFixed(2)),
        mark_up: parseFloat(markup.toFixed(2)),
        base_price: parseFloat(basePrice.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
      };
    };

    const [inputs, setInputs] = useState(() => {
      if (!formRowData || formRowData.length === 0) return [];
      return formRowData.map(normalizeRow);
    });

    const dispatch = useDispatch();
    const [numRow, setNumRow] = useState(0);
    const serchResults = useSelector(searchResultServicesSelector);
    useSelector(searchResultServicesElementsSelector);

    // При відкритті на редагування заповнюємо стейт нормалізованими даними з зафіксованою закупівлею
    useEffect(() => {
      if (formRowData && formRowData.length > 0 && inputs.length === 0) {
        setInputs(formRowData.map(normalizeRow));
      }
    }, [formRowData]);

    const handleAddInput = () => {
      setInputs([
        ...inputs,
        {
          product_id: '',
          unit_id: '',
          product: '',
          quantity: '1.00',
          mark_up: '0.00',
          maxQty: '',
          price: 0,
          total: 0,
          base_price: 0,
          stock: 0,
          category: '',
        },
      ]);
    };

    useImperativeHandle(ref, () => ({
      addRow: handleAddInput,
    }));

    const handleChange = (event, index, customName = null, customValue = null) => {
      dispatch(setShowTableError(false));
      const name = customName || event.target.name;
      const value = customValue !== null ? customValue : event.target.value;

      const onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setNumRow(index);

      if (name === 'product') {
        if (value.length > 2) {
          dispatch(findServiceMaterialAction(value));
        } else {
          dispatch(emptyServicesAutocompleteAction());
        }
      }

      const row = onChangeValue[index];
      const qty = parseFloat(row.quantity) || 0;
      const basePrice = parseFloat(row.base_price) || 0;

      if (name === 'mark_up') {
        // Коли міняємо націнку — рахуємо нову ціну продажу від незмінної зафіксованої бази закупівлі
        const markup = parseFloat(value) || 0;
        const price = basePrice * (1 + markup / 100);
        row.price = parseFloat(price.toFixed(2));
        row.total = parseFloat((qty * price).toFixed(2));
      } else if (name === 'price') {
        // Коли міняємо ціну продажу руками — рахуємо зворотню націнку від зафіксованої бази
        const price = parseFloat(value) || 0;
        if (basePrice > 0) {
          const markup = ((price - basePrice) / basePrice) * 100;
          row.mark_up = parseFloat(markup.toFixed(2));
        }
        row.total = parseFloat((qty * price).toFixed(2));
      } else if (name === 'quantity') {
        const price = parseFloat(row.price) || 0;
        row.total = parseFloat((qty * price).toFixed(2));
      }

      setInputs(onChangeValue);
    };

    const handleQuantityChange = (index, delta) => {
      const onChangeValue = [...inputs];
      const currentQty = parseFloat(onChangeValue[index].quantity) || 0;
      const newQty = Math.max(0.01, currentQty + delta);
      onChangeValue[index].quantity = newQty.toFixed(2);

      const price = parseFloat(onChangeValue[index].price) || 0;
      onChangeValue[index].total = parseFloat((newQty * price).toFixed(2));
      setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      setInputs(newArray);
    };

    useEffect(() => {
      dispatch(setPriceItems(inputs));
      let totalItemPrice = 0;
      inputs.forEach((_input) => {
        totalItemPrice += Number(_input.total ? _input.total : 0);
      });
      dispatch(setTotalPrice(totalItemPrice));
    }, [inputs]);

    const renderSearchProducerResult = (index) => {
      if (serchResults.length > 0 && numRow === index) {
        return (
          <div className="absolute z-50 bg-white shadow-xl rounded-xl border border-slate-200 mt-1 max-h-60 overflow-y-auto left-0 right-0">
            <ul className="divide-y divide-slate-100">
              {serchResults.map((_res, rIndex) => (
                <li
                  key={rIndex}
                  className="cursor-pointer px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm flex items-center justify-between"
                  onClick={() => {
                    dispatch(emptyServicesAutocompleteAction());

                    // 1. Фіксуємо чисту базову ціну закупівлі з довідника
                    const basePrice = parseFloat(_res.price_per_unit || _res.price || 0);
                    // 2. Отримуємо націнку категорії
                    const markupPercent = parseFloat(_res.category_percent || 0);

                    // 3. Рахуємо фінальну ціну продажу
                    const finalPrice = basePrice * (1 + markupPercent / 100);
                    const quantity = 1;

                    const onChangeValue = [...inputs];
                    onChangeValue[index].product = _res.name;
                    onChangeValue[index].product_id = _res.id;
                    onChangeValue[index].quantity = quantity;
                    onChangeValue[index].unit_id = _res.unit_id;
                    onChangeValue[index].base_price = parseFloat(basePrice.toFixed(2));
                    onChangeValue[index].price = parseFloat(finalPrice.toFixed(2));
                    onChangeValue[index].mark_up = markupPercent;
                    onChangeValue[index].category = _res.category_name;
                    onChangeValue[index].total = parseFloat((quantity * finalPrice).toFixed(2));
                    onChangeValue[index].stock = _res.stock || 0;

                    setInputs(onChangeValue);
                  }}
                >
                  <span className="font-semibold text-slate-800">{_res.name}</span>
                  <span className="text-xs font-bold text-teal-700">
                    {parseFloat(_res.price_per_unit || _res.retail_price || _res.price).toFixed(2)}{' '}
                    ₴
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    };

    return (
      <>
        {inputs.map((item, index) => (
          <tr
            key={index}
            className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-none align-top"
          >
            {/* Пошук / Назва матеріалу */}
            <td className="py-3 px-3 relative">
              <div className="flex flex-col gap-1">
                <input
                  name="product"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all"
                  type="text"
                  placeholder="Почніть введення матеріалу..."
                  value={item.product || ''}
                  onChange={(event) => handleChange(event, index)}
                />
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.category || 'Категорія матеріалу'}
                  </span>
                </div>
                {numRow === index && renderSearchProducerResult(index)}
              </div>
            </td>

            {/* Одиниця виміру */}
            <td className="py-3 px-3 whitespace-nowrap">
              <select
                name="unit_id"
                value={item.unit_id || ''}
                onChange={(event) => handleChange(event, index)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
              >
                <option value="">{msg.get('service.unit')}...</option>
                {unitData?.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </td>

            {/* Норма витрати */}
            <td className="py-3 px-3">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(index, -0.1)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
                  >
                    -
                  </button>
                  <input
                    name="quantity"
                    className="w-14 text-center bg-transparent font-bold border-0 text-slate-900 text-xs focus:outline-none"
                    type="text"
                    value={item.quantity || ''}
                    onChange={(event) => handleChange(event, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(index, 0.1)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </td>

            {/* Ціна за одиницю (з націнкою) + підказка закупівлі */}
            <td className="py-3 px-3 text-center">
              <div className="flex flex-col gap-1 items-center">
                <input
                  className="w-24 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-800 focus:outline-none focus:bg-white"
                  name="price"
                  type="text"
                  value={item.price ?? ''}
                  onChange={(event) => handleChange(event, index)}
                  title="Ціна продажу для пацієнта"
                />
                <span className="text-[10px] text-slate-400 font-medium">
                  Закупка: {parseFloat(item.base_price || 0).toFixed(2)} ₴
                </span>
              </div>
            </td>

            {/* Націнка % */}
            <td className="py-3 px-3 text-center">
              <input
                className="w-20 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white"
                name="mark_up"
                type="text"
                value={item.mark_up ?? ''}
                onChange={(event) => handleChange(event, index)}
              />
            </td>

            {/* Усього */}
            <td className="py-3 px-3 text-center">
              <input
                className="w-24 px-3 py-2 rounded-xl bg-teal-50/50 border border-teal-100 text-center text-xs font-bold text-teal-800 focus:outline-none"
                name="total"
                type="text"
                value={item.total ?? ''}
                readOnly
              />
            </td>

            {/* Дії */}
            <td className="py-3 px-3 text-center pt-3">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDeleteInput(index)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors"
                  title="Видалити"
                >
                  ✕
                </button>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
);

AddDynamicInputFields.displayName = 'AddDynamicInputFields';

export default AddDynamicInputFields;