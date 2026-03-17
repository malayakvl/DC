import React, { useEffect, useState } from 'react';
import InputText from '../../../Components/Form/InputText';
import {
  emptyProducersAutocompleteAction,
  findProducersAction,
} from '../../../Redux/Clinic';
import { useDispatch, useSelector } from 'react-redux';
import { userSearchResultsSelector } from '../../../Redux/Clinic/selectors';
import { findMaterialAction } from '../../../Redux/Clinic/actions';
import {
  setInvoiceItems,
  setShowTableError,
} from '../../../Redux/Incominginvoice';
import { invoiceTaxSelector } from '../../../Redux/Incominginvoice/selectors';

export default function AddDynamicInputFields({
  formRowData = null,
  lastRow = null,
}) {
  const [inputs, setInputs] = useState(formRowData);
  const dispatch = useDispatch();
  const [hideFields, setHideFields] = useState(false);
  const serchResults = useSelector(userSearchResultsSelector);
  const [numRow, setNumRow] = useState(0);
  const documentTax = useSelector(invoiceTaxSelector);
  const [taxPercent, setTaxPercent] = useState(0);

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: '',
        product: '',
        quantity: 0,
        price: 0,
        tax: 0,
        total: 0,
      },
    ]);
  };

  // if (rowData)

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
    } else if (name === 'plusBtn') {
      inputs[index].quantity = inputs[index].quantity + 1;
      inputs[index].total =
        parseFloat(String(inputs[index].quantity)) *
        parseFloat(String(inputs[index].price));
    } else if (name === 'minusBtn') {
      inputs[index].quantity =
        inputs[index].quantity > 1 ? inputs[index].quantity - 1 : 1;
      inputs[index].total =
        parseFloat(String(inputs[index].quantity)) *
        parseFloat(String(inputs[index].price));
    }
    setInputs(onChangeValue);
  };

  useEffect(() => {
    const taxData = documentTax.split('_');
    inputs.map(_input => {
      _input.tax_amount = taxData[1] ? (_input.price * taxData[1]) / 100 : 0;
    });
    setTaxPercent(parseInt(taxData[1]));
  }, [documentTax]);

  useEffect(() => {
    console.log('reaclculate nds', taxPercent);
  }, [taxPercent]);

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
                  dispatch(emptyProducersAutocompleteAction());
                  const taxData = documentTax.split('_');
                  inputs[index].product = _res.name;
                  inputs[index].product_id = _res.id;
                  inputs[index].price = _res.retail_price;
                  inputs[index].tax_amount = documentTax
                    ? (_res.retail_price * taxData[1]) / 100
                    : 0;
                  inputs[index].quantity = 1;
                  inputs[index].total = parseFloat(String(inputs[index].price));
                }}
              >
                {_res.name}
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
          <td className="w-price text-center pb-2">
            <input
              className="input-text price text-center"
              name="price"
              type="text"
              value={item.price}
              onChange={event => handleChange(event, index)}
            />
          </td>
          <td className="w-price text-center pb-2">
            <input
              className="input-text price text-center"
              name="total"
              type="text"
              value={item.tax_amount}
              // onChange={(event) => handleChange(event, index)}
            />
          </td>
          <td className="w-price text-center pb-2">
            <input
              className="input-text price text-center"
              name="total"
              type="text"
              value={item.total}
              // onChange={(event) => handleChange(event, index)}
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
          {/*<td className="w-btn pb-2">*/}
          {/*    {inputs.length > 1 && (*/}
          {/*        <button onClick={() => handleDeleteInput(index)} className="btn-delete" />*/}
          {/*    )}*/}
          {/*</td>*/}
          {/*<td className="w-btn pb-2">*/}
          {/*    {(index === inputs.length - 1) && (*/}
          {/*        <button onClick={() => handleAddInput()} className="btn-plus" />*/}
          {/*    )}*/}
          {/*    /!*{(item.product_id && lastRow != 2) && (*!/*/}
          {/*    /!*    <button onClick={() => handleAddInput()} className="btn-plus" />*!/*/}
          {/*    /!*)}*!/*/}
          {/*</td>*/}
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
