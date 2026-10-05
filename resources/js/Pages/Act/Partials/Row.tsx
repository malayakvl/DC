import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import { actItemsSelector, actDeficitsErrorSelector } from '../../../Redux/Act/selectors';
import { useAppDispatch } from '../../../hooks';
import {
  updateServiceQuantityAction,
  setupActStoreErrorAction,
  updateComponentQuantityAction,
} from '../../../Redux/Act';

export const emptyRow = () => ({
  product_id: '',
  product: '',
  quantity: 1,
  price: 0,
  base_price: 0,
  total: 0,
  components: [],
});

export interface ActRowsRef {
  addRow: () => void;
}

const MaterialItem = ({
  component,
  msg,
  actItemsError,
  dispatch,
  invoiceItems,
}: {
  component: any;
  msg: any;
  actItemsError: any;
  dispatch: any;
  invoiceItems: any;
}) => {
  const [isBatchesOpen, setIsBatchesOpen] = useState(false);
  const materialId = component.material_id;
  const priceId = component.price_id;
  const errorMessage = actItemsError[materialId] || '';
  const [localVal, setLocalVal] = useState(
    component.quantity !== undefined && component.quantity !== '' && component.quantity !== null
      ? String(component.quantity)
      : '0'
  );
  const materialBatches = component.batches || [];

  // Розрахунок собівартості на основі cost та кількості з компонента
  const unitCost =
    Number(component.cost || 0) / Math.max(Number(component.available_qty || 1), 1) ||
    Number(materialBatches[0]?.price_per_unit || 0);

  const isInst = component.is_instrument && Number(component.expected_uses || 0) > 0;
  const numericRequiredQty = Number(localVal) || 0;

  // Загальна вартість матеріалу по партіях
  const itemTotalCost =
    materialBatches.length > 0
      ? materialBatches.reduce(
          (acc: any, b: any) =>
            acc +
            (b.total !== undefined
              ? Number(b.total)
              : Number(b.quantity || 0) * Number(b.price_per_unit || 0)),
          0
        )
      : unitCost * numericRequiredQty;

  const batchesCount = materialBatches.length;

  return (
    <li className="p-2.5 bg-white text-[13px] shadow-2xs">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-medium text-slate-800 flex-1 text-[14px]">
            <span
              className={`w-2 h-2 rounded-full ${errorMessage ? 'bg-red-500' : 'bg-emerald-500'} shrink-0 inline-block mr-2`}
              title="Залишок достатній"
            ></span>
            <span className={`${errorMessage ? 'text-[#ef4444]' : 'text-black'}`}>
              {component.product}
            </span>
            {isInst && (
              <span className="ml-2.5 text-[12px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded border border-sky-100">
                {msg.get('act.instrument')} ({msg.get('act.main.resources')}{' '}
                {component.expected_uses} {msg.get('act.uses')})
              </span>
            )}
          </span>
          <span className="block text-[#ef4444] absolute text-[11px]">{errorMessage}</span>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <div className="text-right">
            <input
              type="text"
              inputMode="decimal"
              className="act-component-qty"
              value={localVal}
              onChange={(e) => {
                const val = e.target.value;
                dispatch(
                  updateComponentQuantityAction(
                    component.pricing_id,
                    materialId,
                    Number(e.target.value),
                    invoiceItems
                  )
                );
                setLocalVal(val);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 pb-2 border-b border-slate-200 text-[13px] text-slate-500 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-end gap-2 w-full">
            <span className=" text-slate-400">
              {Number(itemTotalCost ? itemTotalCost / Math.max(numericRequiredQty, 1) : 0).toFixed(
                2
              )}{' '}
              <span className="text-[12px] text-slate-400 font-normal"> / од.</span>
            </span>
            <span className="bg-slate-100 text-black px-1.5 py-0.5 rounded-md text-[12px] font-semibold">
              {itemTotalCost.toFixed(2)} ₴
            </span>
          </div>
          {/*{fifoItem?.shortage_qty > 0 && (*/}
          {/*  <span className="text-red-500 font-medium">*/}
          {/*    {msg.get('act.absent')}: {Number(fifoItem.shortage_qty).toFixed(2)}{' '}*/}
          {/*    {component.unit_name}*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>

        {batchesCount > 0 && (
          <div className="mt-0 pt-0">
            <button
              type="button"
              onClick={() => setIsBatchesOpen(!isBatchesOpen)}
              className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium cursor-pointer select-none text-[14px]"
            >
              <span
                className={`material-symbols-outlined text-[14px] transition-transform ${isBatchesOpen ? 'rotate-90' : ''}`}
              >
                arrow_right
              </span>
              {msg.get('act.batch_details')} ({batchesCount})
            </button>

            {isBatchesOpen && (
              <div className="mt-1.5 pl-3 border-l-2 border-teal-500/30 space-y-1 text-slate-600">
                {materialBatches.map((batch: any, bIndex: number) => (
                  <div
                    key={`batch-${bIndex}`}
                    className="flex items-center justify-between mt-2.5 pl-3 pr-4 py-1.5 bg-slate-50/80 rounded-xl space-y-2"
                  >
                    <div>
                      <span className="text-slate-300">└─</span>
                      <span className="material-symbols-outlined text-[16px] text-teal-600">
                        inventory
                      </span>
                      <span className="font-label-md font-semibold text-slate-800 text-[14px] ml-2">
                        {msg.get('act.batch')} #{batch.batch_id}
                      </span>{' '}
                      <span className="text-slate-400 font-body-sm">
                        ({msg.get('act.arrived')}{' '}
                        {batch.arrived_at ? batch.arrived_at.substring(0, 10) : ''})
                      </span>
                    </div>
                    <span className="font-medium text-slate-800 text-[14px] font-metric-tabular text-slate-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                      {Number(batch.quantity).toFixed(2)} ×{' '}
                      {Number(batch.price_per_unit).toFixed(2)} ₴ ={' '}
                      <span className={'font-bold'}>{Number(batch.total).toFixed(2)} ₴</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

// eslint-disable-next-line react/display-name
const ActRows = forwardRef<ActRowsRef, any>(({ rows, onChange }, ref) => {
  const [results, setResults] = useState([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const requestId = useRef(0);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: { ...lngInvoiceIncoming, ...lngAct },
    locale: appLang,
  });
  const actItemRows = useSelector(actItemsSelector);
  const actItemsError = useSelector(actDeficitsErrorSelector);
  const changeRows = (nextRows: any) => onChange(nextRows);
  const dispatch = useAppDispatch();

  const handleAddInput = () => {
    changeRows([...rows, emptyRow()]);
  };

  useImperativeHandle(ref, () => ({
    addRow: handleAddInput,
  }));

  const updateRow = (index: any, patch: any) => {
    const next = rows.map((row: any, rowIndex: any) => {
      if (rowIndex !== index) return row;
      const updated = { ...row, ...patch };

      const quantity = Number(updated.quantity) || 0;
      const price = patch.price !== undefined ? Number(patch.price) : Number(updated.price || 0);

      updated.total = Number((quantity * price).toFixed(2));
      return updated;
    });
    changeRows(next);
  };

  const searchServices = async (value: any, index: any) => {
    updateRow(index, { product: value, product_id: '', components: [], price: 0, base_price: 0 });
    setActiveRow(index);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    const currentRequest = ++requestId.current;
    const response = await axios.post('/service/findService', { searchName: value });
    if (currentRequest === requestId.current) setResults(response.data.items || []);
  };

  const selectService = async (service: any, index: any) => {
    const response = await axios.post('/service/findServiceItems', { serviceId: service.id });
    const rawItems = response.data.items || [];

    const groupedItemsMap = new Map();
    rawItems.forEach((item: any) => {
      const mId = item.material_id || item.id;
      if (mId && !groupedItemsMap.has(mId)) {
        groupedItemsMap.set(mId, {
          ...item,
          quantity: Number(item.quantity || item.base_quantity || 0),
        });
      }
    });
    const items = Array.from(groupedItemsMap.values());

    const baseServicePrice = Number(service.price) || 0;

    const calculatedComponentsPrice = items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0) * Number(item.price || 0);
    }, 0);

    const totalCalculatedPrice = calculatedComponentsPrice + baseServicePrice;

    updateRow(index, {
      product_id: service.id,
      product: service.name,
      base_price: baseServicePrice,
      price: totalCalculatedPrice > 0 ? totalCalculatedPrice : baseServicePrice,
      quantity: 1,
      components: items.map((component) => ({
        ...component,
        quantity: Number(component.quantity || 0),
        base_quantity: Number(component.quantity || 0),
        user_edited: false,
      })),
    });
    setResults([]);
    setActiveRow(null);
  };

  return (
    <>
      {actItemRows.map((row: any, index: number) => {
        // 1. Рахуємо повну вартість (послуга + матеріали) на основі поточних компонентів
        const calculatedTotalCost = (row.components || []).reduce(
          (sum: any, component: any) => sum + Number(component.cost || 0),
          Number(row.base_price || row.price || 0)
        );

        // 2. Автоматично оновлюємо ціну в стейті, якщо вона ще не була змінена вручну або дорівнює базі
        // React.useEffect(() => {
        //   if (calculatedTotalCost > 0 && Number(row.price) !== calculatedTotalCost) {
        //     updateRow(index, { price: Number(calculatedTotalCost.toFixed(2)) });
        //   }
        // }, [calculatedTotalCost]);
        return (
          <tr key={`row-${index}`} className="border-b border-slate-100 last:border-none">
            {/* Назва послуги з автокомплітом та матеріалами */}
            <td className="py-3 px-3 align-top w-full pl-0">
              <div className="relative">
                <input
                  name="product"
                  className="w-full px-3 py-2 rounded-xl bg-white text-[14px] border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                  type="text"
                  value={row.service || ''}
                  placeholder="Почніть вводити назву послуги..."
                  onChange={(event) => searchServices(event.target.value, index)}
                  onFocus={() => setActiveRow(index)}
                />
                {/* Випадаючий список пошуку послуг */}
                {activeRow === index && results.length > 0 && (
                  <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    <ul className="py-1">
                      {results.map((service: any, sIdx: number) => (
                        <li
                          key={`service-${service.id || sIdx}`}
                          className="px-4 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-900 cursor-pointer transition-colors flex justify-between items-center"
                          onMouseDown={() => selectService(service, index)}
                        >
                          <span className="font-medium">{service.name}</span>
                          <span className="text-teal-600 font-semibold text-xs">
                            {Number(service.price || 0).toFixed(2)} ₴
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Блок пов'язаних матеріалів (FIFO) */}
                {(row.components || []).length > 0 &&
                  (() => {
                    const totalCost = row.components.reduce(
                      (sum: any, component: any) => {
                        // Беремо готову вартість з самого компонента або рахуємо за ціною і кількістю
                        const componentTotal = component.cost;
                        return sum + componentTotal;
                      },
                      Number(row.base_price || row.price || 0) // Базова ціна послуги + сума всіх матеріалів
                    );

                    return (
                      <div className="mt-2.5 p-3 bg-white text-slate-700">
                        <div className="bg-[#f0fdfa] py-2 px-2 font-semibold text-slate-800 mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[16px]">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                              <span className="material-symbols-outlined text-[20px]">
                                package_2
                              </span>
                            </div>
                            {msg.get('act.materials.and.services')}
                          </div>
                          <div className="text-[14px] bg-white text-teal-700 px-2 py-0.5 rounded-md font-medium border border-teal-200/60">
                            {msg.get('act.total.payment')}
                            <strong className="font-bold">{totalCost.toFixed(2)} ₴</strong>
                          </div>
                        </div>

                        <ul className="list-none space-y-2">
                          {row.components.map((component: any, componentIndex: number) => {
                            return (
                              <MaterialItem
                                key={`comp-${component.material_id || componentIndex}`}
                                component={component}
                                actItemsError={actItemsError}
                                dispatch={dispatch}
                                invoiceItems={row}
                                msg={msg}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })()}
              </div>
            </td>

            {/* Кількість */}
            <td className="py-3 px-3 align-top w-qty">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setupActStoreErrorAction([]));
                      dispatch(
                        updateServiceQuantityAction(
                          row.service_id,
                          Math.max(Number(row.quantity || 1) - 1, 1),
                          actItemRows
                        )
                      );
                    }}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-2xs cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    name="quantity"
                    className="w-14 text-center bg-transparent font-bold text-slate-900 text-xs focus:outline-none border-0"
                    type="text"
                    min="1"
                    value={row.quantity ?? 1}
                    onChange={(event) => {
                      updateRow(index, { quantity: event.target.value });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        updateServiceQuantityAction(
                          row.service_id,
                          Number(row.quantity || 1) + 1,
                          actItemRows
                        )
                      );
                    }}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-xs font-bold shadow-2xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </td>

            {/* Ціна */}
            <td className="py-3 px-3 align-top w-price">
              <input
                className="w-full px-3 py-2 text-center rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition min-w-[150px]"
                type="text"
                min="0"
                value={calculatedTotalCost}
                onChange={(event) => updateRow(index, { price: event.target.value })}
              />
            </td>

            {/* Сума */}
            <td className="py-3 px-3 align-top text-center font-semibold text-slate-800 text-xs w-price whitespace-nowrap">
              <div className="inline-block mt-[10px]">
                {Number(calculatedTotalCost || 0).toFixed(2)} ₴
              </div>
            </td>

            {/* Кнопка видалення рядка */}
            <td className="py-3 px-2 align-top w-btn text-center">
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    changeRows(rows.filter((_: any, rowIndex: number) => rowIndex !== index))
                  }
                  className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition cursor-pointer mx-auto"
                  title="Видалити рядок"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              )}
            </td>

            {/* Кнопка додавання нового рядка */}
            <td className="py-3 px-2 align-top w-btn text-center">
              {index === rows.length - 1 && (
                <button
                  type="button"
                  onClick={() => changeRows([...rows, emptyRow()])}
                  className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 flex items-center justify-center transition cursor-pointer mx-auto"
                  title="Додати рядок"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
});

export default ActRows;
