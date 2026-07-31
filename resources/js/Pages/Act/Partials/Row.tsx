import React, { useRef, useState } from 'react';
import axios from 'axios';

const emptyRow = () => ({
  product_id: '',
  product: '',
  quantity: 1,
  price: 0,
  total: 0,
  components: [],
});

export { emptyRow };

export default function ActRows({ rows, onChange, fifo = {} }) {
  const [results, setResults] = useState([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const requestId = useRef(0);

  const changeRows = (nextRows) => onChange(nextRows);

  const updateRow = (index, patch) => {
    const next = rows.map((row, rowIndex) => {
      if (rowIndex !== index) return row;
      const updated = { ...row, ...patch };
      const quantity = Number(updated.quantity) || 0;
      const price = Number(updated.price) || 0;
      updated.total = Number((quantity * price).toFixed(2));
      return updated;
    });
    changeRows(next);
  };

  const searchServices = async (value, index) => {
    updateRow(index, { product: value, product_id: '', components: [] });
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
    updateRow(index, {
      product_id: service.id,
      product: service.name,
      price: Number(service.price) || 0,
      quantity: 1,
      components: (response.data.items || []).map((component) => ({
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
                ? { ...component, base_quantity: Number(totalQuantity || 0) / Math.max(Number(row.quantity || 0), 1) }
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
        <tr key={index}>
          <td className="w-product pb-2 align-top">
            <div className="relative">
              <input
                name="product"
                className="input-text input-invoice material-input"
                type="text"
                value={row.product || ''}
                placeholder="Почніть вводити назву послуги"
                onChange={(event) => searchServices(event.target.value, index)}
                onFocus={() => setActiveRow(index)}
              />
              {activeRow === index && results.length > 0 && (
                <div className="absolute autocomplete z-50 w-full">
                  <ul>
                    {results.map((service) => (
                      <li
                        key={service.id}
                        className="cursor-pointer py-1"
                        onMouseDown={() => selectService(service, index)}
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(row.components || []).length > 0 && (
                <div className="mt-1 text-xs  p-2 text-black services-block">
                  <span className="title-service">Матеріали</span>
                  <ul className="list-disc pl-5 mt-1">
                    {row.components.map((component, componentIndex) => {
                      const fifoItem = fifo[`${index}:${componentIndex}`];
                      const requiredQty = Number(component.base_quantity || 0) * Number(row.quantity || 0);
                      return (
                      <li
                        key={`${component.material_id}-${componentIndex}`}
                        className="flex items-center justify-between py-2 border-b border-[#d8dee8] mb-2 last:border-0"
                      >
                        <span className="flex-1 service-item truncate act-service">
                          {component.product}
                        </span>
                        <div className="flex items-center space-x-2 shrink-0 pt-[7px]">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="input-text w-16  text-md text-center"
                            value={requiredQty || ''}
                            onChange={(event) =>
                              updateComponent(index, componentIndex, event.target.value)
                            }
                          />
                          <span className="w-12 text-left text-[11px] text-gray-400">
                            {component.unit_name || ''}
                          </span>
                        </div>
                        <div className="w-full text-[11px] text-gray-500 pt-1">
                          FIFO: {requiredQty.toFixed(2)} {component.unit_name || ''} · собівартість {Number(fifoItem?.cost || 0).toFixed(2)}
                          {fifoItem?.shortage_qty > 0 && <span className="text-red-600"> · нестача {Number(fifoItem.shortage_qty).toFixed(2)}</span>}
                          {(fifoItem?.batches || []).map((batch) => (
                            <span key={batch.batch_id} className="block">Партія #{batch.batch_id} від {batch.arrived_at}: {Number(batch.quantity).toFixed(2)} × {Number(batch.price_per_unit).toFixed(2)}</span>
                          ))}
                        </div>
                      </li>
                    )})}
                  </ul>
                </div>
              )}
            </div>
          </td>
          <td className="w-qty pb-2 align-top">
            <input
              className="qty text-center qty-act"
              type="number"
              min="1"
              step="1"
              value={row.quantity ?? 1}
              onChange={(event) => updateRow(index, { quantity: event.target.value })}
            />
          </td>
          <td className="w-price text-center pb-2 pl-[30px] align-top">
            <input
              className="input-text price input-invoice text-center"
              type="text"
              min="0"
              value={row.price ?? 0}
              onChange={(event) => updateRow(index, { price: event.target.value })}
            />
            <div className="pt-1 text-[11px] text-gray-500">
              FIFO: {((row.components || []).reduce((sum, _component, componentIndex) => sum + Number(fifo[`${index}:${componentIndex}`]?.cost || 0), 0)).toFixed(2)}
            </div>
          </td>
          <td className="w-price text-center pb-2 pl-[30px] align-top">
            {Number(row.total || 0).toFixed(2)}
          </td>
          <td className="w-btn pb-2 align-top">
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => changeRows(rows.filter((_, rowIndex) => rowIndex !== index))}
                className="btn-delete"
              />
            )}
          </td>
          <td className="w-btn pb-2 align-top">
            {index === rows.length - 1 && (
              <button
                type="button"
                onClick={() => changeRows([...rows, emptyRow()])}
                className="btn-plus"
              />
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
