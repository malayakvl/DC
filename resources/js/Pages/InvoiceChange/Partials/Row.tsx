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

export default function AddDynamicInputFields({
  formRowData = null,
  lastRow = null,
}) {
  const [inputs, setInputs] = useState(formRowData);
  const dispatch = useDispatch();
  const [hideFields, setHideFields] = useState(false);
  const serchResults = useSelector(searchResultMaterialsQtySelector);
  const [numRow, setNumRow] = useState(0);
  const wherehouseId = useSelector(warehouseSelector);

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: '',
        producer_id: 0,
        product: '',
        quantity: 0,
        maxQty: 0,
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
                  inputs[index].product_id = _res.id;
                  inputs[index].quantity = 1;
                  inputs[index].maxQty = _res.quantity;
                  inputs[index].producer_id = _res.producer_id;
                }}
              >
                {_res.name} {_res.producerName} ({_res.quantity} {_res.unitName}
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
