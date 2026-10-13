import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngAct from '../../../Lang/Act/translation';
import lngInvoiceIncoming from '../../../Lang/InvoiceIncoming/translation';
import InputText from '../../../Components/Form/InputText';
import InputSelect from '../../../Components/Form/InputSelect';
import InputCalendar from '../../../Components/Form/InputCalendar';
import InputCustomerSelect from '../../../Components/Form/InputCustomerSelect';
import AddDynamicInputFields, { emptyRow } from './Row';
import FormHeader from '../../../Components/Common/FormHeader';
import StickyFormFooter from '../../../Components/Common/StickyFormFooter';
import { findActItemsAction } from '../../../Redux/Act';
import axios from 'axios';

const normaliseRow = (row: any) => {
  const quantity = Number(row.quantity ?? row.qty ?? 1);
  const rawPrice = Number(row.price || row.base_price || 0);

  const rawComponents = Array.isArray(row.components) ? row.components : [];
  const groupedMap = new Map();

  rawComponents.forEach((component: any) => {
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

const withBaseQuantities = (components: any, serviceQuantity = 1) => {
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

export default function Form({
  clinicData,
  statusData = [],
  patientsData = [],
  customerData = [],
  visitsData = [],
  formData,
  formRowData = [],
}: {
  clinicData: any;
  statusData: any[];
  patientsData: any[];
  customerData: any[];
  visitsData: any[];
  formData: any;
  formRowData: any[];
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: { ...lngInvoiceIncoming, ...lngAct },
    locale: appLang,
  });

  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Record<string, any>>({
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
  const [fifo] = useState({});
  const [fifoError] = useState('');
  const { processing, recentlySuccessful } = useForm();

  const changeValue = (event: any) => {
    const key = event.target.id || event.target.name;
    const value = event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleChangeSelect = (e: any) => {
    const key = e.target.id || e.target.name;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleChangeCalendar = (date: any) => {
    setValues((current) => ({ ...current, act_date: date }));
  };

  const makeRowsFromVisit = async (visit: any) => {
    const services = Array.isArray(visit.services) ? visit.services : [];
    const serviceRows = await Promise.all(
      services.map(async (service: any) => {
        const id = service.id || service.service_id;
        if (!id) return null;

        dispatch(findActItemsAction(service));
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
          components: withBaseQuantities(response.data.items, quantity),
        };
      })
    );
    return serviceRows.filter(Boolean);
  };

  useEffect(() => {
    if (formData.visit_id && !formRowData.length) {
      const visit = visitsData.find((item) => String(item.id) === String(formData.visit_id));
      if (visit) {
        setLoadingVisit(true);
        makeRowsFromVisit(visit)
          .then((visitRows) =>
            setRows(visitRows.length ? visitRows.map(normaliseRow) : [emptyRow()])
          )
          .finally(() => setLoadingVisit(false));
      }
    }
  }, []);

  // const submitOld = (event: any) => {
  //   event.preventDefault();
  //   const validRows = rows.filter((row) => row.product_id);
  //   if (!values.patient_id || !validRows.length) return;
  //
  //   const payload = {
  //     ...values,
  //     rows: validRows.map((row) => ({
  //       ...row,
  //       quantity: Number(row.quantity),
  //       price: Number(row.price),
  //       total: Number(row.total),
  //       components: (row.components || []).map((component) => ({
  //         material_id: component.material_id || component.product_id,
  //         unit_id: component.unit_id,
  //         quantity: Number(row.quantity || 0),
  //       })),
  //     })),
  //   };
  //
  //   console.log(payload);
  // };

  const submit = (event: any) => {
    event.preventDefault();
    const validRows = rows.filter((row) => row.product_id);
    if (!values.patient_id || !validRows.length) return;

    const payload = {
      ...values,
      rows: validRows.map((row) => {
        const rowQty = Number(row.quantity) || 1;

        return {
          ...row,
          quantity: rowQty,
          price: Number(row.price),
          total: Number(row.total),
          components: (row.components || []).map((component) => {
            // Норма компонента на 1 шт услуги * количество услуг в строке
            const baseComponentQty = Number(component.quantity || 0);

            return {
              material_id: component.material_id || component.product_id,
              unit_id: component.unit_id,
              quantity: baseComponentQty * rowQty, // Умножаем на количество услуг!
            };
          }),
        };
      }),
    };

    // Отправка на бэкенд (например, через Inertia или axios)
    if (!formData.id) {
      router.post(`/act/update`, {
        payload,
      });
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-3 mt-2">
        <FormHeader
          title={formData?.id ? msg.get('act.title.edit') : msg.get('act.title.create')}
          description={msg.get('act.title.description')}
          backUrl="/acts"
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
                name="act_number"
                values={values}
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
              <InputSelect
                translatable={true}
                name={'status'}
                values={values}
                value={values.status}
                options={statusData}
                onChange={handleChangeSelect}
                required
                className="filter-select-bordered w-full"
                label={msg.get('invoice_incoming.status')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputSelect
                translatable={false}
                name={'visit_id'}
                values={values}
                value={values.visit_id}
                options={visitsData}
                onChange={handleChangeSelect}
                required
                className="filter-select-bordered w-full"
                label={msg.get('act.visit')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputCustomerSelect
                name={'patient_id'}
                values={values}
                value={values.patient_id}
                options={patientsData}
                onChange={handleChangeSelect}
                required
                className="filter-select-bordered w-full"
                label={msg.get('act.patient')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputCustomerSelect
                name={'doctor_id'}
                className="filter-select-bordered w-full"
                values={values}
                value={values.doctor_id}
                options={customerData}
                onChange={handleChangeSelect}
                required
                label={msg.get('invoice_incoming.person')}
              />
            </div>
          </div>
        </div>

        {loadingVisit && (
          <div className="text-sm text-teal-600 font-medium px-2">
            {msg.get('act.load.data.visits')}
          </div>
        )}
        {fifoError && <div className="text-sm text-red-600 px-2">{fifoError}</div>}

        {/* Таблиця послуг/товарів */}
        <div className="relative rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3">
                    {msg.get('act.service')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-qty text-center">
                    {msg.get('act.qty')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-price text-center">
                    {msg.get('act.price')}
                  </th>
                  <th className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-3 w-price text-center">
                    {msg.get('act.total')}
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
          onSave={undefined}
        />
      </form>
    </section>
  );
}
