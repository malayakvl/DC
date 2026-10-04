import { createAction } from 'redux-actions';

import axios from 'axios';

// Внутрішня функція розрахунку базових кількостей (щоб не тягнути імпорти з форми)
const calculateBaseQuantities = (components, serviceQuantity = 1) => {
  const groupedMap = new Map();
  (components || []).forEach((component) => {
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
  (rowIndex, itemIndex, qty) => ({ rowIndex, itemIndex, qty })
);
export const setFilters = createAction('act/SET_FILTERS');

export const clearFilters = createAction('act/CLEAR_FILTERS');

export const findActItemsAction: any = createAction(
  'act/FIND_ITEMS_ACTIONS',
  async (service: any) => async (dispatch: any) => {
    const serviceId = service.id || service.service_id;

    try {
      const res = await axios.post(`/service/findServiceItems`, { serviceId });
      const quantity = Number(service.qty ?? service.quantity ?? 1);
      const servicePrice = Number(service.price ?? service.base_price ?? 150);

      // Формуємо повноцінний об'єкт послуги з її компонентами
      const formattedRow = {
        service_id: serviceId,
        service: service.name || service.product || '',
        quantity,
        price: servicePrice,
        base_price: servicePrice,
        total: Number((quantity * servicePrice).toFixed(2)),
        components: calculateBaseQuantities(res.data.items, quantity),
      };

      return formattedRow;
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
      const currentItems = actRows;

      // 2. Знаходимо саме ту процедуру з усіма її компонентами, які вже є на фронті
      const targetItem = currentItems.find((item: any) => item.service_id === serviceId);
      if (!targetItem) {
        console.error('Item not found in state');
        return null;
      }
      // newQuantity здесь — это новое общее количество услуги (например, 1, 2, 3...)
      const newServiceQty = Number(qty);
      console.log('newServiceQty', newServiceQty);
      // Оновлюємо компоненти: множимо кількість кожного компонента на нове загальне quantity
      const updatedComponents = (targetItem.components || []).map((comp) => {
        // Берём неизменяемую базу на 1 единицу услуги (или вычисляем через initial/base_quantity)
        const baseQty = Number(comp.base_quantity ?? comp.quantity / (targetItem.quantity || 1));

        return {
          ...comp,
          base_quantity: baseQty, // сохраняем базу на будущее
          quantity: baseQty * newServiceQty, // умножаем базовую норму на новое количество услуги
        };
      });
      targetItem.components = updatedComponents;
      targetItem.quantity = newServiceQty;
      try {
        // 1. Делаем запрос на бэкенд с уже обновленными локально данными
        const response = await axios.post('/act/fifo-preview', {
          services: [targetItem],
        });
        const storeItems = response.data.items;

        const hasDeficit = storeItems.some((fifoItem) => fifoItem.shortage_qty > 0);

        if (hasDeficit) {
          console.log('deficit');
          // Збираємо деталі, чого саме не вистачає, щоб показати нормальне повідомлення
          const deficitsMap = storeItems
            .filter((i) => i.shortage_qty > 0)
            .reduce((acc, i) => {
              acc[i.material_id] = `треба ${i.required_qty}, є лише ${i.available_qty}`;
              return acc;
            }, {});

          // «Іди в сраку» валідація спрацювала — кидаємо помилку або alert, стейт НЕ оновлюємо!
          dispatch(setupActStoreErrorAction(deficitsMap));
          return; // Виходимо, нічого в Redux не диспачимо!
        } else {
          dispatch(setupActStoreErrorAction([]));
        }

        //         dispatch(syncAndRecalculateAct(targetItem.components, response.data.items));
      } catch (error) {
        console.error('Error updating service on backend, rolling back...', error);
        // 3. Если ошибка — редюсер не обновляем, стейт откатывается (остается старым)
        throw error;
      }
    } catch (error) {
      console.error('Error fetching service items', error);
      return null;
    }
  }
);

export const syncAndRecalculateAct: any = createAction(
  'act/UPDATE_SERVICE_QUANTITY_OLD',
  async (actItems: any, storeItems: any) => async (dispatch: any) => {
    console.log('actItems', actItems);
    console.log('storeItems', storeItems);
    const shortages = storeItems.filter((item) => item.shortage_qty > 0);

    if (shortages.length > 0) {
      console.warn('Увага! Виявлено дефіцит матеріалів на складі:', shortages);
      // Тут можна передати прапорець або масив дефіцитів у стейт,
      // щоб UI міг вивести красиве повідомлення
    }
  }
);

export const syncAndRecalculateActOld = createAction(
  'act/SYNC_AND_RECALCULATE_OLD',
  async ({ actItems, storeItems }, { rejectWithValue }) => {
    try {
      // 1. Формуємо масив services для бекенду (якщо передали один елемент, загортаємо в масив)
      const itemsArray = Array.isArray(actItems) ? actItems : [actItems];
      console.log('itemsArray', itemsArray);
      const servicesForFifo = itemsArray.map((item) => ({
        service_id: Number(item.service_id),
        quantity: Number(item.quantity),
        components: (item.components || []).map((comp) => ({
          material_id: Number(comp.material_id),
          quantity: Number(comp.quantity),
        })),
      }));

      // 2. Робимо запит на бєкенд
      const response = await axios.post('/act/fifo-preview', {
        services: servicesForFifo,
      });

      // 3. Повертаємо дані для редюсера (і актуальні рядки, і відповідь від сервера)
      return {
        actItems: itemsArray,
        fifoData: response.data.items, // або response.data.item залежно від того, що повертає бэк
        storeItems: storeItems || null,
      };
    } catch (error) {
      console.error('Помилка при синхронізації FIFO:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateServiceQuantityActionOld = createAction(
  'act/UPDATE_SERVICE_QUANTITY_OLD',
  async ({ serviceId, newQuantity }, { dispatch, getState }) => {
    // 1. Беремо актуальний стейт з Redux (ніяких зайвих запитів на сервер!)
    const state = getState();
    const currentItems = state.act.actItems; // або ваш шлях до стейту
    // 2. Знаходимо потрібний рядок/процедуру за service_id
    const targetItem = currentItems.find((item) => item.service_id === serviceId);
    if (!targetItem) return;

    try {
      // 3. Відправляємо на бекенд нові дані (або сам ітем із новим quantity)
      const response = await axios.post('/service/updateActItemQuantity', {
        serviceId,
        quantity: newQuantity,
        // можемо передати інші дані, якщо бекенду вони потрібні для перерахунку
      });

      // 4. Якщо сервер відповів успішно (все гуд):
      // Оновлюємо стейт у редюсері (або даними з бекенда, або локально перерахованими)
      // Наприклад, якщо бекенд повертає оновлений масив або оновлений рядок:
      dispatch(setActItems(response.data.items));

      return response.data;
    } catch (error) {
      console.error('Помилка при оновленні на бекенді', error);

      // 5. Якщо є помилка — нічого в стейті не міняємо, а виводимо повідомлення
      // dispatch(showErrorNotification('Не вдалося оновити кількість'));

      return null;
    }
  }
);
