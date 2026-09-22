import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import {
  searchResultServicesSelector,
  searchResultServicesElementsSelector,
} from '@/Redux/Service/selectors';
import {
  emptyServicesAutocompleteAction,
  findServiceMaterialAction,
} from '@/Redux/Service/actions';
import { setPriceItems, setShowTableError, setTotalPrice } from '@/Redux/Service';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  ({ formRowData = null, unitData }, ref) => {
    const [inputs, setInputs] = useState(formRowData || []);
    const dispatch = useAppDispatch();
    const [numRow, setNumRow] = useState(0);
    const serchResults = useSelector(searchResultServicesSelector);
    useSelector(searchResultServicesElementsSelector);

    const handleAddInput = () => {
      setInputs([
        ...inputs,
        {
          product_id: '',
          unit_id: '',
          product: '',
          quantity: '1.00',
          maxQty: '',
          mark_up: '',
          price: 0,
          total: 0,
          base_price: 0,
          stock: 0,
          category: 'Витратні матеріали',
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

      // Перерахунок суми рядка
      const qty = parseFloat(onChangeValue[index].quantity) || 0;
      const price = parseFloat(onChangeValue[index].price) || 0;
      onChangeValue[index].total = parseFloat((qty * price).toFixed(2));

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

    const handleDuplicate = (index) => {
      const itemToCopy = { ...inputs[index] };
      const newArray = [...inputs];
      newArray.splice(index + 1, 0, itemToCopy);
      setInputs(newArray);
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
      if (serchResults.length > 0) {
        return (
          <div className="absolute z-50 bg-white shadow-xl rounded-xl border border-slate-200 mt-1 max-h-60 overflow-y-auto left-0 right-0">
            <ul className="divide-y divide-slate-100">
              {serchResults.map((_res, rIndex) => (
                <li
                  key={rIndex}
                  className="cursor-pointer px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm flex items-center justify-between"
                  onClick={() => {
                    dispatch(emptyServicesAutocompleteAction());
                    const onChangeValue = [...inputs];
                    onChangeValue[index].product = _res.name;
                    onChangeValue[index].product_id = _res.id;
                    onChangeValue[index].quantity = '1.00';
                    onChangeValue[index].unit_id = _res.unit_id;
                    onChangeValue[index].price = _res.price_per_unit || _res.retail_price || 0;
                    onChangeValue[index].total = parseFloat(
                      (1 * onChangeValue[index].price).toFixed(2)
                    );
                    onChangeValue[index].stock = _res.stock || 0;
                    setInputs(onChangeValue);
                  }}
                >
                  <span className="font-semibold text-slate-800">{_res.name}</span>
                  <span className="text-xs font-bold text-teal-700">
                    {_res.price_per_unit || _res.retail_price || 0} ₴
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
            className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-none"
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
                  <span className="text-slate-300">•</span>
                </div>
                {numRow === index && renderSearchProducerResult(index)}
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
                {unitData?.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </td>

            {/* Норма витрати (кнопки плюс/мінус + інпут) */}
            <td className="py-3 px-3 align-top">
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
                    className="w-14 text-center no-border bg-transparent font-bold text-slate-900 text-xs focus:outline-none"
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

            {/* Ціна за одиницю */}
            <td className="py-3 px-3 text-right align-top text-xs font-semibold text-slate-600 tabular-nums pt-4">
              <div className="row flex justify-center">
                <input
                  className="input-text text-center service-price"
                  name="price"
                  type="text"
                  value={item.price}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>
            <td className="py-3 px-3 text-right align-top text-xs font-semibold text-slate-600 tabular-nums pt-4">
              <div className="row flex justify-center">
                <input
                  className="input-text text-center service-mark-up"
                  name="mark_up"
                  type="text"
                  value={item.mark_up}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>

            {/* Собівартість рядка */}
            <td className="py-3 px-3 text-right align-top text-xs font-bold text-teal-800 tabular-nums pt-4">
              <div className="row flex ml-[10px]">
                <input
                  className="input-text w-full text-center price-row-total"
                  name="total"
                  type="text"
                  value={item.total}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>

            {/* Дії (Дублювати / Видалити) */}
            <td className="py-3 px-3 text-center align-top pt-3">
              <div className="flex items-center justify-center gap-1">
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
