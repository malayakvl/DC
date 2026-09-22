import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  emptyMaterialsAutocompleteAction,
  findMaterialAction,
  findServiceMaterialCalcAction,
} from '@/Redux/Material';
import { setInvoiceItems, setShowTableError } from '@/Redux/Incominginvoice';
import { invoiceTaxSelector } from '@/Redux/Incominginvoice/selectors';
import { searchResultMaterialsSelector } from '@/Redux/Material/selectors';
import InputSelect from '../../../Components/Form/InputSelect';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ formRowData = null, lastRow = null, unitsData, msg }, ref) => {
    const [inputs, setInputs] = useState(formRowData);
    const dispatch = useAppDispatch();
    const [, setHideFields] = useState(false);
    const serchResults = useAppSelector(searchResultMaterialsSelector);
    const [numRow, setNumRow] = useState(0);
    const documentTax = useAppSelector(invoiceTaxSelector);
    const [taxPercent, setTaxPercent] = useState(0);

    const handleAddInput = () => {
      dispatch(setShowTableError(false));
      setInputs([
        ...inputs,
        {
          product_id: '',
          product: '',
          unit_id: '',
          quantity: 0,
          pack_qty: 0,
          fact_qty: 0,
          price: 0,
          tax_amount: 0,
          total: 0,
        },
      ]);
    };

    useImperativeHandle(ref, () => ({
      addRow: handleAddInput,
    }));

    const handleChange = (event, index, type = '') => {
      dispatch(setShowTableError(false));
      const { name, value } = event.target;
      const onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setNumRow(index);
      if (name === 'product') {
        if (value.length > 3) {
          dispatch(emptyMaterialsAutocompleteAction());
          dispatch(findServiceMaterialCalcAction(value));
        } else {
          dispatch(emptyMaterialsAutocompleteAction());
          setHideFields(false);
        }
      } else if (name === 'plusBtn') {
        inputs[index].quantity = inputs[index].quantity + 1;
        inputs[index].total = (
          parseFloat(String(inputs[index].quantity)) * parseFloat(String(inputs[index].price))
        ).toFixed(2);
        inputs[index].fact_qty = (
          parseFloat(String(inputs[index].quantity)) * parseFloat(String(inputs[index].pack_qty))
        ).toFixed(2);
      } else if (name === 'minusBtn') {
        const _factPerUnit = inputs[index].fact_qty / inputs[index].quantity;
        inputs[index].quantity = inputs[index].quantity > 1 ? inputs[index].quantity - 1 : 1;
        inputs[index].total = (
          parseFloat(String(inputs[index].quantity)) * parseFloat(String(inputs[index].price))
        ).toFixed(2);
        inputs[index].fact_qty = (
          parseFloat(String(inputs[index].quantity)) * parseFloat(String(_factPerUnit))
        ).toFixed(2);
      } else if (name === 'price') {
        inputs[index].price = event.target.value;
        inputs[index].total = (
          parseFloat(String(inputs[index].quantity)) * parseFloat(String(inputs[index].price))
        ).toFixed(2);
        inputs[index].tax_amount = (inputs[index].total * 20) / 100;
      }
      inputs[index].tax = ((parseFloat(String(inputs[index].total)) * 20) / 100).toFixed(2);
      setInputs(onChangeValue);
    };

    useEffect(() => {
      const taxData = documentTax.split('_');
      inputs.map((_input) => {
        _input.tax_amount = taxData[1] ? (_input.price * taxData[1]) / 100 : 0;
      });
      setTaxPercent(parseInt(taxData[1]));
    }, [documentTax]);

    useEffect(() => {}, [taxPercent]);

    const handleDeleteInput = (index) => {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      setInputs(newArray);
      return;
    };

    const handleChangeFactQty = (event, index) => {
      dispatch(setShowTableError(false));
      const { name, value } = event.target;
      const onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      // recalculate total
      const total = (inputs[index].fact_qty * inputs[index].price) / inputs[index].pack_qty;
      inputs[index].total = total.toFixed(2);
      inputs[index].tax_amount = (total * 20) / 100;
      setInputs(onChangeValue);
    };

    useEffect(() => {
      dispatch(setInvoiceItems(inputs));
    }, [inputs]);

    const calcPos = (index) => {
      if (index >= 1) {
        return 70 + index * 10 + 33 * index;
      } else {
        return (index + 1) * 70;
      }
    };

    const renderSearchProducerResult = (index) => {
      if (serchResults.length > 0) {
        return (
          <div
            className="absolute autocomplete"
            style={{ top: calcPos(index) + 'px', width: '500px' }}
          >
            <ul>
              {serchResults.map((_res) => (
                <li
                  className="cursor-pointer py-0.5"
                  onClick={() => {
                    setHideFields(true);
                    dispatch(emptyMaterialsAutocompleteAction());
                    const taxData = documentTax.split('_');
                    inputs[index].product = _res.name;
                    inputs[index].product_id = _res.id;
                    inputs[index].price = _res.retail_price;
                    inputs[index].unit_id = _res.unit_id;
                    inputs[index].pack_qty = parseFloat(_res.weight ? _res.weight : 1).toFixed(2);
                    inputs[index].fact_qty = parseFloat(_res.weight ? _res.weight : 1).toFixed(2);
                    inputs[index].tax_amount = documentTax
                      ? (_res.retail_price * taxData[1]) / 100
                      : 0;
                    inputs[index].quantity = 1;
                    inputs[index].total = parseFloat(String(inputs[index].price));
                    // console.log('ConnectedTvOutlined', parseFloat(String(inputs[index].price)));
                  }}
                >
                  {_res.name}&nbsp; {msg.get('invoice_incoming.provider')} {_res.producer_name}
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        return <></>;
      }
    };

    return (
      <>
        {inputs.map((item, index) => (
          <tr key={index}>
            <td className="w-product  pb-2">
              <div className="relative">
                <input
                  name="product"
                  className="input-text input-invoice material-input"
                  type="text"
                  value={item.product}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>
            <td className="py-3 px-3 align-top">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleChange(event, index, 'minus')}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
                  >
                    -
                  </button>
                  <input
                    name="qty"
                    className="w-14 text-center no-border bg-transparent font-bold text-slate-900 text-xs focus:outline-none"
                    type="text"
                    value={item.quantity || ''}
                    onChange={(event) => handleChange(event, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleChange(event, index, 'plus')}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </td>
            <td className="py-3 px-1 whitespace-nowrap align-top">
              <select
                name="unit_id"
                value={item.unit_id || ''}
                onChange={(event) => handleChange(event, index)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
              >
                <option value="">Одиниця...</option>
                {unitsData?.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text text-center service-price"
                name="fact_qty"
                type="fact_qty"
                value={item.fact_qty}
                onChange={(event) => handleChangeFactQty(event, index)}
              />
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text text-center service-price text-center"
                name="price"
                type="text"
                value={item.price}
                onChange={(event) => handleChange(event, index)}
              />
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text text-center service-price text-center tbl-amount-total"
                name="total"
                type="text"
                value={item.total}
                // onChange={(event) => handleChange(event, index)}
              />
            </td>
            <td className="w-btn pb-2">
              {inputs.length > 1 && (
                <button onClick={() => handleDeleteInput(index)} className="btn-delete" />
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={6}>
            <div className="body hidden"> {JSON.stringify(inputs)} </div>
            <div className="text-left">{renderSearchProducerResult(numRow)}</div>
          </td>
        </tr>
      </>
    );
  }
);

export default AddDynamicInputFields;
