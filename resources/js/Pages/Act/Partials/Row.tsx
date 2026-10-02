import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';

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

// eslint-disable-next-line react/display-name
const ActRows = forwardRef<ActRowsRef, any>(({ rows, onChange, fifo = {} }, ref) => {
  const [results, setResults] = useState([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const requestId = useRef(0);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: { ...lngInvoiceIncoming, ...lngAct },
    locale: appLang,
  });

  const changeRows = (nextRows) => onChange(nextRows);

  const handleAddInput = () => {
    changeRows([...rows, emptyRow()]);
  };

  useImperativeHandle(ref, () => ({
    addRow: handleAddInput,
  }));

  const updateRow = (index, patch) => {
    const next = rows.map((row, rowIndex) => {
      if (rowIndex !== index) return row;
      const updated = { ...row, ...patch };

      const quantity = Number(updated.quantity) || 0;
      // Жестко берем цену из патча, если она есть, иначе из апдейта или 0
      const price = patch.price !== undefined ? Number(patch.price) : Number(updated.price || 0);

      updated.total = Number((quantity * price).toFixed(2));
      return updated;
    });
    changeRows(next);
  };

  const searchServices = async (value, index) => {
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

  const selectService = async (service, index) => {
    const response = await axios.post('/service/findServiceItems', { serviceId: service.id });
    const rawItems = response.data.items || [];

    // Убираем суммирование через плюс, берем уникальные материалы с их чистой базой из техкарты
    const groupedItemsMap = new Map();
    rawItems.forEach((item) => {
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

    updateRow(index, {
      product_id: service.id,
      product: service.name,
      base_price: baseServicePrice,
      price: calculatedComponentsPrice > 0 ? calculatedComponentsPrice : baseServicePrice,
      quantity: 1,
      components: items.map((component) => ({
        ...component,
        base_quantity: Number(component.quantity || 0),
      })),
    });
    setResults([]);
    setActiveRow(null);
  };

  const updateComponent = (rowIndex, componentIndex, totalQuantity) => {
    const next = rows.map((row, index) =>
      index === rowIndex
        ? {
            ...row,
            components: (row.components || []).map((component, itemIndex) =>
              itemIndex === componentIndex
                ? {
                    ...component,
                    base_quantity:
                      Number(totalQuantity || 0) / Math.max(Number(row.quantity || 0), 1),
                  }
                : component
            ),
          }
        : row
    );
    changeRows(next);
  };

  return (
    <>
      {rows.map((row, index) => (
        <tr
          key={`row-${index}-${Math.random()}`}
          className="border-b border-slate-100 last:border-none"
        >
          {/* Назва послуги з автокомплітом та матеріалами */}
          <td className="py-3 px-3 align-top w-full">
            <div className="relative">
              <input
                name="product"
                className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                type="text"
                value={row.product || ''}
                placeholder="Почніть вводити назву послуги..."
                onChange={(event) => searchServices(event.target.value, index)}
                onFocus={() => setActiveRow(index)}
              />

              {/* Випадаючий список пошуку послуг */}
              {activeRow === index && results.length > 0 && (
                <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  <ul className="py-1">
                    {results.map((service) => (
                      <li
                        key={`service-${Math.random()}`}
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
                  const totalCost = row.components.reduce((sum, component, componentIndex) => {
                    const fifoItem = fifo[`${index}:${componentIndex}`];
                    let unitCost = Number(fifoItem?.cost || 0);
                    const isInst =
                      component.is_instrument && Number(component.expected_uses || 0) > 0;
                    if (isInst && Number(component.expected_uses || 0) > 0) {
                      unitCost = unitCost / Number(component.expected_uses);
                    }
                    const requiredQty =
                      fifoItem && fifoItem.required_qty !== undefined
                        ? Number(fifoItem.required_qty)
                        : Number(component.base_quantity || 0) * Number(row.quantity || 1);

                    // Безпечний розрахунок суми партії з урахуванням того, що total та quantity можуть бути 0
                    const batchSum = (fifoItem?.batches || []).reduce(
                      (acc, b) =>
                        acc +
                        (b.total !== undefined
                          ? Number(b.total)
                          : Number(b.quantity || 0) * Number(b.price_per_unit || 0)),
                      0
                    );
                    return (
                      sum +
                      ((fifoItem?.batches || []).length > 0 ? batchSum : unitCost * requiredQty)
                    );
                  }, 0);

                  return (
                    <div className="mt-2.5 p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-slate-700">
                      <div className="text-xs font-semibold text-slate-800 mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-teal-600 text-[16px]">
                            inventory_2
                          </span>
                          {msg.get('act.materials.and.services')}
                        </div>
                        <div className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md font-medium border border-teal-200/60">
                          {msg.get('act.total.payment')}
                          <strong className="font-bold">{totalCost.toFixed(2)} ₴</strong>
                        </div>
                      </div>

                      <ul className="list-none space-y-2">
                        {row.components.map((component, componentIndex) => {
                          const fifoItem = fifo[`${index}:${componentIndex}`];
                          const unitCost =
                            Number(fifoItem?.cost || 0) /
                              Math.max(Number(fifoItem?.available_qty || 1), 1) ||
                            Number(fifoItem?.batches?.[0]?.price_per_unit || 0);

                          const isInst =
                            component.is_instrument && Number(component.expected_uses || 0) > 0;

                          // Фактична кількість, що списується
                          const requiredQty =
                            fifoItem?.required_qty !== undefined
                              ? Number(fifoItem.required_qty)
                              : Number(component.base_quantity || 0) * Number(row.quantity || 1);

                          // Реальна сума по партіях із захистом від нулів
                          const itemTotalCost =
                            (fifoItem?.batches || []).length > 0
                              ? fifoItem.batches.reduce(
                                  (acc, b) =>
                                    acc +
                                    (b.total !== undefined
                                      ? Number(b.total)
                                      : Number(b.quantity || 0) * Number(b.price_per_unit || 0)),
                                  0
                                )
                              : unitCost * requiredQty;

                          const componentUniqueKey = `comp-${row.product_id || 'item'}-${component.material_id || componentIndex}-${componentIndex}`;

                          return (
                            <li
                              key={componentUniqueKey}
                              className="p-2.5 bg-white border border-slate-200/70 rounded-xl text-xs shadow-2xs"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-medium text-slate-800 truncate flex-1">
                                  {component.product}
                                  {isInst && (
                                    <span className="ml-1.5 text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded border border-sky-100">
                                      {msg.get('act.instrument')} ({msg.get('act.main.resources')}{' '}
                                      {component.expected_uses} {msg.get('act.uses')})
                                    </span>
                                  )}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <input
                                    type="text"
                                    inputMode="decimal"
                                    className="w-16 text-center px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    value={requiredQty || ''}
                                    onChange={(event) =>
                                      updateComponent(index, componentIndex, event.target.value)
                                    }
                                  />
                                  <span className="text-[11px] text-slate-400 w-6">
                                    {component.short_name || ''}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                  <span>
                                    {msg.get('act.service.amount')}{' '}
                                    {isInst ? '(з урахуванням амортизації)' : ''}:{' '}
                                    <strong className="text-slate-800 font-semibold">
                                      {Number(
                                        fifoItem?.cost
                                          ? fifoItem.cost / Math.max(requiredQty, 1)
                                          : 0
                                      ).toFixed(2)}{' '}
                                      ₴
                                      <span className="text-slate-400 font-normal ml-1">
                                        ({msg.get('act.amount.quantity')}:{' '}
                                        {itemTotalCost.toFixed(2)} ₴)
                                      </span>
                                    </strong>
                                  </span>
                                  {fifoItem?.shortage_qty > 0 && (
                                    <span className="text-red-500 font-medium">
                                      {msg.get('act.absent')}:{' '}
                                      {Number(fifoItem.shortage_qty).toFixed(2)}{' '}
                                      {component.unit_name}
                                    </span>
                                  )}
                                </div>

                                {(fifoItem?.batches || []).length > 0 && (
                                  <details className="mt-1 group">
                                    <summary className="cursor-pointer text-[10px] text-teal-600 hover:text-teal-800 font-medium select-none">
                                      {msg.get('act.batches.deteils')} (
                                      {(fifoItem?.batches || []).length})
                                    </summary>
                                    <div className="mt-1 pl-2 space-y-0.5 border-l-2 border-teal-200 bg-slate-50 p-1.5 rounded-lg">
                                      {fifoItem.batches.map((batch, batchIdx) => {
                                        const batchTotal =
                                          batch.total !== undefined
                                            ? Number(batch.total)
                                            : Number(batch.quantity || 0) *
                                              Number(batch.price_per_unit || 0);

                                        return (
                                          <div
                                            key={`batch-${batch.batch_id}-${batchIdx}`}
                                            className="flex justify-between text-[10px] text-slate-600"
                                          >
                                            <span>
                                              {msg.get('act.batch')} #{batch.batch_id} (
                                              {batch.arrived_at})
                                            </span>
                                            <span className="font-mono">
                                              {Number(batch.quantity).toFixed(2)} ×{' '}
                                              {Number(batch.price_per_unit).toFixed(2)} ₴ ={' '}
                                              <strong>{batchTotal.toFixed(2)} ₴</strong>
                                              {isInst
                                                ? ` (${msg.get('act.amortization')} ${component.expected_uses} ${msg.get('act.uses')})`
                                                : ''}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </details>
                                )}
                              </div>
                            </li>
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
                  onClick={() =>
                    updateRow(index, {
                      quantity: Math.max(Number(row.quantity || 1) - 1, 1),
                    })
                  }
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
                  onChange={(event) => updateRow(index, { quantity: event.target.value })}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateRow(index, {
                      quantity: Number(row.quantity || 1) + 1,
                    })
                  }
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
              value={row.price ?? 0}
              onChange={(event) => updateRow(index, { price: event.target.value })}
            />
          </td>

          {/* Сума */}
          <td className="py-3 px-3 align-top text-center font-semibold text-slate-800 text-xs w-price whitespace-nowrap">
            {Number(row.total || 0).toFixed(2)} ₴
          </td>

          {/* Кнопка видалення рядка */}
          <td className="py-3 px-2 align-top w-btn text-center">
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => changeRows(rows.filter((_, rowIndex) => rowIndex !== index))}
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
      ))}
    </>
  );
});

export default ActRows;
