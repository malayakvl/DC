import React, { useEffect, useState } from 'react';
import { emptyProducersAutocompleteAction } from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { searchResultMaterialsSelector } from '../../../Redux/Material/selectors';
import {
  emptyMaterialsAutocompleteAction,
  findMaterialAction,
} from '../../../Redux/Material';
import {
  setPriceItems,
  setShowTableError,
  setTotalPrice,
} from '../../../Redux/Pricing';
import { pricingItemsSelector } from '../../../Redux/Pricing/selectors';
import Lang from 'lang.js';
import { emptyMaterialsQtyAutocompleteAction } from '../../../Redux/Material/actions';
import InputSelect from '../../../Components/Form/InputSelect';

export default function AddDynamicInputFields({
  formRowData = null,
  lastRow = null,
  unitData,
}) {
  const [inputs, setInputs] = useState(formRowData);
  const dispatch = useDispatch();
  const [hideFields, setHideFields] = useState(false);
  const serchResults = useSelector(searchResultMaterialsSelector);
  const [numRow, setNumRow] = useState(0);
  const [weightIntutId, setWeightIntutId] = useState(null);
  const [availableWeights, setAvailableWeights] = useState(null);

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: '',
        unit_id: '',
        product: '',
        quantity: '',
        maxQty: '',
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
        dispatch(findMaterialAction(value));
      } else {
        dispatch(emptyProducersAutocompleteAction());
        setHideFields(false);
      }
    } else if (name === 'unit_id') {
      inputs[index].unit_id = event.target.value;
    } else {
      inputs[index].quantity = event.target.value;
      inputs[index].total = event.target.value
        ? parseFloat(event.target.value) * inputs[index].price
        : 0;
    }
    setInputs(onChangeValue);
  };

  const handleDeleteInput = index => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
    return;
  };

  useEffect(() => {
    dispatch(setPriceItems(inputs));
    let totalItemPrice = 0;
    inputs.map(_input => {
      totalItemPrice += Number(_input.total ? _input.total : 0);
    });
    dispatch(setTotalPrice(totalItemPrice));
  }, [inputs]);

  useEffect(() => {
    if (weightIntutId > 0) {
      const weightSelect = document.getElementById(`${weightIntutId}`)
      if (weightSelect) {
        Array.from(weightSelect['options']).forEach(option => {
          // Get the value of the current option
          const optionValue = option.value;
          // Check if the option's value is in the allowedValues array
          if (!availableWeights.includes(parseInt(optionValue))) {
            // If not in the array, disable the option
            option.disabled = true;
          } else {
            // If in the array, ensure it's enabled (in case it was previously disabled)
            option.disabled = false;
          }
        });
      }
    }
  }, [availableWeights, weightIntutId])

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
                  setWeightIntutId(_res.id);
                  const tmpWeight = [];
                  tmpWeight.push(_res.unit_id);
                  tmpWeight.push(_res.weightunit_id);
                  setAvailableWeights(tmpWeight);
                  dispatch(emptyMaterialsAutocompleteAction());
                  inputs[index].product = _res.name;
                  inputs[index].product_id = _res.id;
                  inputs[index].quantity = 1;
                  inputs[index].price =
                    _res.price_per_unit > 0
                      ? _res.price_per_unit
                      : _res.retail_price;
                  inputs[index].total = (
                    1 *
                    (_res.price_per_unit > 0
                      ? _res.price_per_unit
                      : _res.retail_price)
                  ).toFixed(2);
                }}
              >
                {_res.name} {_res.producerName}
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
          <td className="w-product px-2 pb-2">
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
          <td className="w-qty pb-2 px-2 mx-auto pl-[10px] min-w-[120px]" data-id={`el-${item.product_id}`}>
            <InputSelect
              elId={item.product_id}
              translatable={false}
              name={'unit_id'}
              className={'mb-1'}
              values={inputs}
              value={item.unit_id}
              defaultValue={item.unit_id}
              options={unitData}
              onChange={event => handleChange(event, index)}
              required
              label={null}
            />
          </td>
          <td className="w-qty pb-2 px-2 mx-auto">
            <div className="row flex ml-[10px]">
              <input
                className="input-text w-[100px] text-center"
                name="qty"
                type="text"
                value={item.quantity}
                onChange={event => handleChange(event, index)}
              />
            </div>
          </td>
          

          <td className="w-btn pb-2 px-2">
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
