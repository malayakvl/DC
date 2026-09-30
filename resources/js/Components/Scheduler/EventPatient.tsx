import React, { useEffect, useState } from 'react';
import Lang from 'lang.js';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import lngScheduler from '../../Lang/Scheduler/translation';
import { findPatientsAction } from '@/Redux/Scheduler/actions';
import { patientsDataSelector } from '@/Redux/Scheduler/selectors';
import { setSchedulePatientIdAction } from '@/Redux/Scheduler';
import { UserPlus, Mail, Phone, User } from 'lucide-react';

export default function EventPatient({ editPatientData = null }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngScheduler,
    locale: appLang,
  });
  const patientsData = useSelector(patientsDataSelector);
  const [addPatient, setAddPatient] = useState(false);
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    patient: '',
    patientExistId: null,
  });
  const [showPatientsList, setShowPatientsList] = useState(false);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setPatientData((values) => ({
      ...values,
      [key]: value,
    }));
    console.log(1);
    // find clinic patients
    if (value.length > 3) {
      dispatch(findPatientsAction(value) as any);
    }
  };

  const renderPatientsList = () => {
    if (patientsData.length === 0 || !showPatientsList) {
      return null;
    }

    return (
      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
        {patientsData.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition border-b border-slate-100 last:border-none"
            onClick={() => {
              setShowPatientsList(false);
              setPatientData((prev) => ({
                ...prev,
                patient: `${patient.last_name} ${patient.first_name}`, // ФИО для отображения
                patientExistId: patient.patient_id, // ID пациента для бэка
                primaryPhone: patient.primary_phone || '', // Телефон
                medicalCardNo: patient.medical_card_no || '', // Номер медкартки
                discount: patient.discount || 0, // Скидка
                balance: patient.balance || 0, // Баланс
                gender: patient.gender || '', // Пол
                birthday: patient.birthday || '', // День рождения
                importantInfo: patient.important_info || '', // Важная инфа (аллергии и т.д.)
                phone: patient.primary_phone,
                first_name: patient.first_name,
                last_name: patient.last_name,
                registered_at: patient.registered_at,
                lastVisit: patient.last_visit,
              }));
              dispatch(setSchedulePatientIdAction(patient.patient_id));
            }}
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
              {patient.last_name[0]}
              {patient.first_name[0]}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {patient.last_name} {patient.first_name}
              </div>
              <div className="text-xs text-slate-500">{patient.primaryPhone || 'Без телефону'}</div>
            </div>

            <svg
              className="text-slate-400 ml-2 shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setShowPatientsList(true);
  }, [patientsData]);

  return (
    <div className="relative">
      <div className="mb-0">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          {msg.get('scheduler.patient')} <span className="text-red-500">*</span>
        </label>

        {/* Главное поле поиска пациента */}
        <div className="max-h-[50px] flex items-center w-full px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all shadow-sm relative">
          <span className="material-symbols-outlined text-teal-700 text-[20px] mr-2.5 shrink-0">
            person_search
          </span>

          <input
            className="input-calendar w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
            id="patient"
            placeholder="Введіть ПІБ, телефон або номер картки пацієнта..."
            type="text"
            value={patientData.patient || editPatientData?.patient || ''}
            onChange={handleChange}
            autoComplete="off"
          />

          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            {patientData.patientExistId && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-800 shadow-2xs">
                <span className="material-symbols-outlined text-[14px] text-teal-700">
                  clinical_notes
                </span>
                {patientData.medicalCardNo}
              </span>
            )}

            {!patientData.patientExistId && (
              <button
                onClick={() => setAddPatient(!addPatient)}
                className="px-2.5 py-1.5 hover:bg-teal-50 rounded-lg text-teal-700 transition flex items-center gap-1.5 text-xs font-medium shrink-0 border border-teal-200/60 bg-white shadow-xs"
                type="button"
                title={msg.get('scheduler.add.patient')}
              >
                <UserPlus className="w-[16px] h-[16px]" />
                <span className="hidden sm:inline">Створити нову картку</span>
              </button>
            )}
          </div>
        </div>

        {/* Выпадающий список найденных пациентов */}
        {renderPatientsList()}
      </div>
      {patientData.patientExistId && (
        <div className="mt-4 space-y-3 animate-fadeIn">
          <div className="mt-2.5 p-3 bg-[#f2f3ff] border border-slate-200/60 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                {patientData?.first_name[0]}
                {patientData?.last_name[0]}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-0">
                <span className="font-semibold text-slate-900">
                  {patientData?.primaryPhone || 'Без телефону'}
                </span>
                <span className="mx-1.5 text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-500">Останній візит: {patientData.lastVisit}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {/* Важная информация (аллергии и т.д.) с иконкой warning и акцентным цветом */}
              {patientData.importantInfo && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-amber-600">
                    warning
                  </span>
                  {patientData.importantInfo}
                </span>
              )}

              {/* Баланс */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold shadow-2xs ${
                  Number(patientData.balance) < 0
                    ? 'bg-rose-50 border-rose-200 text-rose-700' // Боржник
                    : Number(patientData.balance) > 0
                      ? 'bg-sky-50 border-sky-200 text-sky-700' // Переплата
                      : 'bg-teal-50 border-teal-100 text-teal-850' // Повний розрахунок (0)
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {Number(patientData.balance) < 0 ? 'account_balance_wallet' : 'check_circle'}
                </span>
                Баланс: {patientData.balance} ₴
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Красивая выпадающая форма добавления нового пациента в стиле общего дизайна */}
      {addPatient && (
        <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-700 text-[18px]">
                person_add
              </span>
              {msg.get('scheduler.add.patient')}
            </h2>
            <button
              type="button"
              onClick={() => setAddPatient(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-medium"
            >
              Скасувати
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Ім'я */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                {msg.get('scheduler.form.firstName')} <span className="text-red-500">*</span>
              </label>
              <div className="max-h-[46px] flex items-center w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <User className="w-4 h-4 text-teal-700 mr-2 shrink-0" />
                <input
                  className="w-full input-gray bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none"
                  id="firstName"
                  type="text"
                  placeholder="Ім'я"
                  value={patientData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Прізвище */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                {msg.get('scheduler.form.lastName')} <span className="text-red-500">*</span>
              </label>
              <div className="max-h-[46px] flex items-center w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <User className="w-4 h-4 text-teal-700 mr-2 shrink-0" />
                <input
                  className="w-full input-gray bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none"
                  id="lastName"
                  type="text"
                  placeholder="Прізвище"
                  value={patientData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                {msg.get('scheduler.form.email')}
              </label>
              <div className="max-h-[46px] flex items-center w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <Mail className="w-4 h-4 text-teal-700 mr-2 shrink-0" />
                <input
                  className="w-full input-gray bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={patientData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                {msg.get('scheduler.form.phone')} <span className="text-red-500">*</span>
              </label>
              <div className="max-h-[46px] flex items-center w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <Phone className="w-4 h-4 text-teal-700 mr-2 shrink-0" />
                <input
                  className="w-full input-gray bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-none"
                  id="phone"
                  type="text"
                  placeholder="+380 (...)"
                  value={patientData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
