import { createAction } from 'redux-actions';
import axios from 'axios';

const calculateBaseQuantities = (components: any, serviceQuantity = 1) => {
  const groupedMap = new Map();
  (components || []).forEach((component: any) => {
    const mId = component.material_id || component.product_id || component.id;

    let q = Number(component.base_quantity);
    if (isNaN(q) || q === 0) {
      const totalQ = Number(component.quantity || 0);
      q = serviceQuantity > 0 ? totalQ / serviceQuantity : totalQ;
    }

    if (mId) {
      if (groupedMap.has(mId)) {
        groupedMap.get(mId).base_quantity += q;
      } else {
        groupedMap.set(mId, {
          ...component,
          material_id: mId,
          base_quantity: q,
        });
      }
    }
  });
  return Array.from(groupedMap.values());
};

export const setActItems = createAction('act/SET_ACT_ITEMS');
export const setActTax = createAction('act/SET_ACT_TAX');
export const setActCurrency = createAction('act/SET_ACT_CURRENCY');
export const setShowTableError = createAction('act/SET_TABLE_ERRORS');
export const setupActStoreErrorAction = createAction('act/SET_STORE_DEFICIT_ERROR');
export const updateServiceItemQtyAction = createAction(
  'act/UPDATE_SERVICE_ITEM_QTY',
  (rowIndex: any, itemIndex: any, qty: number) => ({ rowIndex, itemIndex, qty })
);
export const setFilters = createAction('act/SET_FILTERS');
export const clearFilters = createAction('act/CLEAR_FILTERS');

export const findActItemsAction: any = createAction(
  'act/FIND_ITEMS_ACTIONS',
  async (service: any) => async () => {
    const serviceId = service.id || service.service_id;

    try {
      const res = await axios.post(`/service/findServiceItems`, { serviceId });
      const quantity = Number(service.qty ?? service.quantity ?? 1);
      const servicePrice = Number(service.price ?? service.base_price ?? 150);

      return {
        service_id: serviceId,
        service: service.name || service.product || '',
        quantity,
        price: servicePrice,
        base_price: servicePrice,
        total: Number((quantity * servicePrice).toFixed(2)),
        components: calculateBaseQuantities(res.data.items, quantity),
      };
    } catch (error) {
      console.error('Error fetching service items', error);
      return null;
    }
  }
);

export const updateServiceQuantityAction: any = createAction(
  'act/UPDATE_SERVICE_QUANTITY_NEW',
  async (serviceId: any, qty: number, actRows: any) => async (dispatch: any) => {
    try {
      const targetItem = actRows.find((item: any) => item.service_id === serviceId);
      if (!targetItem) return null;

      const newServiceQty = Number(qty);
      const updatedComponents = (targetItem.components || []).map((comp: any) => {
        const baseQty = Number(comp.base_quantity ?? comp.quantity / (targetItem.quantity || 1));
        return {
          ...comp,
          base_quantity: baseQty,
          quantity: baseQty * newServiceQty,
        };
      });

      const updatedTargetItem = {
        ...targetItem,
        components: updatedComponents,
        quantity: newServiceQty,
      };

      const response = await axios.post('/act/fifo-preview', {
        services: [updatedTargetItem],
      });

      dispatch(setupActStoreErrorAction(response.data.deficits_map || {}));
    } catch (error) {
      console.error('Error updating service quantity:', error);
      throw error;
    }
  }
);

export const updateComponentQuantityAction: any = createAction(
  'act/UPDATE_COMPONENT_QUANTITY_NEW',
  async (serviceId: number, materialId: number, qty: number, targetServiceItem: any) =>
    async (dispatch: any) => {
      try {
        if (!targetServiceItem) return null;

        const currentServiceId = Number(
          targetServiceItem.service_id || targetServiceItem.product_id || serviceId
        );
        const serviceQty = Number(targetServiceItem.quantity || 1);
        const newComponentQty = Number(qty);

        const updatedComponents = (targetServiceItem.components || []).map((comp: any) => {
          if (Number(comp.material_id || comp.product_id) === Number(materialId)) {
            const baseQty = newComponentQty / serviceQty;
            return {
              ...comp,
              base_quantity: baseQty,
              quantity: newComponentQty,
            };
          }
          return comp;
        });

        const updatedTargetItem = {
          ...targetServiceItem,
          components: updatedComponents,
        };

        const response = await axios.post('/act/fifo-preview', {
          services: [updatedTargetItem],
        });

        const storeItems = response.data.items || [];
        const deficitsMap = response.data.deficits_map || {};

        dispatch(setupActStoreErrorAction(deficitsMap));

        const fifoMap = new Map();
        storeItems.forEach((item: any) => {
          const uniqueKey = item.composite_key || `${item.service_id}_${item.material_id}`;
          fifoMap.set(uniqueKey, item);
        });

        const fullyUpdatedComponents = updatedComponents.map((comp: any) => {
          const mId = Number(comp.material_id || comp.product_id);
          const uniqueKey = `${currentServiceId}_${mId}`;
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

        return {
          serviceId: currentServiceId,
          components: fullyUpdatedComponents,
        };
      } catch (error) {
        console.error('Error updating component quantity:', error);
        return null;
      }
    }
);

export const removeComponentAction: any = createAction(
  'act/REMOVE_COMPONENT_SERVICE',
  async (serviceId: number, updatedTargetItem: any, allActItems: any[]) =>
    async (dispatch: any) => {
      try {
        const servicesPayload = allActItems.map((row: any) =>
          Number(row.service_id || row.product_id) === Number(serviceId) ? updatedTargetItem : row
        );

        const response = await axios.post('/act/fifo-preview', {
          services: servicesPayload,
        });

        const storeItems = response.data.items || [];
        const deficitsMap = response.data.deficits_map || {};

        dispatch(setupActStoreErrorAction(deficitsMap));

        const fifoMap = new Map();
        storeItems.forEach((item: any) => {
          const uniqueKey = item.composite_key || `${item.service_id}_${item.material_id}`;
          fifoMap.set(uniqueKey, item);
        });

        const enrichedServices = servicesPayload.map((service: any) => {
          const sId = Number(service.service_id || service.product_id);
          const updatedComponents = (service.components || []).map((comp: any) => {
            const mId = Number(comp.material_id || comp.product_id);
            const uniqueKey = `${sId}_${mId}`;
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

          const calculatedComponentsPrice = updatedComponents.reduce((sum: number, item: any) => {
            return sum + Number(item.cost || 0);
          }, 0);

          const baseServicePrice = Number(service.base_price || service.price) || 0;
          const totalCalculatedPrice = calculatedComponentsPrice + baseServicePrice;

          return {
            ...service,
            components: updatedComponents,
            price: totalCalculatedPrice > 0 ? totalCalculatedPrice : baseServicePrice,
          };
        });

        return {
          updatedServices: enrichedServices,
        };
      } catch (error) {
        console.error('Error in removeComponentAction:', error);
        return null;
      }
    }
);

export const updateServiceComponentsFifo = createAction(
  'act/UPDATE_SERVICE_COMPONENTS_FIFO',
  (serviceId: any, components: any) => ({ serviceId, components })
);

export const emptyActRow = () => ({
  service_id: '',
  service: '',
  quantity: 1,
  price: 0,
  base_price: 0,
  total: 0,
  components: [],
});

export const addEmptyActRowAction = createAction('act/ADD_EMPTY_ROW');
export const updateActRowAction = createAction(
  'act/UPDATE_ROW_BY_INDEX',
  (index: number, patch: any) => ({ index, patch })
);
export const removeActRowAction = createAction('act/REMOVE_ROW_BY_INDEX', (index: number) => index);
