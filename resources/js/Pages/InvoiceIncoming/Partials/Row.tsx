import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { emptyMaterialsAutocompleteAction, findServiceMaterialCalcAction } from '@/Redux/Material';
import { setInvoiceItems, setShowTableError } from '@/Redux/Incominginvoice';
import { invoiceTaxSelector } from '@/Redux/Incominginvoice/selectors';
import { searchResultMaterialsSelector } from '@/Redux/Material/selectors';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ formRowData = null, lastRow = null, unitsData, msg }, ref) => {
    const dispatch = useAppDispatch();
    const serchResults = useAppSelector(searchResultMaterialsSelector);
    const documentTax = useAppSelector(invoiceTaxSelector);

    // Инициализируем стейт один раз (или дефолтной пустой строкой)
    const [inputs, setInputs] = useState(() => {
      if (formRowData && formRowData.length > 0) {
        return formRowData;
      }
      return [
        {
          product_id: '',
          product: '',
          unit_id: '',
          quantity: 1,
          pack_qty: 1,
          fact_qty: 1,
          price: 0,
          mark_up: 0,
          tax_amount: 0,
          total: 0,
          expiry_date: '',
        },
      ];
    });
    const [, setHideFields] = useState(false);
    const [numRow, setNumRow] = useState(0);
    const [, setTaxPercent] = useState(0);

    // Универсальная функция пересчета суммы и налога для строки
    const calculateRowValuesOld = (row: any, taxRate: any) => {
      const qty = parseFloat(row.quantity) || 0; // количество упаковок
      const price = parseFloat(row.price) || 0; // цена за упаковку

      // Считаем сумму: количество упаковок * цену упаковки
      const total = qty * price;

      row.total = parseFloat(total.toFixed(2));
      row.tax_amount = taxRate ? parseFloat(((total * taxRate) / 100).toFixed(2)) : 0;
      return row;
    };
    const calculateRowValues = (row: any, taxRate: any) => {
      const qty = parseFloat(row.quantity) || 1; // количество упаковок
      const price = parseFloat(row.price) || 0; // цена за упаковку
      const factQty = parseFloat(row.fact_qty) || 0; // фактическое количество
      const packQty = parseFloat(row.pack_qty) || factQty || 1; // базовая фасовка из справочника

      // Считаем коэффициент пропорции (сколько реально пришло по сравнению с базовой фасовкой)
      // Умножаем на количество упаковок (qty)
      const ratio = (factQty / packQty) * qty;

      // Итоговая сумма зависит от базовой цены упаковки с учетом факта
      const total = price * ratio;

      row.total = parseFloat(total.toFixed(2));
      row.tax_amount = taxRate ? parseFloat(((total * taxRate) / 100).toFixed(2)) : 0;
      return row;
    };

    const handleAddInput = () => {
      dispatch(setShowTableError(false));
      const newInputs = [
        ...inputs,
        {
          product_id: '',
          product: '',
          unit_id: '',
          quantity: 1,
          pack_qty: 1,
          fact_qty: 1,
          price: 0,
          mark_up: 0,
          tax_amount: 0,
          total: 0,
          expiry_date: '', // Добавлено поле для новых строк
        },
      ];
      setInputs(newInputs);
      dispatch(setInvoiceItems(newInputs));
    };

    useImperativeHandle(ref, () => ({
      addRow: handleAddInput,
    }));

    const handleChange = (event: any, index: any, customName = null, customValue = null) => {
      dispatch(setShowTableError(false));
      const name = customName || event.target.name;
      const value = customValue !== null ? customValue : event.target.value;

      const onChangeValue = inputs.map((item: any, i: any) => (i === index ? { ...item } : item));
      onChangeValue[index][name] = value;
      setNumRow(index);

      if (name === 'product') {
        if (value.length > 2) {
          dispatch(findServiceMaterialCalcAction(value));
        } else {
          dispatch(emptyMaterialsAutocompleteAction());
          setHideFields(false);
        }
      }

      const taxData = documentTax ? documentTax.split('_') : [0, 0];
      const taxRate = taxData[1] ? parseFloat(taxData[1]) : 0;

      onChangeValue[index] = calculateRowValues(onChangeValue[index], taxRate);

      setInputs(onChangeValue);
      dispatch(setInvoiceItems(onChangeValue));
    };

    const handleQuantityChange = (index: any, delta: any) => {
      const onChangeValue = inputs.map((item: any, i: any) => (i === index ? { ...item } : item));
      const row = onChangeValue[index];
      const currentQty = parseFloat(row.quantity) || 0;
      const newQty = Math.max(0.01, currentQty + delta);
      row.quantity = newQty.toFixed(2);

      const taxData = documentTax ? documentTax.split('_') : [0, 0];
      const taxRate = taxData[1] ? parseFloat(taxData[1]) : 0;

      onChangeValue[index] = calculateRowValues(row, taxRate);
      setInputs(onChangeValue);
      dispatch(setInvoiceItems(onChangeValue));
    };

    const handleDeleteInput = (index: any) => {
      const newArray = inputs.filter((_: any, i: any) => i !== index);
      setInputs(newArray);
      dispatch(setInvoiceItems(newArray));
    };

    // Слушаем изменение налога в шапке документа и пересчитываем все строки
    useEffect(() => {
      const taxData = documentTax ? documentTax.split('_') : [0, 0];
      const taxRate = taxData[1] ? parseFloat(taxData[1]) : 0;
      setTaxPercent(taxRate);

      if (inputs && inputs.length > 0) {
        const updatedInputs = inputs.map((item: any) => {
          const rowCopy = { ...item };
          return calculateRowValues(rowCopy, taxRate);
        });
        setInputs(updatedInputs);
        dispatch(setInvoiceItems(updatedInputs));
      }
    }, [documentTax]);

    const renderSearchProducerResult = (index: any) => {
      if (serchResults.length > 0 && numRow === index) {
        return (
          <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <ul className="py-1">
              {serchResults.map((_res: any) => (
                <li
                  key={_res.id}
                  className="px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 cursor-pointer transition-colors flex justify-between items-center"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Предотвращаем потерю фокуса до клика

                    // Сначала гасим автокомплит в Redux, чтобы список пропал корректно
                    dispatch(emptyMaterialsAutocompleteAction());
                    setHideFields(true);

                    const basePrice = parseFloat(_res.price || _res.price_per_unit || 0);
                    const quantity = 1;
                    const taxData = documentTax ? documentTax.split('_') : [0, 0];
                    const taxRate = taxData[1] ? parseFloat(taxData[1]) : 0;

                    const onChangeValue = inputs.map((item: any, i: any) =>
                      i === index ? { ...item } : item
                    );
                    onChangeValue[index].product = _res.name;
                    onChangeValue[index].product_id = _res.id;
                    onChangeValue[index].price = parseFloat(basePrice.toFixed(2));
                    onChangeValue[index].unit_id = _res.unit_id;
                    onChangeValue[index].pack_qty = parseFloat(
                      _res.weight ? _res.weight : 1
                    ).toFixed(2);
                    onChangeValue[index].fact_qty = parseFloat(
                      _res.weight ? _res.weight : 1
                    ).toFixed(2);
                    onChangeValue[index].quantity = quantity;
                    // Оставляем expiry_date как было или дефолтным

                    onChangeValue[index] = calculateRowValues(onChangeValue[index], taxRate);

                    setInputs(onChangeValue);
                    dispatch(setInvoiceItems(onChangeValue));
                  }}
                >
                  <span className="font-medium">{_res.name}</span>
                  <span className="text-slate-400 text-[10px] ml-2">
                    {msg.get('invoice_incoming.provider')} {_res.producer_name} —{' '}
                    {parseFloat(_res.price || 0).toFixed(2)} ₴
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
        {inputs.map((item: any, index: any) => (
          <tr
            key={index}
            className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
          >
            {/* Назва матеріалу / Пошук */}
            <td className="py-3 px-3 relative w-[500px]">
              <div className="flex flex-col gap-1">
                <input
                  name="product"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all"
                  type="text"
                  placeholder="Почніть введення матеріалу..."
                  value={item.product || ''}
                  onChange={(event) => handleChange(event, index)}
                />
                {numRow === index && renderSearchProducerResult(index)}
              </div>
            </td>

            {/* Кількість */}
            <td className="py-3 px-3 align-top">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(index, -1)}
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
                    onClick={() => handleQuantityChange(index, 1)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </td>

            {/* Одиниця виміру */}
            <td className="py-3 px-3 whitespace-nowrap align-top">
              <select
                name="unit_id"
                value={item.unit_id || ''}
                onChange={(event) => handleChange(event, index)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
              >
                <option value="">Одиниця...</option>
                {unitsData?.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </td>

            {/* Фактична кількість / Фасовка */}
            <td className="py-3 px-3 text-center align-top pt-3">
              <input
                className="w-20 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white"
                name="fact_qty"
                type="text"
                value={item.fact_qty || ''}
                onChange={(event) => handleChange(event, index)}
              />
            </td>

            {/* Термін придатності (Expiry Date) */}
            <td className="py-3 px-3 text-center align-top pt-3">
              <input
                className="w-32 px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white"
                name="expiry_date"
                type="date"
                value={item.expiry_date || ''}
                onChange={(event) => handleChange(event, index)}
              />
            </td>

            {/* Ціна за одиницю (Чиста закупка) */}
            <td className="py-3 px-3 text-center align-top pt-3">
              <input
                className="w-24 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white"
                name="price"
                type="text"
                value={item.price || ''}
                onChange={(event) => handleChange(event, index)}
              />
            </td>

            {/* Усього */}
            <td className="py-3 px-3 text-center align-top pt-3">
              <input
                className="w-28 px-3 py-2 rounded-xl bg-teal-50/50 border border-teal-100 text-center text-xs font-bold text-teal-800 focus:outline-none"
                name="total"
                type="text"
                value={item.total || ''}
                readOnly
              />
            </td>

            {/* Дії */}
            <td className="py-3 px-3 text-center align-top pt-3">
              {inputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteInput(index)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors"
                  title="Видалити"
                >
                  ✕
                </button>
              )}
            </td>
          </tr>
        ))}
      </>
    );
  }
);

AddDynamicInputFields.displayName = 'AddDynamicInputFields';

export default AddDynamicInputFields;
