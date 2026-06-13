import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { emptyMaterialsAutocompleteAction, findMaterialAction } from '../../../Redux/Material';
import { setInvoiceItems, setShowTableError } from '../../../Redux/Incominginvoice';
import { invoiceTaxSelector } from '../../../Redux/Incominginvoice/selectors';
import { searchResultMaterialsSelector } from '../../../Redux/Material/selectors';
import InputSelect from '../../../Components/Form/InputSelect';

export interface AddDynamicInputFieldsRef {
  addRow: () => void;
}

// eslint-disable-next-line react/display-name
const AddDynamicInputFields = forwardRef<AddDynamicInputFieldsRef, any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ formRowData = null, lastRow = null, unitsData }, ref) => {
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

    const handleChange = (event, index, minus: string) => {
      dispatch(setShowTableError(false));
      const { name, value } = event.target;
      const onChangeValue = [...inputs];
      onChangeValue[index][name] = value;
      setNumRow(index);
      if (name === 'product') {
        if (value.length > 3) {
          dispatch(emptyMaterialsAutocompleteAction());
          dispatch(findMaterialAction(value));
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
        return 80 + index * 10 + 33 * index;
      } else {
        return (index + 1) * 80;
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
                // eslint-disable-next-line react/jsx-key
                <li
                  className="cursor-pointer py-0.5"
                  onClick={() => {
                    setHideFields(true);
                    dispatch(emptyMaterialsAutocompleteAction());
                    documentTax.split('_');
                    inputs[index].product = _res.name;
                    inputs[index].product_id = _res.id;
                    inputs[index].price = _res.retail_price;
                    inputs[index].unit_id = _res.unit_id;
                    inputs[index].pack_qty = parseFloat(_res.weight ? _res.weight : 1).toFixed(2);
                    inputs[index].fact_qty = parseFloat(_res.weight ? _res.weight : 1).toFixed(2);
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
            <td className="w-product pb-2 pl-2">
              <div className="relative">
                <input
                  name="product"
                  className="input-text input-invoice material-input"
                  type="text"
                  value={item.product}
                  onChange={(event) => handleChange(event, index, 'minus')}
                />
              </div>
            </td>
            <td className="w-qty pb-2 mx-auto pl-[40px]">
              <div className="row flex input-inv-group">
                <button
                  name="minusBtn"
                  onClick={(event) => {
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
                  value={item.qty}
                  onChange={(event) => handleChange(event, index, 'minus')}
                />
                <button
                  name="plusBtn"
                  onClick={(event) => {
                    handleChange(event, index, 'plus');
                  }}
                  className="btn-qty-plus"
                  type="button"
                >
                  +
                </button>
              </div>
            </td>
            <td className="w-unit text-center pb-2 min-w-[120px]">
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
                onChange={undefined}
              />
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text factqty text-center"
                name="fact_qty"
                type="fact_qty"
                value={item.fact_qty}
                onChange={(event) => handleChangeFactQty(event, index)}
              />
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text price input-invoice text-center"
                name="price"
                type="text"
                value={item.price}
                onChange={(event) => handleChange(event, index, 'minus')}
              />
            </td>
            <td className="w-price text-center pb-2">
              <input
                className="input-text price input-invoice text-center"
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
