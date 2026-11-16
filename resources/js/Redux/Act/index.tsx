import { handleActions } from 'redux-actions';
import {
  setActItems,
  setShowTableError,
  updateServiceItemQtyAction,
  setFilters,
  clearFilters,
  findActItemsAction,
  updateServiceQuantityAction,
  updateComponentQuantityAction,
  setupActStoreErrorAction,
  updateServiceComponentsFifo,
  addEmptyActRowAction,
  updateActRowAction,
  removeActRowAction,
  removeComponentAction,
  updateComponentMarkupAction,
  setRowUpdated,
} from './actions';

const initialState = {
  actItems: [],
  actItemsError: [],
  invoiceTax: '',
  curreny: '',
  showTableError: false,
  rowUpdated: false,
  searchResultServices: [],
  searchResultElementsServices: {}, // Object with row index as key and service items array as value
  filters: {
    filterName: '',
    filterAmount: '',
    filterDateFrom: '',
    filterDateTo: '',
    filterStatus: '',
  },
  isClear: false,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [updateComponentQuantityAction.toString()]: {
    next: (state: any, action: any) => {
      if (!action.payload) return state;
      const { serviceId, components } = action.payload;

      const updatedActItems = state.actItems.map((serviceItem: any) => {
        const currentId = Number(
          serviceItem.service_id || serviceItem.product_id || serviceItem.id
        );
        if (currentId === Number(serviceId)) {
          return {
            ...serviceItem,
            // 🚀 Гарантированно создаем новый массив и новые объекты компонентов,
            // чтобы React 100% увидел изменения и вызвал ререндер!
            components: components.map((comp: any) => ({ ...comp })),
          };
        }
        return serviceItem;
      });

      return {
        ...state,
        actItems: updatedActItems,
      };
    },
  },
  [updateServiceComponentsFifo.toString()]: {
    next: (state: any, action: any) => {
      const { serviceId, components, price } = action.payload;
      const updatedActItems = state.actItems.map((serviceItem: any) => {
        const currentId = Number(
          serviceItem.service_id || serviceItem.product_id || serviceItem.id
        );

        if (currentId === Number(serviceId)) {
          const qty = Number(serviceItem.quantity || 1);
          const newPrice = price !== undefined ? Number(price) : Number(serviceItem.price || 0);

          return {
            ...serviceItem,
            components: components,
            price: newPrice,
            total: Number((qty * (newPrice + serviceItem.base_price)).toFixed(2)), // Автоматично оновлюємо загальну суму рядка
          };
        }
        return serviceItem;
      });

      return {
        ...state,
        actItems: updatedActItems,
      };
    },
  },
  [setActItems.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      // Додаємо новий об'єкт (або масив об'єктів) до вже існуючого масиву
      actItems: [
        ...state.actItems,
        ...(Array.isArray(action.payload) ? action.payload : [action.payload]),
      ],
    }),
  },
  [setFilters.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      filters: action.payload,
    }),
  },
  [setRowUpdated.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      rowUpdated: action.payload,
    }),
  },
  [clearFilters.toString()]: {
    next: (state: any) => ({
      ...state,
      filters: {
        filterName: '',
        filterPhone: '',
      },
      isClear: true,
    }),
  },
  [setShowTableError.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      showTableError: action.payload,
    }),
  },
  [findActItemsAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      actItems: [
        ...state.actItems,
        ...(Array.isArray(action.payload) ? action.payload : [action.payload]),
      ],
    }),
  },
  [removeComponentAction.toString()]: {
    next: (state: any, action: any) => ({
      ...state,
      actItems: action.payload.updatedServices,
    }),
  },
  [setupActStoreErrorAction.toString()]: {
    next: (state: any, action: any) => {
      return {
        ...state,
        // 🚀 Полностью перезаписываем ошибки актуальным состоянием с бэкенда
        actItemsError: action.payload || {},
      };
    },
  },
  [updateServiceItemQtyAction.toString()]: {
    next: (state: any, action: any) => {
      const { rowIndex, itemIndex, qty } = action.payload;
      const updatedItems = [...state.invoiceItems];

      if (rowIndex >= 0 && rowIndex < updatedItems.length) {
        const row = updatedItems[rowIndex];
        if (row.components && row.components.length > itemIndex) {
          const updatedComponents = [...row.components];
          updatedComponents[itemIndex] = {
            ...updatedComponents[itemIndex],
            quantity: qty,
          };

          updatedItems[rowIndex] = {
            ...row,
            components: updatedComponents,
          };
        }
      }

      return {
        ...state,
        invoiceItems: updatedItems,
      };
    },
  },
  // Додай ці три кейси всередину ACTION_HANDLERS:

  [addEmptyActRowAction.toString()]: {
    next: (state: any) => ({
      ...state,
      actItems: [
        ...state.actItems,
        {
          service_id: '',
          service: '',
          quantity: 1,
          price: 0,
          base_price: 0,
          total: 0,
          components: [],
        },
      ],
    }),
  },
  [updateActRowAction.toString()]: {
    next: (state: any, action: any) => {
      const { index, patch } = action.payload;
      const updatedItems = [...state.actItems];
      if (index >= 0 && index < updatedItems.length) {
        const row = updatedItems[index];
        const updatedRow = { ...row, ...patch };

        // Автопересчет total, если изменилось quantity или price
        const qty = Number(updatedRow.quantity) || 1;
        const price = Number(updatedRow.price) || 0;
        updatedRow.total = Number((qty * price).toFixed(2));

        updatedItems[index] = updatedRow;
      }
      return {
        ...state,
        actItems: updatedItems,
      };
    },
  },
  [removeActRowAction.toString()]: {
    next: (state: any, action: any) => {
      const serviceIdToRemove = action.payload;

      // Фільтруємо масив, залишаючи все, окрім того, що має цей service_id (або product_id)
      const updatedItems = state.actItems.filter(
        (item: any) => Number(item.service_id || item.product_id) !== Number(serviceIdToRemove)
      );

      return {
        ...state,
        actItems:
          updatedItems.length > 0
            ? updatedItems
            : [
                {
                  service_id: '',
                  service: '',
                  quantity: 1,
                  price: 0,
                  base_price: 0,
                  total: 0,
                  components: [],
                },
              ],
      };
    },
  },
  // [updateComponentMarkupAction.toString()]: {
  //   next: (state: any, action: any) => {
  //     if (!action.payload) return state;
  //     return {
  //       ...state,
  //       actItems: action.payload.updatedServices,
  //     };
  //   },
  // },
  [updateComponentMarkupAction.toString()]: (state: any, action: any) => {
    if (!action.payload) return state;

    const { updatedServices, deficitsMap } = action.payload;

    return {
      ...state,
      actItems: updatedServices,
      deficitsError: deficitsMap || state.deficitsError,
    };
  },
  // У вашому Redux слайсі (наприклад, Redux/Act/index.ts)
  // updateComponentMarkupAction: (state: any, action: any) => {
  //   // action.payload містить сервіс ID, матеріалу та нове значення націнки (або готовий стан)
  //   const { serviceId, materialId, markup } = action.payload;
  //
  //   // Знаходимо потрібний сервіс та компонент у state і оновлюємо mark_up
  //   state.actItems = state.actItems.map((row: any) => {
  //     if (Number(row.service_id || row.product_id) === Number(serviceId)) {
  //       const updatedComponents = (row.components || []).map((comp: any) => {
  //         if (Number(comp.material_id || comp.product_id) === Number(materialId)) {
  //           return { ...comp, mark_up: markup };
  //         }
  //         return comp;
  //       });
  //       return { ...row, components: updatedComponents };
  //     }
  //     return row;
  //   });
  // },
};

export {
  setActItems,
  setShowTableError,
  updateServiceItemQtyAction,
  updateComponentQuantityAction,
  setFilters,
  clearFilters,
  findActItemsAction,
  updateServiceQuantityAction,
  setupActStoreErrorAction,
  updateServiceComponentsFifo,
  addEmptyActRowAction,
  updateActRowAction,
  removeActRowAction,
  removeComponentAction,
  updateComponentMarkupAction,
  setRowUpdated,
};

export default handleActions(ACTION_HANDLERS, initialState);
