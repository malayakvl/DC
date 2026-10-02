import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import InputText from '../../../Components/Form/InputText';
import InputCalendar from '../../../Components/Form/InputCalendar';
import AddDynamicInputFields, { emptyRow } from './Row';
import FormHeader from '../../../Components/Common/FormHeader';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import axios from 'axios';

const normaliseRow = (row) => {
  const quantity = Number(row.quantity ?? row.qty ?? 1);
  const rawPrice = Number(row.price || row.base_price || 0);

  const rawComponents = Array.isArray(row.components) ? row.components : [];
  const groupedMap = new Map();

  rawComponents.forEach((component) => {
    const mId = component.material_id || component.product_id || component.id;

    let compQty = Number(component.base_quantity);
    if (isNaN(compQty)) {
      const totalCompQty = Number(component.quantity || 0);
      compQty = totalCompQty / Math.max(quantity, 1);
    }

    if (mId) {
      if (groupedMap.has(mId)) {
        groupedMap.get(mId).base_quantity += compQty;
      } else {
        groupedMap.set(mId, {
          ...component,
          material_id: mId,
          base_quantity: compQty,
        });
      }
    }
  });

  return {
    product_id: row.product_id || row.service_id || '',
    product: row.product || '',
    quantity,
    price: rawPrice,
    base_price: rawPrice,
    total: Number(row.total || quantity * rawPrice),
    components: Array.from(groupedMap.values()),
  };
};

const withBaseQuantities = (components, serviceQuantity = 1) => {
  const groupedMap = new Map();
  (components || []).forEach((component) => {
    const mId = component.material_id || component.product_id || component.id;

    // Всегда вытаскиваем чистую базу: если бэкенд прислал общую сумму, делим на количество услуги
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

export default function Form({
  clinicData,
  statusData = [],
  patientsData = [],
  customerData = [],
  visitsData = [],
  formData,
  formRowData = [],
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: { ...lngInvoiceIncoming, ...lngAct },
    locale: appLang,
  });

  const [values, setValues] = useState({
    act_number: formData.act_number || '',
    act_date: formData.act_date || '',
    clinic_id: clinicData.id,
    patient_id: formData.patient_id || '',
    doctor_id: formData.doctor_id || '',
    status: formData.status || 'draft',
    visit_id: formData.visit_id || '',
  });

  const [rows, setRows] = useState(
    (formRowData || []).length ? formRowData.map(normaliseRow) : [emptyRow()]
  );
  const [loadingVisit, setLoadingVisit] = useState(false);
  const [fifo, setFifo] = useState({});
  const [fifoError, setFifoError] = useState('');
  const fifoRequestId = useRef(0);
  const { processing, recentlySuccessful } = useForm();

  const changeValue = (event) => {
    const key = event.target.id || event.target.name;
    const value = event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleChangeCalendar = (date) => {
    setValues((current) => ({ ...current, act_date: date }));
  };

  const makeRowsFromVisit = async (visit) => {
    const services = Array.isArray(visit.services) ? visit.services : [];
    const serviceRows = await Promise.all(
      services.map(async (service) => {
        const id = service.id || service.service_id;
        if (!id) return null;
        const response = await axios.post('/service/findServiceItems', { serviceId: id });
        const quantity = Number(service.qty ?? service.quantity ?? 1);
        const servicePrice = Number(service.price ?? 150);
        return {
          product_id: id,
          product: service.name || '',
          quantity,
          price: servicePrice,
          base_price: servicePrice,
          total: Number((quantity * servicePrice).toFixed(2)),
          // Передаем количество услуги в функцию, чтобы база честно разделилась
          components: withBaseQuantities(response.data.items, quantity),
        };
      })
    );
    return serviceRows.filter(Boolean);
  };

  const chooseVisit = async (event) => {
    const visitId = event.target.value;
    setValues((current) => ({ ...current, visit_id: visitId }));
    if (!visitId) return;
    const visit = visitsData.find((item) => String(item.id) === String(visitId));
    if (!visit) return;
    setLoadingVisit(true);
    try {
      const visitRows = await makeRowsFromVisit(visit);
      setRows(visitRows.length ? visitRows.map(normaliseRow) : [emptyRow()]);
      setValues((current) => ({
        ...current,
        visit_id: visitId,
        patient_id: visit.patient_id || '',
        doctor_id: visit.doctor_id || '',
        act_date: `${visit.event_date || ''} ${visit.event_time_from || ''}`.trim(),
      }));
    } finally {
      setLoadingVisit(false);
    }
  };

  useEffect(() => {
    if (formData.visit_id && !formRowData.length) {
      const visit = visitsData.find((item) => String(item.id) === String(formData.visit_id));
      if (visit)
        makeRowsFromVisit(visit).then((visitRows) =>
          setRows(visitRows.length ? visitRows.map(normaliseRow) : [emptyRow()])
        );
    }
  }, []);

  // Автоматично додаємо собівартість матеріалів до базової ціни послуги
  useEffect(() => {
    if (!Object.keys(fifo).length) return;

    setRows((currentRows) =>
      currentRows.map((row, rowIndex) => {
        const rowTotalCost = (row.components || []).reduce((sum, _, compIndex) => {
          const fifoItem = fifo[`${rowIndex}:${compIndex}`];
          const batchSum = (fifoItem?.batches || []).reduce(
            (acc, b) => acc + Number(b.total || b.quantity * b.price_per_unit || 0),
            0
          );
          return sum + (batchSum > 0 ? batchSum : Number(fifoItem?.cost || 0));
        }, 0);

        const basePrice = Number(row.base_price || 150);
        const finalPrice = Number((basePrice + rowTotalCost).toFixed(2));

        if (row.price !== finalPrice) {
          return {
            ...row,
            price: finalPrice,
            total: Number((row.quantity * finalPrice).toFixed(2)),
          };
        }
        return row;
      })
    );
  }, [fifo]);

  // Единый стабильный эффект для запроса FIFO-превью без зацикливания
  useEffect(() => {
    // Собираем список услуг из акта для отправки на бэкенд
    const services = rows
      .map((row, rowIndex) => {
        const serviceId = Number(row.product_id || row.service_id);
        const quantity = Number(row.quantity || row.qty || 1);

        if (!serviceId) return null;

        return {
          key: String(rowIndex),
          service_id: serviceId,
          quantity: quantity,
        };
      })
      .filter(Boolean);

    if (!services.length) {
      setFifo({});
      setFifoError('');
      return;
    }

    const currentRequestId = ++fifoRequestId.current;
    const timer = window.setTimeout(async () => {
      try {
        // Отправляем список услуг, а не сырые материалы!
        const response = await axios.post('/act/fifo-preview', { services });
        if (currentRequestId !== fifoRequestId.current) return;

        const fifoByComponent = Object.fromEntries(
          (response.data.items || []).map((item) => [item.key, item])
        );
        setFifo(fifoByComponent);
        setFifoError('');
      } catch (error) {
        if (currentRequestId !== fifoRequestId.current) return;
        setFifo({});
        setFifoError(error.response?.data?.error || 'Не вдалося розрахувати FIFO-собівартість');
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [
    JSON.stringify(
      rows.map((r) => ({
        id: r.product_id || r.service_id,
        q: r.quantity,
      }))
    ),
  ]);

  const submit = (event) => {
    event.preventDefault();
    const validRows = rows.filter((row) => row.product_id);
    if (!values.patient_id || !validRows.length) return;

    const payload = {
      ...values,
      rows: validRows.map((row) => ({
        ...row,
        quantity: Number(row.quantity),
        price: Number(row.price),
        total: Number(row.total),
        components: (row.components || []).map((component) => ({
          material_id: component.material_id || component.product_id,
          unit_id: component.unit_id,
          quantity: Number(component.base_quantity || 0) * Number(row.quantity || 0),
        })),
      })),
    };
    router.post(formData.id ? `/act/update?id=${formData.id}` : '/act/update', payload);
  };

  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('act.title.edit') : msg.get('act.title.create')}
          description={msg.get('act.title.description')}
          backUrl="/acts"
          processing={processing}
          saveText={msg.get('act.save')}
        />
      </div>

      <form onSubmit={submit} className="space-y-4 py-6" encType="multipart/form-data">
        {/* Картка реквізитів */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-600 text-[20px]">
                description
              </span>
              <h2 className="text-base font-semibold text-gray-900">Реквізити акта та пацієнт</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <InputText
                required
                name="act_number"
                values={values}
                value={values.act_number}
                onChange={changeValue}
                label="Номер акта"
                className="filter-select-bordered w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputCalendar
                name="act_date"
                values={values}
                dataValue={values.act_date}
                value={values.act_date}
                onChange={handleChangeCalendar}
                required
                label="Дата та час"
                className="filter-select-bordered w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Статус</label>
                <select
                  required
                  name="status"
                  value={values.status}
                  onChange={changeValue}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
                >
                  {statusData.map((item, index) => (
                    <option
                      key={`status-${item.id || item.name}-${index}`}
                      value={item.id || item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">
                  Візит <span className="text-gray-400">(необов&#39;язково)</span>
                </label>
                <select
                  name="visit_id"
                  value={values.visit_id}
                  onChange={chooseVisit}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option key={`$visit-empty`} value="">
                    Створити вручну
                  </option>
                  {visitsData.map((visit, index) => (
                    <option key={`$visit-${visit.id}-${index}`} value={visit.id}>
                      {visit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Пацієнт</label>
                <select
                  required
                  name="patient_id"
                  value={values.patient_id}
                  onChange={changeValue}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option key={`patient-empty`} value="">
                    Оберіть пацієнта
                  </option>
                  {patientsData.map((patient, index) => (
                    <option key={`patient-${patient.id}-${index}`} value={patient.id}>
                      {patient.last_name} {patient.first_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Лікар</label>
                <select
                  name="doctor_id"
                  value={values.doctor_id}
                  onChange={changeValue}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option key={`doctor-empty`} value="">
                    Оберіть лікаря
                  </option>
                  {customerData.map((doctor, index) => (
                    <option key={`doctor-${doctor.id}-${index}`} value={doctor.id}>
                      {doctor.last_name} {doctor.first_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loadingVisit && (
          <div className="text-sm text-teal-600 font-medium px-2">
            Завантажуємо матеріали процедур…
          </div>
        )}
        {fifoError && <div className="text-sm text-red-600 px-2">{fifoError}</div>}

        {/* Таблиця послуг/товарів */}
        <div className="relative rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                    Послуга
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-qty text-center">
                    К-сть
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-price text-center">
                    Ціна
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-price text-center">
                    Сума
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-btn" />
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-btn" />
                </tr>
              </thead>
              <tbody>
                <AddDynamicInputFields rows={rows} onChange={setRows} fifo={fifo} />
              </tbody>
            </table>
          </div>
        </div>

        <StickyFormFooter
          backUrl="/acts"
          backLabel="Повернутись"
          saveLabel="Зберегти"
          processingLabel="Збереження..."
          successMessage="Збережено успішно!"
          processing={processing}
          recentlySuccessful={recentlySuccessful}
        />
      </form>
    </section>
  );
}
