import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useAppDispatch } from '@/hooks'; // Проверь путь к твоему хуку useDispatch
import { setupActStoreErrorAction } from '@/Redux/Act'; // Проверь путь к экшену

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
              quantity: Number(comp.quantity || comp.base_quantity || 0) * Number(row.quantity || 1),
            })),
          })),
        };

        const response = await axios.post('/act/fifo-preview', payload);

        if (currentReq !== requestId.current) return;

        const storeItems = response.data.items || [];
        const deficitsMap: Record<string, string> = {};

        storeItems.forEach((item: any) => {
          if (item.shortage_qty > 0) {
            deficitsMap[item.material_id] = `Не вистачає ${Number(item.shortage_qty).toFixed(2)} ${item.unit_name || ''}`;
          }
        });

        dispatch(setupActStoreErrorAction(deficitsMap));
      } catch (error) {
        console.error('FIFO validation error:', error);
      }
    };

    const timer = setTimeout(validateFifo, 300);
    return () => clearTimeout(timer);
  }, [rows, actStatus, dispatch]);
}