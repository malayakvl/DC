import PrimaryButton from '../../../Components/Form/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AddDynamicInputFields, { emptyRow } from './Row';

const normaliseRow = (row) => {
  const quantity = Number(row.quantity ?? row.qty ?? 1);
  return {
    product_id: row.product_id || row.service_id || '',
    product: row.product || '',
    quantity,
    price: Number(row.price || 0),
    total: Number(row.total || 0),
    // Values saved in an existing act are totals. Convert them to a norm for
    // one service so changing the service quantity remains reversible.
    components: (Array.isArray(row.components) ? row.components : []).map((component) => ({
      ...component,
      base_quantity: Number(component.base_quantity ?? (Number(component.quantity || 0) / Math.max(quantity, 1))),
    })),
  };
};

const withBaseQuantities = (components) => (components || []).map((component) => ({
  ...component,
  base_quantity: Number(component.quantity || 0),
}));

export default function Form({ clinicData, statusData = [], patientsData = [], customerData = [], visitsData = [], formData, formRowData = [] }) {
  const [values, setValues] = useState({
    act_number: formData.act_number || '', act_date: formData.act_date || '', clinic_id: clinicData.id,
    patient_id: formData.patient_id || '', doctor_id: formData.doctor_id || '', status: formData.status || 'draft', visit_id: formData.visit_id || '',
  });
  const [rows, setRows] = useState((formRowData || []).length ? formRowData.map(normaliseRow) : [emptyRow()]);
  const [loadingVisit, setLoadingVisit] = useState(false);
  const [fifo, setFifo] = useState({});
  const [fifoError, setFifoError] = useState('');
  const fifoRequestId = useRef(0);

  const changeValue = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  const makeRowsFromVisit = async (visit) => {
    const services = Array.isArray(visit.services) ? visit.services : [];
    const serviceRows = await Promise.all(services.map(async (service) => {
      const id = service.id || service.service_id;
      if (!id) return null;
      const response = await axios.post('/service/findServiceItems', { serviceId: id });
      const quantity = Number(service.qty ?? service.quantity ?? 1);
      const price = Number(service.price ?? 0);
      return { product_id: id, product: service.name || '', quantity, price, total: Number((quantity * price).toFixed(2)), components: withBaseQuantities(response.data.items) };
    }));
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
      setValues((current) => ({ ...current, visit_id: visitId, patient_id: visit.patient_id || '', doctor_id: visit.doctor_id || '', act_date: `${visit.event_date || ''} ${visit.event_time_from || ''}`.trim() }));
    } finally {
      setLoadingVisit(false);
    }
  };

  useEffect(() => {
    if (formData.visit_id && !formRowData.length) {
      const visit = visitsData.find((item) => String(item.id) === String(formData.visit_id));
      if (visit) makeRowsFromVisit(visit).then((visitRows) => setRows(visitRows.length ? visitRows : [emptyRow()]));
    }
  }, []);

  useEffect(() => {
    const materials = rows.flatMap((row, rowIndex) => (row.components || [])
      .filter((component) => component.material_id || component.product_id)
      .map((component, componentIndex) => ({
        key: `${rowIndex}:${componentIndex}`,
        material_id: Number(component.material_id || component.product_id),
        // The component quantity is the norm for one service; the act quantity
        // changes the FIFO demand and its cost proportionally.
        fact_qty: Number(component.base_quantity || 0) * Number(row.quantity || 0),
      }))
    ).filter((item) => item.material_id && item.fact_qty > 0);

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
        setFifo(Object.fromEntries((response.data.items || []).map((item) => [item.key, item])));
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
    const payload = { ...values, rows: validRows.map((row) => ({ ...row, quantity: Number(row.quantity), price: Number(row.price), total: Number(row.total), components: (row.components || []).map((component) => ({ material_id: component.material_id || component.product_id, unit_id: component.unit_id, quantity: Number(component.base_quantity || 0) * Number(row.quantity || 0) })) })) };
    router.post(formData.id ? `/act/update?id=${formData.id}` : '/act/update', payload);
  };

  return <section className="w-full">
    <header><h2><Link className="icon-back" href="/acts">&nbsp;</Link>{formData.id ? 'Редагування акта' : 'Новий акт'}</h2></header>
    <form onSubmit={submit} className="mt-0 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label>Номер акта<input required name="act_number" className="input-text" value={values.act_number} onChange={changeValue} /></label>
        <label>Дата<input required name="act_date" className="input-text" type="datetime-local" value={(values.act_date || '').replace(' ', 'T').slice(0, 16)} onChange={changeValue} /></label>
        <label>Статус<select required name="status" className="input-text" value={values.status} onChange={changeValue}>{statusData.map((item) => <option key={item.id || item.name} value={item.id || item.name}>{item.name}</option>)}</select></label>
        <label>Візит <span className="text-xs text-gray-500">(необов'язково)</span><select name="visit_id" className="input-text" value={values.visit_id} onChange={chooseVisit}><option value="">Створити вручну</option>{visitsData.map((visit) => <option key={visit.id} value={visit.id}>{visit.name}</option>)}</select></label>
        <label>Пацієнт<select required name="patient_id" className="input-text" value={values.patient_id} onChange={changeValue}><option value="">Оберіть пацієнта</option>{patientsData.map((patient) => <option key={patient.id} value={patient.id}>{patient.last_name} {patient.first_name}</option>)}</select></label>
        <label>Лікар<select name="doctor_id" className="input-text" value={values.doctor_id} onChange={changeValue}><option value="">Оберіть лікаря</option>{customerData.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.last_name} {doctor.first_name}</option>)}</select></label>
      </div>
      {loadingVisit && <div className="text-sm text-gray-500">Завантажуємо матеріали процедур…</div>}
      {fifoError && <div className="text-sm text-red-600">{fifoError}</div>}
      <div className="relative"><table className="w-full invoice-table act-table"><thead><tr><th className="pb-3">Послуга</th><th className="pb-3 w-qty">К-сть</th><th className="pb-3 w-price">Ціна</th><th className="pb-3 w-price">Сума</th><th className="pb-3 w-btn" /><th className="pb-3 w-btn" /></tr></thead><tbody><AddDynamicInputFields rows={rows} onChange={setRows} fifo={fifo} /></tbody></table></div>
      <div className="text-right"><Link className="btn-back" href="/acts">Назад</Link><PrimaryButton disabled={loadingVisit}>Зберегти</PrimaryButton></div>
    </form>
  </section>;
}
