import { Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import InputCalendar from '../../../Components/Form/InputCalendar';
import AddDynamicInputFields, { emptyRow } from './Row';
import PrimaryButton from '../../../Components/Form/PrimaryButton';
import FormHeader from '../../../Components/Common/FormHeader';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import axios from 'axios';

const normaliseRow = (row) => {
  const quantity = Number(row.quantity ?? row.qty ?? 1);
  return {
    product_id: row.product_id || row.service_id || '',
    product: row.product || '',
    quantity,
    price: Number(row.price || 0),
    base_price: Number(row.base_price ?? row.price ?? 0),
    total: Number(row.total || 0),
    components: (Array.isArray(row.components) ? row.components : []).map((component) => ({
      ...component,
      base_quantity: Number(
        component.base_quantity ?? Number(component.quantity || 0) / Math.max(quantity, 1)
      ),
    })),
  };
};

const withBaseQuantities = (components) =>
  (components || []).map((component) => ({
    ...component,
    base_quantity: Number(component.quantity || 0),
  }));

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
  const dispatch = useAppDispatch();
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
        const price = Number(service.price ?? 0);
        return {
          product_id: id,
          product: service.name || '',
          quantity,
          price,
          base_price: price,
          total: Number((quantity * price).toFixed(2)),
          components: withBaseQuantities(response.data.items),
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
      setRows(visitRows.length ? visitRows : [emptyRow()]);
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
          setRows(visitRows.length ? visitRows : [emptyRow()])
        );
    }
  }, []);

  useEffect(() => {
    const materials = rows
      ?.flatMap((row, rowIndex) =>
        (row.components || [])
          .filter((component) => component.material_id || component.product_id)
          .map((component, componentIndex) => ({
            key: `${rowIndex}:${componentIndex}`,
            material_id: Number(component.material_id || component.product_id),
            fact_qty: Number(component.base_quantity || 0) * Number(row.quantity || 0),
          }))
      )
      .filter((item) => item.material_id && item.fact_qty > 0);

    if (!materials.length) {
      setFifo({});
      setFifoError('');
      return;
    }

    const request = window.setTimeout(async () => {
      const currentRequestId = ++fifoRequestId.current;
      try {
        const response = await axios.post('/act/fifo-preview', { materials });
        if (currentRequestId !== fifoRequestId.current) return;
        const fifoByComponent = Object.fromEntries(
          (response.data.items || []).map((item) => [item.key, item])
        );
        setFifo(fifoByComponent);
        setRows((currentRows) => {
          let changed = false;
          const nextRows = currentRows.map((row, rowIndex) => {
            const quantity = Math.max(Number(row.quantity || 0), 1);
            const materialPrice = (row.components || []).reduce(
              (sum, component, componentIndex) => {
                const cost = Number(fifoByComponent[`${rowIndex}:${componentIndex}`]?.cost || 0);
                const markup = Number(component.mark_up || 0);
                return sum + cost * (1 + markup / 100);
              },
              0
            );
            const total = Number(
              (Number(row.base_price ?? row.price ?? 0) * quantity + materialPrice).toFixed(2)
            );
            const price = Number((total / quantity).toFixed(2));
            if (price === Number(row.price || 0) && total === Number(row.total || 0)) return row;
            changed = true;
            return { ...row, price, total };
          });
          return changed ? nextRows : currentRows;
        });
        setFifoError('');
      } catch (error) {
        if (currentRequestId !== fifoRequestId.current) return;
        setFifo({});
        setFifoError(error.response?.data?.error || 'Не вдалося розрахувати FIFO-собівартість');
      }
    }, 250);

    return () => window.clearTimeout(request);
  }, [rows]);

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
          title={formData?.id ? 'Редагування акта' : 'Новий акт'}
          description="Заповніть реквізити акта та виберіть послуги"
          backUrl="/acts"
          processing={processing}
          saveText="Зберегти зміни"
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
              <h2 className="text-base font-semibold text-gray-900">
                Реквізити акта та пацієнт
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Номер акта */}
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

            {/* Дата */}
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

            {/* Статус */}
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
                  {statusData.map((item) => (
                    <option key={item.id || item.name} value={item.id || item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Візит */}
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
                  <option value="">Створити вручну</option>
                  {visitsData.map((visit) => (
                    <option key={visit.id} value={visit.id}>
                      {visit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Пацієнт */}
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
                  <option value="">Оберіть пацієнта</option>
                  {patientsData.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.last_name} {patient.first_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Лікар */}
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Лікар</label>
                <select
                  name="doctor_id"
                  value={values.doctor_id}
                  onChange={changeValue}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="">Оберіть лікаря</option>
                  {customerData.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.last_name} {doctor.first_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loadingVisit && (
          <div className="text-sm text-teal-600 font-medium px-2">Завантажуємо матеріали процедур…</div>
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

        {/* Закріплений футер збереження */}
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