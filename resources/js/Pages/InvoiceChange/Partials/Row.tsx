import React, { useEffect, useState } from 'react';
import { emptyProducersAutocompleteAction } from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { searchResultMaterialsQtySelector } from '../../../Redux/Material/selectors';
import { findMaterialQtyAction } from '../../../Redux/Material';
import {
  setInvoiceItems,
  setShowTableError,
} from '../../../Redux/Incominginvoice';
import {
  invoiceItemsSelector,
  warehouseSelector,
} from '../../../Redux/Changeinvoice/selectors';
import { emptyMaterialsQtyAutocompleteAction } from '../../../Redux/Material/actions';
import InputSelect from '../../../Components/Form/InputSelect';
import Lang from 'lang.js';
import lngInvoice from '../../../Lang/Invoice/translation';
import { appLangSelector } from '../../../Redux/Layout/selectors';

export default function AddDynamicInputFields({
  formRowData = null,
  lastRow = null,
  unitsData
}) {
  const appLang = useSelector(appLangSelector);
  const [inputs, setInputs] = useState(formRowData);
  const dispatch = useDispatch();
  const [hideFields, setHideFields] = useState(false);
  const serchResults = useSelector(searchResultMaterialsQtySelector);
  const [numRow, setNumRow] = useState(0);
  const wherehouseId = useSelector(warehouseSelector);
  const msg = new Lang({
    messages: lngInvoice,
    locale: appLang,
  });

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: '',
        producer_id: 0,
        product: '',
        quantity: 0,
        fact_qty: 0,
        unit_id: '',
        pack_qty: 0,
        maxQty: 0,
        maxFactQty: 0
      },
    ]);
  };

  const handleChange = (event, index, type = '') => {
    dispatch(setShowTableError(false));
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setNumRow(index);

    if (name === 'product') {
      if (value.length > 3) {
        dispatch(findMaterialQtyAction(value, wherehouseId));
      } else {
        dispatch(emptyProducersAutocompleteAction());
        setHideFields(false);
      }
    } else if (name === 'plusBtn') {
      inputs[index].quantity = inputs[index].quantity + 1;
      if (inputs[index].quantity > inputs[index].maxQty) {
        inputs[index].quantity = inputs[index].maxQty;
      }
    } else if (name === 'minusBtn') {
      inputs[index].quantity =
        inputs[index].quantity > 1 ? inputs[index].quantity - 1 : 1;
    } else {
      inputs[index].quantity = event.target.value;
    }
    setInputs(onChangeValue);
  };

  const handleDeleteInput = index => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  useEffect(() => {
    dispatch(setInvoiceItems(inputs));
  }, [inputs]);

  const handleChangeFactQty = (event, index) => {
    dispatch(setShowTableError(false));
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    if (parseFloat(value) <= parseFloat(inputs[index].maxFactQty)) {
      onChangeValue[index]['fact_qty'] = value;
    } else {
      onChangeValue[index]['fact_qty'] = inputs[index].maxFactQty;
    }
    // // recalculate total
    // let total = (inputs[index].fact_qty * inputs[index].price) / inputs[index].pack_qty;
    // inputs[index].total = total.toFixed(2)
    setInputs(onChangeValue);
  }

  const renderSearchProducerResult = index => {
    if (serchResults.length > 0) {
      return (
        <div
          className="absolute autocomplete"
          style={{ top: index * 50 + 75 + 'px', width: '500px' }}
        >
          <ul>
            {serchResults.map(_res => (
              <li
                className="cursor-pointer py-1"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyMaterialsQtyAutocompleteAction());
                  inputs[index].product = _res.name;
                  inputs[index].product_id = _res.product_id;
                  inputs[index].quantity = 1;
                  inputs[index].unit_id = _res.unit_id;
                  inputs[index].maxQty = _res.quantity;
                  inputs[index].maxFactQty = _res.material_weight;
                  inputs[index].pack_qty = _res.material_weight;
                  inputs[index].fact_qty = _res.material_weight;
                  inputs[index].producer_id = _res.producer_id;
                }}
              >
                {_res.name} ({_res.packunit_name} - {msg.get('invoice.factqty')}: {_res.weight} {_res.perunit_name}]
                )
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
                className="input-text"
                type="text"
                value={item.product}
                onChange={event => handleChange(event, index)}
              />
            </div>
          </td>
          <td className="w-qty pb-2 mx-auto">
            <div className="row flex ml-[40px]">
              <button
                name="minusBtn"
                onClick={event => {
                  handleChange(event, index, 'minus');
                }}
                className="btn-qty-minus"
                type="button"
              >
                -
              </button>
              <input
                className="qty text-center"
                name="qty"
                type="text"
                value={item.quantity}
                onChange={event => handleChange(event, index)}
              />

              <button
                name="plusBtn"
                onClick={event => {
                  handleChange(event, index, 'plus');
                }}
                className="btn-qty-plus"
                type="button"
              >
                +
              </button>
            </div>
          </td>
          <td className="w-unit text-center pb-2" style={{paddingLeft: '20px', width: '140px !important'}}>
            <InputSelect
              translatable={false}
              name={'unit_id'}
              className={'w-unit'}
              values={item.unit_id}
              value={item.unit_id}
              defaultValue={item.unit_id}
              options={unitsData}
              required
              label={null}
            />
          </td>
          <td className="w-price text-center pb-2">
            <input
              className="input-text factqty text-center"
              name="fact_qty"
              type="fact_qty"
              value={item.fact_qty}
              onChange={event => handleChangeFactQty(event, index)}
            />
          </td>
          <td className="w-btn pb-2">
            {inputs.length > 1 && (
              <button
                onClick={() => handleDeleteInput(index)}
                className="btn-delete"
              />
            )}
          </td>
          <td className="w-btn pb-2">
            {index === inputs.length - 1 && !lastRow && (
              <button onClick={() => handleAddInput()} className="btn-plus" />
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
