import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import {
  searchResultServicesSelector,
  searchResultServicesElementsSelector,
} from '@/Redux/Service/selectors';
import { emptyServicesAutocompleteAction, findServiceAction } from '@/Redux/Service';
import { setPriceItems, setShowTableError, setTotalPrice } from '@/Redux/Service';
import InputSelect from '../../../Components/Form/InputSelect';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  ({ formRowData = null, unitData }, ref) => {
    const [inputs, setInputs] = useState(formRowData);
    const dispatch = useAppDispatch();
    const [, setHideFields] = useState(false);
    const serchResults = useSelector(searchResultServicesSelector);
    useSelector(searchResultServicesElementsSelector);
    const [numRow, setNumRow] = useState(0);
    const [, setWeightIntutId] = useState(null);
    const [, setAvailableWeights] = useState(null);

    const handleAddInput = () => {
      setInputs([
        ...inputs,
        {
          product_id: '',
          unit_id: '',
          product: '',
          quantity: '',
          maxQty: '',
          mark_up: '',
          price: '',
          total: '',
          basePrice: '',
        },
      ]);
    };

    useImperativeHandle(ref, () => ({
      addRow: handleAddInput,
    }));

    const handleChange = (event, index) => {
      dispatch(setShowTableError(false));
      const { name, value } = event.target;
      const onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setNumRow(index);

      if (name === 'product') {
        if (value.length > 3) {
          dispatch(findServiceAction(value));
        } else {
          dispatch(emptyServicesAutocompleteAction());
          setHideFields(false);
        }
      } else if (name === 'mark_up') {
        const markupValue = parseFloat(event.target.value) || 0;

        // сохраняем исходную цену один раз
        if (!inputs[index].basePrice) {
          inputs[index].basePrice = parseFloat(inputs[index].price) || 0;
        }
        const basePrice = inputs[index].basePrice;
        const newPrice = basePrice + (basePrice * markupValue) / 100;
        inputs[index].price = parseFloat(newPrice.toFixed(2));
        inputs[index].total = parseFloat((inputs[index].price * inputs[index].quantity).toFixed(2));
      } else {
        // inputs[index].quantity = event.target.value;
        inputs[index].total = event.target.value
          ? parseFloat((parseFloat(event.target.value) * inputs[index].price).toFixed(2))
          : 0;
      }
      setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      setInputs(newArray);
      return;
    };

    useEffect(() => {
      dispatch(setPriceItems(inputs));
      let totalItemPrice = 0;
      inputs.map((_input) => {
        totalItemPrice += Number(_input.total ? _input.total : 0);
      });
      dispatch(setTotalPrice(totalItemPrice));
    }, [inputs]);

    const renderSearchProducerResult = (index) => {
      if (serchResults.length > 0) {
        return (
          <div
            className="absolute autocomplete"
            style={{ top: index * 50 + 75 + 'px', width: '500px' }}
          >
            <ul>
              {serchResults.map((_res) => (
                <li
                  key={index}
                  className="cursor-pointer py-1"
                  onClick={() => {
                    setHideFields(true);
                    setWeightIntutId(_res.id);
                    const tmpWeight = [];
                    tmpWeight.push(_res.weightunit_id);
                    tmpWeight.push(_res.weightunit_id);
                    setAvailableWeights(tmpWeight);
                    dispatch(emptyServicesAutocompleteAction());
                    inputs[index].product = _res.name;
                    inputs[index].product_id = _res.id;
                    inputs[index].quantity = 1;
                    inputs[index].unit_id = _res.unit_id;
                    inputs[index].mark_up = 0;
                    inputs[index].price = _res.price_per_unit;
                    inputs[index].total = (
                      1 * (_res.price_per_unit > 0 ? _res.price_per_unit : _res.retail_price)
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
            <td className="w-product-service px-2 pb-2">
              <div className="relative">
                <input
                  name="product"
                  className="input-text"
                  type="text"
                  value={item.product}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>
            <td className="w-qty pb-2 px-2 mx-auto " data-id={`el-${item.product_id}`}>
              <InputSelect
                elId={item.product_id}
                translatable={false}
                name={'unit_id'}
                className={'mb-1'}
                values={inputs}
                value={item.unit_id}
                defaultValue={item.unit_id}
                options={unitData}
                onChange={(event) => handleChange(event, index)}
                required
                label={null}
              />
            </td>
            <td className="w-qty pb-2 px-2 mx-auto border-r-1">
              <div className="row flex justify-center ">
                <input
                  className="input-text text-center service-qty"
                  name="quantity"
                  type="text"
                  value={item.quantity}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>
            <td className="w-qty pb-2 px-2 mx-auto">
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
            <td className="w-qty pb-2 px-2 mx-auto">
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

            <td className="w-qty pb-2 px-2 mx-auto border-r-1">
              <div className="row flex ml-[10px]">
                <input
                  className="input-text w-full text-center"
                  name="total"
                  type="text"
                  value={item.total}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </td>
            <td className="w-btn pb-2 px-2">
              {inputs.length > 1 && (
                <button onClick={() => handleDeleteInput(index)} className="btn-delete" />
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={7}>
            <div className="body hidden"> {JSON.stringify(inputs)} </div>
            <div className="text-left">{renderSearchProducerResult(numRow)}</div>
          </td>
        </tr>
      </>
    );
  }
);

export default AddDynamicInputFields;
