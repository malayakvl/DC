import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useAppDispatch } from '@/hooks';
import { setupActStoreErrorAction, updateServiceComponentsFifo } from '@/Redux/Act';

export function useActFifoValidation(rows: any[], actStatus: string) {
  const dispatch = useAppDispatch();
  const requestId = useRef(0);

  useEffect(() => {
    const readonlyStatuses = ['completed', 'closed', 'cancelled'];
    if (readonlyStatuses.includes(actStatus)) {
      dispatch(setupActStoreErrorAction({}));
      return;
    }

    const validRows = (rows || []).filter((r) => r.service_id || r.product_id);
    if (validRows.length === 0) {
      dispatch(setupActStoreErrorAction({}));
      return;
    }

    const currentReq = ++requestId.current;

    const validateFifo = async () => {
      try {
        const payload = {
          services: validRows.map((row) => {
            const sId = row.service_id || row.product_id;
            return {
              product_id: sId,
              service_id: sId,
              quantity: Number(row.quantity || 1),
              price: Number(row.price || 0),
              base_price: Number(row.base_price || 0),
              components: (row.components || []).map((comp: any) => ({
                material_id: comp.material_id || comp.product_id,
                quantity:
                  Number(comp.quantity || comp.base_quantity || 0) * Number(row.quantity || 1),
              })),
            };
          }),
        };

        const response = await axios.post('/act/fifo-preview', payload);
        if (currentReq !== requestId.current) return;

        const storeItems = response.data.items || [];
        const deficitsMap = response.data.deficits_map || {};

        // 🚀 1. Встановлюємо мапу дефіцитів строго з бекенда
        dispatch(setupActStoreErrorAction(deficitsMap));

        // 🚀 2. Оновлюємо компоненти кожної послуги даними з бека
        const fifoMap = new Map();
        storeItems.forEach((item: any) => {
          const uniqueKey = item.composite_key || `${item.service_id}_${item.material_id}`;
          fifoMap.set(uniqueKey, item);
        });

        validRows.forEach((row: any) => {
          const serviceId = Number(row.service_id || row.product_id);
          const updatedComponents = (row.components || []).map((comp: any) => {
            const mId = Number(comp.material_id || comp.product_id);
            const uniqueKey = `${serviceId}_${mId}`;
            const fifoData = fifoMap.get(uniqueKey);

            if (fifoData) {
              return {
                ...comp,
                batches: fifoData.batches || [],
                cost: fifoData.cost ?? 0,
                available_qty: fifoData.available_qty ?? 0,
                shortage_qty: fifoData.shortage_qty ?? 0,
              };
            }
            return comp;
          });

          dispatch(updateServiceComponentsFifo(serviceId, updatedComponents));
        });
      } catch (error) {
        console.error('FIFO validation error:', error);
      }
    };

    const timer = setTimeout(validateFifo, 300);
    return () => clearTimeout(timer);
  }, [rows, actStatus, dispatch]);
}
