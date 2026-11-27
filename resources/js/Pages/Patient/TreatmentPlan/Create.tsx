import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';
import React from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Head, useForm } from '@inertiajs/react';
import { patientTabSelector } from '../../../Redux/Patient/selectors';
import StickyFormFooter from '@/Components/Common/StickyFormFooter';
import Details from '@/Pages/Patient/Partials/Details';

export default function Finances({
  typeTab,
  patientData,
  pDiscountValue,
  pServices,
  tree,
  clinicData,
  currency,
  scheduleId,
  actData,
  discountStatus,
}: {
  typeTab: any;
  patientData: any;
  pDiscountValue: any;
  pServices: any;
  tree: any;
  clinicData: any;
  currency: any;
  scheduleId: any;
  actData: any;
  discountStatus: any;
}) {
  const dispatch = useDispatch();
  const tab = useSelector(patientTabSelector);
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  const mainTabs = [
    { id: 'documents', label: msg.get('patient.tab.documents') },
    { id: 'visits', label: msg.get('patient.tab.visits') },
    { id: 'plans', label: msg.get('patient.tab.plans') },
    { id: 'history', label: msg.get('patient.tab.history') },
    { id: 'finances', label: msg.get('patient.tab.finances') },
  ];
  const genderLabel =
    patientData?.gender === 'female'
      ? 'Жінка'
      : patientData?.gender === 'male'
        ? 'Чоловік'
        : patientData?.gender || null;

  const demographics = [genderLabel, patientData?.age ? `${patientData.age} років` : null]
    .filter(Boolean)
    .join(', ');

  const { data, setData, processing, post, recentlySuccessful, progress, errors } = useForm({

  });
  const submit = (e: any) => {
    e.preventDefault();
    // router.post(`/patient/update-act`, {
    //   patient_id: patientData.id,
    //   services: initialServices,
    //   schedule_id: scheduleId,
    //   clinic_id: clinicData.id,
    //   discount: globalDiscount,
    //   discountType: globalDiscountType,
    //   total: calculateFullTotal(),
    //   total_with_discount: calculateTotal(),
    // });
  };

  // Применение массовой скидки
  return (
    <>
      <AuthenticatedLayout header={<Head />}>
        <Head title={msg.get('patient.title.list')} />
        <div className="py-0">
          <form>
            <div className="p-4 sm:p-4 mb-8 content-data bg-content">
              <Details patientData={patientData} clinicData={clinicData} showSubTab={false} />


              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold text-on-surface tracking-tight">
                      Створення нового плану лікування
                    </h1>
                  </div>
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    Новий протокол лікування
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 mt-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Базова інформація плану
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Поля з позначкою <span className="text-rose-500 font-bold">*</span> обов'язкові
                  </span>
                </div>
                {/*Назва плану лікування -->*/}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="block text-xs font-semibold text-slate-700"
                      htmlFor="plan-name-input"
                    >
                      Назва плану лікування <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <span className="text-xs font-mono text-slate-500" id="char-counter">
                      63 / 120
                    </span>
                  </div>
                  <input
                    className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg px-3.5 py-2.5 border border-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder:text-slate-400 transition"
                    id="plan-name-input"
                    placeholder="Вкажіть клінічну назву курсу лікування..."
                    type="text"
                    value="Комплексна реабілітація та підготовка до імплантації (2026)"
                  />
                  {/*Швидкі клінічні пресети назв -->*/}
                  <div className="pt-1.5 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Швидкі клінічні пресети назв:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium border border-slate-200 transition flex items-center gap-1.5"
                        onClick="applyPreset(this.innerText)"
                        type="button"
                      >
                        <span className="text-teal-600 font-bold">+</span> Комплексна реабілітація
                        (терапія + хірургія + ортопедія)
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium border border-slate-200 transition flex items-center gap-1.5"
                        onClick="applyPreset(this.innerText)"
                        type="button"
                      >
                        <span className="text-teal-600 font-bold">+</span> Тотальна санація та
                        підготовка
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium border border-slate-200 transition flex items-center gap-1.5"
                        onClick="applyPreset(this.innerText)"
                        type="button"
                      >
                        <span className="text-teal-600 font-bold">+</span> Ортодонтичне вирівнювання
                        елайнерами
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium border border-slate-200 transition flex items-center gap-1.5"
                        onClick="applyPreset(this.innerText)"
                        type="button"
                      >
                        <span className="text-teal-600 font-bold">+</span> Імплантація All-on-4 /
                        All-on-6
                      </button>
                    </div>
                  </div>
                </div>
                {/*Вибір типу плану лікування -->*/}
                <div className="pt-3 border-t border-slate-100">
                  <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                    Вибір типу та клінічного пріоритету плану:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="plan-type-group">
                    {/*Pla<!-- n A Card (Selected) -->*/}
                    <label className="relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border-2 border-teal-600 bg-teal-50/30 shadow-xs">
                      <input
                        checked=""
                        className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        name="plan_archetype"
                        type="radio"
                        value="plan_a"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            Оптимальний план (План А)
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-teal-100 text-teal-800">
                            Рекомендовано
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Рекомендований клінічний протокол, повне відновлення жувальної функції та
                          естетики відповідно до 3D-діагностики.
                        </p>
                      </div>
                    </label>
                    {/*Plan B Card -->*/}
                    <label className="relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-xs">
                      <input
                        className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        name="plan_archetype"
                        type="radio"
                        value="plan_b"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            Альтернативний план (План Б)
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-100 text-slate-600">
                            Компроміс
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Компромісний або поетапний варіант з оптимізацією первинного бюджету чи
                          відтермінуванням частини робіт.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Клінічні параметри та куратор
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/*Лікар-куратор -->*/}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Лікар-куратор <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg pl-10 pr-9 py-2.5 border border-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none cursor-pointer">
                        <option selected="">Д-р Громов С. В. (Хірург-імплантолог)</option>
                        <option>Д-р Шевченко О. М. (Стоматолог-терапевт)</option>
                        <option>Д-р Бондаренко І. К. (Ортопед-гнатолог)</option>
                        <option>Д-р Кравчук М. В. (Ортодонт)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">unfold_more</span>
                      </div>
                    </div>
                  </div>
                  {/*Орієнтовний термін реалізації -->*/}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Орієнтовний термін реалізації
                    </label>
                    <div className="relative">
                      <select className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg pl-10 pr-9 py-2.5 border border-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none cursor-pointer">
                        <option selected="">3–6 місяців (поетапно)</option>
                        <option>1–2 місяці (експрес-санація)</option>
                        <option>6–12 місяців (тотальна реабілітація)</option>
                        <option>Понад 1 рік (ортодонтія + імплантація)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <span className="material-symbols-outlined text-[20px]">
                          calendar_today
                        </span>
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">unfold_more</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Клінічні передумови (чекбокси) -->*/}
                <div className="pt-2 space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    Клінічні передумови та інтеграція даних:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/*Checkbox 1 -->*/}
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-teal-200 bg-teal-50/20 hover:bg-teal-50/40 cursor-pointer transition">
                      <input
                        checked=""
                        className="mt-0.5 h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                        type="checkbox"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-slate-900">
                            Синхронізувати з патологіями зубної формули
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                            #16, #48
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Автоматично прикріпити виявлені каріозні вогнища та дефекти зубного ряду
                        </p>
                      </div>
                    </label>
                    {/*Checkbox 2 -->*/}
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition">
                      <input
                        className="mt-0.5 h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                        type="checkbox"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-slate-900">
                            Прикріпити КТ-діагностику від 14.11.2026
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono font-medium">
                            3D DICOM
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Прив'язати зрізи верхньої та нижньої щелепи пацієнта до плану
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Початковий каркас клінічних етапів
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">
                    Візуальний прев'ю майбутніх етапів у конструкторі
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/*Етап 1 -->*/}
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                          ЕТАП 1
                        </span>
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          healing
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Терапевтична санація</h4>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Фокус: девіталізація та реставрація{' '}
                        <span className="font-mono font-semibold text-slate-800">#16</span>
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Гігієна + Ендодонтія</span>
                      <span className="font-medium text-slate-700">~ 2 візити</span>
                    </div>
                  </div>
                  {/*Етап 2 -->*/}
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded">
                          ЕТАП 2
                        </span>
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          medical_services
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Хірургічний етап</h4>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Імплантація{' '}
                        <span className="font-mono font-semibold text-slate-800">#48</span>{' '}
                        Straumann BLX
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Хірургічний шаблон</span>
                      <span className="font-medium text-slate-700">~ 1 операція</span>
                    </div>
                  </div>
                  {/*Етап 3 -->*/}
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                          ЕТАП 3
                        </span>
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          dentistry
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Ортопедичний етап</h4>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Коронки Prettau (оксид цирконію)
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Фіксація та оклюзія</span>
                      <span className="font-medium text-slate-700">~ 3 візити</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StickyFormFooter
              backUrl="/patients"
              backLabel={msg.get('material.back') || 'Повернутись'}
              saveLabel={msg.get('material.save') || 'Зберегти'}
              processingLabel="Збереження..."
              successMessage={msg.get('material.saved') || 'Збережено успішно!'}
              processing={processing}
              recentlySuccessful={recentlySuccessful}
              onSave={submit}
            />
          </form>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
