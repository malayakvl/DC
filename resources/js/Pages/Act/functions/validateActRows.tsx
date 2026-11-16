import axios from 'axios';
import { setupActStoreErrorAction, updateServiceComponentsFifo } from '@/Redux/Act';

export const validateActRows = (rows: any, actStatus: string, dispatch: any, qty: number) => {
  // const dispatch = useDispatch();
  // const requestId = rowRef(0);
  // const actItemRows = useSelector(actItemsSelector);
  console.log('actItemRows', rows);

  const readonlyStatuses = ['completed', 'closed', 'cancelled'];
  if (readonlyStatuses.includes(actStatus)) {
    dispatch(setupActStoreErrorAction({}));
    return;
  }

  const validRows = (rows || []).filter((r: any) => r.service_id || r.product_id);
  if (validRows.length === 0) {
    dispatch(setupActStoreErrorAction({}));
    return;
  }

  // const currentReq = ++requestId.current;
  console.log('incoming rows', validRows);
  const validateFifo = async () => {
    try {
      const payload = {
        services: validRows.map((row: any) => {
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
      const response = await axios.post('/act/fifo-preview-func', payload);
      // if (currentReq !== requestId.current) return;
      console.log('response for act', response);

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
      let materialsCost = 0;
      validRows.forEach((row: any) => {
        const serviceId = Number(row.service_id || row.product_id);
        const updatedComponents = (row.components || []).map((comp: any) => {
          const mId = Number(comp.material_id || comp.product_id);
          const uniqueKey = `${serviceId}_${mId}`;
          const fifoData = fifoMap.get(uniqueKey);

          if (fifoData) {
            materialsCost += fifoData.cost ?? 0;

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
        // Базова ціна самої послуги
        const baseServicePrice = Number(row.base_price || 0);
        // Фінальна ціна = база послуги + сума всіх матеріалів/компонентів
        const finalServicePrice = baseServicePrice + materialsCost;

        dispatch(updateServiceComponentsFifo(serviceId, updatedComponents, finalServicePrice));
      });
    } catch (error) {
      console.error('FIFO validation error:', error);
    }
  };

  const timer = setTimeout(validateFifo, 300);
  return () => clearTimeout(timer);
};
