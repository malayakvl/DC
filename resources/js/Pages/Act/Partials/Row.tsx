import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  emptyServicesAutocompleteAction,
  findServiceAction,
  fincServiceItemsAction
} from '../../../Redux/Service';
import { updateServiceItemQtyAction } from '../../../Redux/Act';
import {
  setActItems,
  setShowTableError,
} from '../../../Redux/Act';
import { searchResultServicesSelector, searchResultServicesElementsSelector } from '../../../Redux/Service/selectors';
import { actItemsSelector } from '../../../Redux/Act/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

export default function AddDynamicInputFields({
  formRowData = null,
  lastRow = null,
  unitsData
}) {
  const appLang = useAppSelector(appLangSelector);
  const msg = new Lang({
    messages: lngAct,
    locale: appLang,
  });
  console.log(formRowData);
  const [inputs, setInputs] = useState(formRowData);
  const dispatch = useAppDispatch();
  const [hideFields, setHideFields] = useState(false);
  const serchResults = useAppSelector(searchResultServicesSelector);
  const serviceItemsByRow = useAppSelector(state => state.service.searchResultElementsServices);
  const actRows = useAppSelector(actItemsSelector);
  const [numRow, setNumRow] = useState(0);
  const inputRefs = useRef([]);
  const [autocompletePos, setAutocompletePos] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  const [activeRow, setActiveRow] = useState(0);

  console.log(inputs);
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        product_id: '',
        product: '',
        quantity: 0,
        price: 0,
        total: 0,
        components: []
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
        const el = inputRefs.current[index];
        if (el) {
          const rect = el.getBoundingClientRect();

          setAutocompletePos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width
          });
        }

        dispatch(emptyServicesAutocompleteAction());
        dispatch(findServiceAction(value));
      } else {
        dispatch(emptyServicesAutocompleteAction());
      }


    } else if (name === 'plusBtn') {
      inputs[index].quantity = inputs[index].quantity + 1;
      inputs[index].total = (
        parseFloat(String(inputs[index].quantity)) *
        parseFloat(String(inputs[index].price))
      ).toFixed(2);

    } else if (name === 'minusBtn') {
      const _factPerUnit = inputs[index].fact_qty / inputs[index].quantity;
      inputs[index].quantity =
        inputs[index].quantity > 1 ? inputs[index].quantity - 1 : 1;
      inputs[index].total = (
        parseFloat(String(inputs[index].quantity)) *
        parseFloat(String(inputs[index].price))
      ).toFixed(2);

    }
    setInputs(onChangeValue);
  };

  // Removed old reference to serviceItems as it's no longer used directly

  const handleDeleteInput = index => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
    return;
  };

  useEffect(() => {
    dispatch(setActItems(inputs));
  }, [inputs]);

  // Update local inputs state when Redux act items change
  useEffect(() => {
    if (actRows && actRows.length > 0) {
      setInputs(actRows);
    }
  }, [actRows]);

  // When service items for a specific row change, update the inputs state
  useEffect(() => {
    if (numRow !== null && serviceItemsByRow[numRow]) {
      setInputs(prev => {
        const updated = [...prev];
        if (numRow < updated.length) {
          updated[numRow] = {
            ...updated[numRow],
            components: serviceItemsByRow[numRow] || []
          };
        }
        return updated;
      });
    }
  }, [serviceItemsByRow, numRow]);

  // Removed useEffect causing infinite loop - actRows are already handled by inputs state

  const handleServiceItemQuantityChange = (rowIndex, itemIndex, newQty) => {
    // Update the Redux store directly
    dispatch(updateServiceItemQtyAction(rowIndex, itemIndex, newQty));
  };

  const calcPos = (index) => {
    // Get service items for this specific row to calculate height adjustment
    const rowServiceItems = serviceItemsByRow[index] || [];
    // Base position calculation plus additional space for service components if they exist
    const serviceComponentsHeight = rowServiceItems.length > 0 ? rowServiceItems.length * 25 : 0; // Approximate height per service component

    if (index >= 1) {
      return (73 + index * 10) + 33 * index + serviceComponentsHeight;
    } else {
      return (index + 1) * 73 + serviceComponentsHeight;
    }
  }

  const renderSearchProducerResultOld = index => {
    if (serchResults.length > 0) {
      return (
        <div
          className="absolute autocomplete"
          style={{ top: calcPos(index) + 'px', width: '500px' }}
        >
          <ul>
            {serchResults.map(_res => (
              <li
                className="cursor-pointer py-0.5"
                onClick={() => {
                  setHideFields(true);
                  dispatch(emptyServicesAutocompleteAction());
                  inputs[index].product = _res.name;
                  inputs[index].product_id = _res.id;
                  inputs[index].price = _res.price;
                  inputs[index].quantity = 1;
                  inputs[index].total = parseFloat(String(inputs[index].price));
                  // находим составляющие услуги
                  dispatch(fincServiceItemsAction(_res.id, index));
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

  const renderSearchProducerResult = () => {
    if (!serchResults.length) return null;

    return createPortal(
      <div
        className="absolute autocomplete z-50"
        style={{
          top: autocompletePos.top,
          left: autocompletePos.left,
          width: autocompletePos.width
        }}
      >
        <ul>
          {serchResults.map(_res => (
            <li
              key={_res.id}
              onClick={() => {
                setHideFields(true);
                dispatch(emptyServicesAutocompleteAction());

                // First, update the inputs with the selected service
                setInputs(prev => {
                  const updated = [...prev];

                  updated[numRow] = {
                    ...updated[numRow],
                    product: _res.name,
                    product_id: _res.id,
                    price: _res.price,
                    quantity: 1,
                    total: _res.price,
                    components: [] // Will be updated when service items load
                  };

                  return updated;
                });

                // Fetch service components and update the Redux state
                dispatch(fincServiceItemsAction(_res.id, numRow));
              }}
            >
              {_res.name}
            </li>
          ))}
        </ul>
      </div>,
      document.body
    );
  };


  return (
    <>
      {inputs.map((item, index) => (
        <tr key={index}>
          <td className="w-product  pb-2">
            <div className="relative">
              <input
                ref={el => { inputRefs.current[index] = el; }}
                name="product"
                className="input-text input-invoice material-input"
                type="text"
                value={item.product}
                onChange={event => handleChange(event, index)}
              />
              {(() => {
                const currentInput = inputs[index];
                let rowComponents = currentInput?.components || [];

                if (typeof rowComponents === 'string') {
                  try {
                    rowComponents = JSON.parse(rowComponents);
                  } catch (e) {
                    rowComponents = [];
                  }
                }

                return rowComponents.length > 0 && (
                  <div className="mt-1 text-xs bg-black p-2 text-white services-block">
                    <span className="title-service">{msg.get('act.title.components')}</span>
                    <ul className="list-disc pl-5 mt-1">
                      {rowComponents.map((component, idx) => (
                        <li key={idx} className="flex items-center justify-between py-0.5 border-b border-gray-800 last:border-0">
                          <span className="flex-1 text-white service-item truncate">{component.product}</span>
                          <div className="flex items-center space-x-2 shrink-0">
                            <input
                              type="text"
                              className="input-text w-16 px-1 py-0.5 text-xs text-center"
                              value={component.quantity}
                              onChange={(e) => {
                                const newQty = parseFloat(e.target.value) || 0;
                                handleServiceItemQuantityChange(index, idx, newQty);
                              }}
                            />
                            <span className="w-12 text-left text-[10px] text-gray-400">{component.unit_name || component.unit || ''}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>

          </td>
          <td className="w-qty pb-2 mx-auto" style={{ verticalAlign: 'top' }}>
            <div className="row flex ml-[40px] pl-[10px] input-inv-group pt-[8px]">
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
                value={item.qty}
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
          <td className="w-price text-center pb-2 pl-[30px]" style={{ verticalAlign: 'top' }}>
            <input
              className="input-text price input-invoice text-center"
              name="price"
              type="text"
              value={item.price}
              onChange={event => handleChange(event, index)}
            />
          </td>
          <td className="w-price text-center pb-2 pl-[30px]" style={{ verticalAlign: 'top' }}>
            <input
              className="input-text price input-invoice text-center"
              name="total"
              type="text"
              value={item.total}
            />
          </td>
          {/* BUTTUNS */}
          <td className="w-btn pb-2" style={{ verticalAlign: 'top' }}>
            {inputs.length > 1 && (
              <button
                onClick={() => handleDeleteInput(index)}
                className="btn-delete"
              />
            )}
          </td>
          <td className="w-btn pb-2" style={{ verticalAlign: 'top' }}>
            {index === inputs.length - 1 && !lastRow && (
              <button onClick={() => handleAddInput()} className="btn-plus" />
            )}
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={6}>
          <div className="body hidden"> {JSON.stringify(inputs)} </div>
          <div className="text-left">{renderSearchProducerResult()}</div>
        </td>
      </tr>
    </>
  );
}
