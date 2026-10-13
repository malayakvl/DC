import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useAppDispatch } from '@/hooks';
import { setupActStoreErrorAction, updateServiceComponentsFifo } from '@/Redux/Act'; // 👈 Подключаем наш экшен

export function useActFifoValidation(rows: any[], actStatus: string) {
  const dispatch = useAppDispatch();
  const requestId = useRef(0);

  useEffect(() => {
    // 🛑 Если акт уже проведен/закрыт — сразу выходим и очищаем ошибки
    const readonlyStatuses = ['completed', 'closed', 'cancelled'];
    if (readonlyStatuses.includes(actStatus)) {
      dispatch(setupActStoreErrorAction({}));
      return;
    }

    const validRows = (rows || []).filter((r) => r.product_id);
    if (validRows.length === 0) {
      dispatch(setupActStoreErrorAction({}));
      return;
    }

    const currentReq = ++requestId.current;

    const validateFifo = async () => {
      try {
        const payload = {
          services: validRows.map((row) => ({
            product_id: row.product_id,
            service_id: row.product_id,
            quantity: Number(row.quantity || 1),
            price: Number(row.price || 0),
            base_price: Number(row.base_price || 0),
            components: (row.components || []).map((comp: any) => ({
              material_id: comp.material_id || comp.product_id,
              quantity:
                Number(comp.quantity || comp.base_quantity || 0) * Number(row.quantity || 1),
            })),
          })),
        };

        const response = await axios.post('/act/fifo-preview', payload);
        if (currentReq !== requestId.current) return;

        const storeItems = response.data.items || [];
        const deficitsMap: Record<string, string> = {};

        // Создаем мапу результатов из fifo-preview по material_id
        const fifoMap = new Map();
        storeItems.forEach((item: any) => {
          fifoMap.set(Number(item.material_id), item);
          if (item.shortage_qty > 0) {
            deficitsMap[item.material_id] =
              `Не вистачає ${Number(item.shortage_qty).toFixed(2)} ${item.unit_name || ''}`;
          }
        });

        // 1. Устанавливаем ошибки дефицита, если они есть
        dispatch(setupActStoreErrorAction(deficitsMap));

        // 2. 🚀 Точечно обновляем компоненты в каждой услуге через Redux, сохраняя всю структуру и вчерашнюю логику quantities
        validRows.forEach((row) => {
          const serviceId = row.product_id;
          const updatedComponents = (row.components || []).map((comp: any) => {
            const mId = Number(comp.material_id || comp.product_id);
            const fifoData = fifoMap.get(mId);

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

          // Отправляем в наш редюсер для обновления конкретной услуги
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