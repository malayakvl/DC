import AuthenticatedLayout from '../../../Layouts/AuthenticatedLayout';
import React, { useMemo, useState } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { Head, router } from '@inertiajs/react';
import StickyFormFooter from '@/Components/Common/StickyFormFooter';
import Details from '@/Pages/Patient/Partials/Details';

interface PriceCategory {
  id: number;
  name: string;
}

interface PriceService {
  id: number;
  name: string;
  price: string | number;
  duration?: number;
  category_id?: number;
}

interface TreatmentRecordItem {
  id: number;
  patient_id: number;
  treatment_date?: string;
  stage_name?: string;
  type: 'stage' | 'formula' | 'perio' | string;
}

interface DocumentRecordItem {
  id: number;
  patient_id: number;
  category: 'xray' | 'photo' | 'ct' | string;
  tooth?: string | null;
  note?: string | null;
  original_name: string;
  file_path?: string;
  url?: string;
  created_at?: string;
}

interface StageService {
  [key: string]: any;
  serviceId: number;
  name: string;
  categoryId: number;
  duration?: number;
  unitPrice: number;
  quantity: number;
}

interface TreatmentStage {
  [key: string]: any;
  id: string;
  title: string;
  teeth: string[];
  items: StageService[];
}

const PLAN_PRESETS = [
  {
    id: 'rehab',
    label: 'Комплексна реабілітація (терапія + хірургія + ортопедія)',
    title: 'Комплексна реабілітація',
    recommendedCategoryIds: [4, 5, 6, 7],
  },
  {
    id: 'sanation',
    label: 'Тотальна санація та підготовка',
    title: 'Тотальна санація та підготовка',
    recommendedCategoryIds: [2, 3, 4, 5],
  },
  {
    id: 'aligners',
    label: 'Ортодонтичне вирівнювання елайнерами',
    title: 'Ортодонтичне вирівнювання елайнерами',
    recommendedCategoryIds: [2, 3, 4],
  },
  {
    id: 'all-on-x',
    label: 'Імплантація All-on-4 / All-on-6',
    title: 'Імплантація All-on-4 / All-on-6',
    recommendedCategoryIds: [2, 6, 7],
  },
];

const STAGE_TITLE_PRESETS = [
  'Обстеження та діагностика',
  'Профілактичні проходження',
  'Лікування карієсу / Реставрації',
  'Ендодонтичне лікування',
  'Хірургічний етап',
  'Ортопедичний етап',
];

const ADULT_UPPER_TEETH = [
  '18',
  '17',
  '16',
  '15',
  '14',
  '13',
  '12',
  '11',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
];
const ADULT_LOWER_TEETH = [
  '48',
  '47',
  '46',
  '45',
  '44',
  '43',
  '42',
  '41',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
];

const CHILD_UPPER_TEETH = ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65'];
const CHILD_LOWER_TEETH = ['85', '84', '83', '82', '81', '71', '72', '73', '74', '75'];

const DOC_CATEGORY_LABELS: Record<string, string> = {
  xray: 'Рентген / ОПТГ',
  photo: 'Фотопротокол',
  ct: 'КТ / 3D',
};

export default function Create({
                                 patientData,
                                 clinicData,
                                 curators = [],
                                 priceCategories = [],
                                 services = {},
                                 treatmentData = [],
                                 documentsData = [],
                               }: {
  patientData: any;
  clinicData: any;
  curators?: { id: number | string; name: string; specialization?: string }[];
  priceCategories?: PriceCategory[];
  services?: Record<number, PriceService[]>;
  treatmentData?: TreatmentRecordItem[];
  documentsData?: DocumentRecordItem[];
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });

  // Крок 1: Базова інформація плану
  const [title, setTitle] = useState('');
  const [variant, setVariant] = useState<'optimal' | 'alternative'>('optimal');
  const [recommendedCategoryIds, setRecommendedCategoryIds] = useState<number[]>([]);

  // Крок 2: Куратор, термін та необов'язкове прикріплення наявних формул/періо і документів
  const [curatorId, setCuratorId] = useState<string>(curators[0]?.id ? String(curators[0].id) : '');
  const [duration, setDuration] = useState('3–6 місяців (поетапно)');
  const [selectedTreatmentIds, setSelectedTreatmentIds] = useState<number[]>([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<number[]>([]);

  // Крок 3: Етапи плану (на старті повністю порожньо)
  const [stages, setStages] = useState<TreatmentStage[]>([]);

  // Попап створення / редагування етапу
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [stageTitle, setStageTitle] = useState('');
  const [dentitionMode, setDentitionMode] = useState<'adult' | 'child'>('adult');
  const [stageTeeth, setStageTeeth] = useState<string[]>([]);
  const [stageItems, setStageItems] = useState<StageService[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    priceCategories[0]?.id ?? null
  );

  const [processing, setProcessing] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  // Відфільтровані діагностичні записи (тільки formula та perio, без stage)
  const diagnosticRecords = useMemo(
    () => treatmentData.filter((item) => item.type === 'formula' || item.type === 'perio'),
    [treatmentData]
  );

  const toggleTreatmentRecord = (id: number) => {
    setSelectedTreatmentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleDocumentRecord = (id: number) => {
    setSelectedDocumentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openNewStageModal = () => {
    setEditingStageId(null);
    setStageTitle('');
    setDentitionMode('adult');
    setStageTeeth([]);
    setStageItems([]);
    const defaultCat =
      recommendedCategoryIds.find((id) => (services[id]?.length ?? 0) > 0) ??
      priceCategories[0]?.id ??
      null;
    setActiveCategoryId(defaultCat);
    setIsStageModalOpen(true);
  };

  const openEditStageModal = (stage: TreatmentStage) => {
    setEditingStageId(stage.id);
    setStageTitle(stage.title);
    const hasChildTooth = stage.teeth.some((t) =>
      [...CHILD_UPPER_TEETH, ...CHILD_LOWER_TEETH].includes(t)
    );
    setDentitionMode(hasChildTooth ? 'child' : 'adult');
    setStageTeeth([...stage.teeth]);
    setStageItems(stage.items.map((i) => ({ ...i })));
    setActiveCategoryId(priceCategories[0]?.id ?? null);
    setIsStageModalOpen(true);
  };

  const toggleStageTooth = (tooth: string) => {
    setStageTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  const addServiceToStage = (srv: PriceService) => {
    const catId = activeCategoryId ?? srv.category_id ?? 0;
    setStageItems((prev) => {
      const idx = prev.findIndex((i) => i.serviceId === srv.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          serviceId: srv.id,
          name: srv.name,
          categoryId: catId,
          duration: srv.duration,
          unitPrice: Number(srv.price) || 0,
          quantity: 1,
        },
      ];
    });
  };

  const updateStageServiceQty = (serviceId: number, delta: number) => {
    setStageItems((prev) =>
      prev
        .map((item) =>
          item.serviceId === serviceId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSaveStage = () => {
    const newStage: TreatmentStage = {
      id: editingStageId ?? `stage-${Date.now()}`,
      title: stageTitle.trim() || `Етап ${stages.length + 1}`,
      teeth: stageTeeth,
      items: stageItems,
    };

    setStages((prev) =>
      editingStageId
        ? prev.map((s) => (s.id === editingStageId ? newStage : s))
        : [...prev, newStage]
    );
    setIsStageModalOpen(false);
  };

  const removeStage = (stageId: string) => {
    setStages((prev) => prev.filter((s) => s.id !== stageId));
  };

  // Послуги обраної категорії напряму зі словника services[activeCategoryId]
  const currentCategoryServices = useMemo(() => {
    if (!activeCategoryId) return [];
    return services[activeCategoryId] ?? [];
  }, [services, activeCategoryId]);

  const stageTotal = useMemo(
    () => stageItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [stageItems]
  );

  const planTotal = useMemo(
    () =>
      stages.reduce(
        (sum, st) => sum + st.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0),
        0
      ),
    [stages]
  );

  const submit = (e?: any) => {
    if (e?.preventDefault) e.preventDefault();
    setProcessing(true);

    router.post(
      `/patient/${patientData?.id}/plans`,
      {
        title,
        variant,
        curator_id: curatorId,
        duration,
        treatment_data_ids: selectedTreatmentIds,
        document_ids: selectedDocumentIds,
        stages: stages as any,
        total_amount: planTotal,
      },
      {
        preserveScroll: true,
        onSuccess: () => setRecentlySuccessful(true),
        onFinish: () => setProcessing(false),
      }
    );
  };

  const upperTeethList = dentitionMode === 'adult' ? ADULT_UPPER_TEETH : CHILD_UPPER_TEETH;
  const lowerTeethList = dentitionMode === 'adult' ? ADULT_LOWER_TEETH : CHILD_LOWER_TEETH;

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title="Створення нового плану лікування" />
      <div className="py-0">
        <div className="p-4 sm:p-4 mb-16 content-data bg-content space-y-4">
          <Details patientData={patientData} clinicData={clinicData} showSubTab={false} />

          <div>
            <h1 className="text-xl font-bold text-on-surface tracking-tight">
              Створення нового плану лікування
            </h1>
            <p className="text-xs text-on-surface-variant">Новий клінічний протокол пацієнта</p>
          </div>

          {/* КРОК 1: Базова інформація плану */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-900">Базова інформація плану</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Поля з <span className="text-rose-500 font-bold">*</span> обов`язкові
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="plan-name-input"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Назва плану лікування <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-xs font-mono text-slate-500">{title.length} / 120</span>
              </div>
              <input
                id="plan-name-input"
                type="text"
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Вкажіть клінічну назву курсу лікування..."
                className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              <div className="pt-1.5 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Швидкі клінічні пресети назв:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PLAN_PRESETS.map((preset) => {
                    const active = title === preset.title;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setTitle(preset.title);
                          setRecommendedCategoryIds(preset.recommendedCategoryIds);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition flex items-center gap-1.5 ${
                          active
                            ? 'bg-teal-50 border-teal-500 text-teal-800'
                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-teal-600 font-bold">+</span>
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                Вибір типу та клінічного пріоритету плану:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVariant('optimal')}
                  className={`text-left flex items-start gap-3.5 p-4 rounded-xl transition-all border ${
                    variant === 'optimal'
                      ? 'border-2 border-teal-600 bg-teal-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        variant === 'optimal' ? 'border-teal-600' : 'border-slate-300'
                      }`}
                    >
                      {variant === 'optimal' && (
                        <div className="w-2 h-2 rounded-full bg-teal-600" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Оптимальний план (План А)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-teal-100 text-teal-800">
                        Рекомендовано
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Рекомендований клінічний протокол, повне відновлення функції та естетики.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVariant('alternative')}
                  className={`text-left flex items-start gap-3.5 p-4 rounded-xl transition-all border ${
                    variant === 'alternative'
                      ? 'border-2 border-teal-600 bg-teal-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        variant === 'alternative' ? 'border-teal-600' : 'border-slate-300'
                      }`}
                    >
                      {variant === 'alternative' && (
                        <div className="w-2 h-2 rounded-full bg-teal-600" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Альтернативний план (План Б)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-slate-100 text-slate-700">
                        Поетапний / Оптимізація бюджету
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Поетапний варіант або оптимізація стартового бюджету під можливості пацієнта.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* КРОК 2: Клінічні параметри, формула/періо та документи пацієнта */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Клінічні параметри та прикріплення даних пацієнта
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Лікар-куратор <span className="text-rose-500 font-bold">*</span>
                </label>
                <select
                  value={curatorId}
                  onChange={(e) => setCuratorId(e.target.value)}
                  className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg px-3 py-2.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {curators.length === 0 ? (
                    <option value="">Оберіть лікаря-куратора</option>
                  ) : (
                    curators.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.name}
                        {c.specialization ? ` (${c.specialization})` : ''}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Орієнтовний термін реалізації
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white text-slate-900 text-sm font-medium rounded-lg px-3 py-2.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="1–2 місяці">1–2 місяці</option>
                  <option value="3–6 місяців (поетапно)">3–6 місяців (поетапно)</option>
                  <option value="6–12 місяців">6–12 місяців</option>
                  <option value="Понад 1 рік">Понад 1 рік</option>
                </select>
              </div>
            </div>

            {/* Два блоки прив'язки реальних даних пацієнта (необов'язково) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
              {/* Лівий блок: Зубна формула та Періо карта / ПСР */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-800">
                    Зубна формула та Періо-карта (ПСР)
                  </h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {selectedTreatmentIds.length} обрано
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Необов'язково. Оберіть наявні записи обстеження з картки пацієнта:
                </p>

                {diagnosticRecords.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-500">
                    У пацієнта ще немає збереженої зубної формули чи періо-карти.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {diagnosticRecords.map((rec) => {
                      const checked = selectedTreatmentIds.includes(rec.id);
                      const typeBadge =
                        rec.type === 'formula'
                          ? 'Зубна формула'
                          : rec.type === 'perio'
                            ? 'Періо / ПСР'
                            : rec.type;
                      return (
                        <label
                          key={rec.id}
                          className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                            checked
                              ? 'border-teal-500 bg-teal-50/70'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleTreatmentRecord(rec.id)}
                              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-slate-900 truncate">
                                {rec.stage_name || typeBadge}
                              </div>
                              {rec.treatment_date && (
                                <div className="text-[11px] text-slate-500">
                                  Дата огляду: {rec.treatment_date}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            {typeBadge}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Правий блок: Наші документи та знімки пацієнта */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-800">
                    Документи та клінічні знімки пацієнта
                  </h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {selectedDocumentIds.length} прикріплено
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Необов'язково. Оберіть завантажені файли з вкладки Документи:
                </p>

                {documentsData.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-500">
                    У вкладці Документи ще немає завантажених знімків чи файлів.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {documentsData.map((doc) => {
                      const checked = selectedDocumentIds.includes(doc.id);
                      const catLabel = DOC_CATEGORY_LABELS[doc.category] || doc.category;
                      const displayTitle = doc.note?.trim() || doc.original_name;
                      return (
                        <label
                          key={doc.id}
                          className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                            checked
                              ? 'border-teal-500 bg-teal-50/70'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDocumentRecord(doc.id)}
                              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <div className="min-w-0 max-w-[200px]">
                              {doc.url && (
                                <img
                                  width={100}
                                  src={doc.url}
                                  className="w-full h-full object-cover"
                                  alt={doc.category}
                                />
                              )}
                              <div className="text-xs font-semibold text-slate-900 truncate">
                                {displayTitle}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {doc.original_name}
                                {doc.tooth ? ` · Локалізація: ${doc.tooth}` : ''}
                              </div>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            {catLabel}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* КРОК 3: Клінічні етапи (порожній старт + вибір зубів і послуг усередині етапу) */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Клінічні етапи плану</h3>
                  <p className="text-xs text-slate-500">
                    Зуби та послуги з прайсу додаються всередині кожного окремого етапу
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openNewStageModal}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition"
              >
                + Додати етап
              </button>
            </div>

            {stages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 py-10 px-4 text-center space-y-2">
                <div className="text-sm font-semibold text-slate-700">
                  Етапи лікування ще не додані
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Натисніть «+ Додати етап», щоб вказати назву етапу, обрати конкретні зуби та
                  додати послуги з прайсу.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {stages.map((stage, idx) => {
                  const stageSum = stage.items.reduce(
                    (acc, item) => acc + item.unitPrice * item.quantity,
                    0
                  );
                  return (
                    <div
                      key={stage.id}
                      className="rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-teal-600 text-white text-[11px] font-bold rounded uppercase">
                            Етап {idx + 1}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{stage.title}</span>
                          {stage.teeth.length > 0 && (
                            <span className="text-xs font-mono px-2 py-0.5 bg-white text-teal-800 border border-teal-200 rounded">
                              {stage.teeth.map((t) => `#${t}`).join(', ')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-teal-800">
                            {stageSum.toFixed(2)} грн
                          </span>
                          <button
                            type="button"
                            onClick={() => openEditStageModal(stage)}
                            className="text-xs font-semibold text-teal-700 hover:underline"
                          >
                            Редагувати
                          </button>
                          <button
                            type="button"
                            onClick={() => removeStage(stage.id)}
                            className="text-xs font-semibold text-rose-600 hover:underline"
                          >
                            Видалити
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        {stage.items.length === 0 ? (
                          <p className="text-xs text-slate-400">
                            У цьому етапі ще не обрано послуг із прайсу.
                          </p>
                        ) : (
                          <div className="divide-y divide-slate-100">
                            {stage.items.map((item) => (
                              <div
                                key={item.serviceId}
                                className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                              >
                                <span className="font-medium text-slate-800">{item.name}</span>
                                <span className="font-semibold text-slate-900">
                                  {item.quantity} × {item.unitPrice.toFixed(2)} грн ={' '}
                                  {(item.quantity * item.unitPrice).toFixed(2)} грн
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-sm">
              <span className="text-slate-600">Загальна сума плану:</span>
              <span className="font-mono text-base font-extrabold text-teal-800">
                {planTotal.toFixed(2)} грн
              </span>
            </div>
          </section>
        </div>

        <StickyFormFooter
          backUrl={`/patient/${patientData?.id}`}
          backLabel={msg.get('material.back') || 'Повернутись'}
          saveLabel={msg.get('material.save') || 'Зберегти'}
          processingLabel="Збереження..."
          successMessage={msg.get('material.saved') || 'Збережено успішно!'}
          processing={processing}
          recentlySuccessful={recentlySuccessful}
          onSave={submit}
        />
      </div>

      {/* Попап створення / редагування етапу */}
      {isStageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col treatment-etap-win">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {editingStageId ? 'Редагування етапу' : 'Додати етап лікування'}
                </h4>
                <p className="text-xs text-slate-500">
                  Оберіть назву, зуби етапу та послуги з прайсу
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStageModalOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Закрити
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Назва етапу та швидкі пресети */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Назва етапу <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={stageTitle}
                  onChange={(e) => setStageTitle(e.target.value)}
                  placeholder="Наприклад: Терапевтична санація"
                  className="w-full rounded-lg border-slate-300 text-sm font-medium focus:border-teal-500 focus:ring-teal-500"
                />
                <div className="flex flex-wrap gap-1.5">
                  {STAGE_TITLE_PRESETS.map((presetTitle) => (
                    <button
                      key={presetTitle}
                      type="button"
                      onClick={() => setStageTitle(presetTitle)}
                      className="text-[11px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
                    >
                      {presetTitle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Вибір окремих зубів (FDI) для цього етапу + перемикач Дорослі / Дитячі */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-slate-700">Зуби етапу (FDI):</span>
                    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                      <button
                        type="button"
                        onClick={() => setDentitionMode('adult')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                          dentitionMode === 'adult'
                            ? 'bg-teal-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Дорослі
                      </button>
                      <button
                        type="button"
                        onClick={() => setDentitionMode('child')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                          dentitionMode === 'child'
                            ? 'bg-teal-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Дитячі
                      </button>
                    </div>
                  </div>

                  <span className="text-teal-700 font-medium">
                    {stageTeeth.length > 0
                      ? `Обрано: ${stageTeeth.map((t) => `#${t}`).join(', ')}`
                      : 'Зуби не обрані'}
                  </span>
                </div>

                <div className="grid greed-popup-tooth gap-1 text-center font-mono text-xs">
                  {upperTeethList.map((tooth) => {
                    const active = stageTeeth.includes(tooth);
                    return (
                      <button
                        key={tooth}
                        type="button"
                        onClick={() => toggleStageTooth(tooth)}
                        className={`p-1.5 rounded border transition ${
                          active
                            ? 'border-teal-600 bg-teal-600 text-white font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-teal-400'
                        }`}
                      >
                        {tooth}
                      </button>
                    );
                  })}
                </div>

                <div className="grid greed-popup-tooth gap-1 text-center font-mono text-xs">
                  {lowerTeethList.map((tooth) => {
                    const active = stageTeeth.includes(tooth);
                    return (
                      <button
                        key={tooth}
                        type="button"
                        onClick={() => toggleStageTooth(tooth)}
                        className={`p-1.5 rounded border transition ${
                          active
                            ? 'border-teal-600 bg-teal-600 text-white font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-teal-400'
                        }`}
                      >
                        {tooth}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Вибір послуг із прайсу (Категорії зліва + Послуги справа) */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-slate-700">
                  Послуги з прайсу для цього етапу:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-12 rounded-xl border border-slate-200 overflow-hidden max-h-[200px] overflow-y-scroll">
                  <div className="md:col-span-4 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-2 space-y-1">
                    {priceCategories.map((cat) => {
                      const active = activeCategoryId === cat.id;
                      const totalInCat = services[cat.id]?.length ?? 0;
                      const selectedCount = stageItems.filter(
                        (i) => i.categoryId === cat.id
                      ).length;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategoryId(cat.id)}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium transition ${
                            active
                              ? 'bg-teal-600 text-white'
                              : 'text-slate-700 hover:bg-slate-200/70'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              active
                                ? 'bg-teal-700 text-white'
                                : selectedCount > 0
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {selectedCount > 0 ? `${selectedCount} / ${totalInCat}` : totalInCat}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="md:col-span-8 bg-white p-3 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {currentCategoryServices.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400">
                        У цій категорії немає послуг
                      </div>
                    ) : (
                      currentCategoryServices.map((srv) => (
                        <div
                          key={srv.id}
                          className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900">{srv.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {srv.duration ? `${srv.duration} хв · ` : ''}
                              {Number(srv.price).toFixed(2)} грн
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => addServiceToStage(srv)}
                            className="shrink-0 px-2.5 py-1 rounded-lg border border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white text-xs font-semibold transition"
                          >
                            + Додати
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Обрані послуги в етапі */}
              {stageItems.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Обрані послуги в етапі ({stageItems.length}):
                  </div>
                  <div className="space-y-1.5">
                    {stageItems.map((item) => (
                      <div
                        key={item.serviceId}
                        className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs"
                      >
                        <span className="font-medium text-slate-800">{item.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateStageServiceQty(item.serviceId, -1)}
                            className="w-6 h-6 rounded border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateStageServiceQty(item.serviceId, 1)}
                            className="w-6 h-6 rounded border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                          >
                            +
                          </button>
                          <span className="w-24 text-right font-bold text-slate-900">
                            {(item.unitPrice * item.quantity).toFixed(2)} грн
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm font-bold text-slate-900">
                Разом за етап:{' '}
                <span className="text-teal-700 font-mono">{stageTotal.toFixed(2)} грн</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsStageModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Скасувати
                </button>
                <button
                  type="button"
                  onClick={handleSaveStage}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-xs font-semibold text-white"
                >
                  Зберегти етап
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}