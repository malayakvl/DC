import React, { useState, useRef, useMemo } from 'react';
import Lang from 'lang.js';
import lngPatient from '../../../Lang/Patient/translation';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import { router } from '@inertiajs/react';

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf', 'dcm', 'dicom'];

interface PatientDocumentItem {
  id: number | string;
  patient_id: number | string;
  category: 'photo' | 'ct' | 'xray' | 'consent' | string;
  tooth?: string | null;
  note?: string | null;
  original_name: string;
  disk?: string;
  file_path: string;
  mime_type?: string | null;
  size: number;
  uploaded_by?: number | string | null;
  uploaded_by_name?: string | null;
  created_at?: string | null;
  url: string;
}

const CATEGORY_META: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
  photo: {
    label: 'Фотопротокол',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200/80',
    dotClass: 'bg-sky-500',
  },
  ct: {
    label: 'КТ / 3D-діагностика',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
    dotClass: 'bg-purple-500',
  },
  xray: {
    label: 'Рентген / ОПТГ',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotClass: 'bg-emerald-500',
  },
  consent: {
    label: 'Згоди та анкети',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    dotClass: 'bg-amber-500',
  },
};

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 МБ';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} ГБ`;
  }
  return `${mb.toFixed(1)} МБ`;
}

function formatTableSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 КБ';
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} КБ`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(1)} МБ`;
}

function getFileExtension(doc: PatientDocumentItem): string {
  const fromName = doc.original_name?.split('.').pop()?.toUpperCase();
  if (fromName && fromName.length <= 6) {
    return fromName === 'JPEG' ? 'JPG' : fromName;
  }
  if (doc.mime_type) {
    const parts = doc.mime_type.split('/');
    return (parts[1] || parts[0]).toUpperCase();
  }
  return 'FILE';
}

function formatDateTime(dateStr?: string | null): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function isAllowedFile(file: File): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (ALLOWED_EXTENSIONS.includes(ext)) return true;
  if (['image/jpeg', 'image/png', 'application/pdf', 'application/dicom'].includes(file.type)) {
    return true;
  }
  return false;
}

export default function Documents({
  typeTab,
  patientData,
  documentsData,
}: {
  typeTab: any | null;
  patientData: any | null;
  documentsData: any | null;
}) {
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({ messages: lngPatient, locale: appLang });
  console.log(documentsData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<string>('photo');
  const [tooth, setTooth] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const documentsList: PatientDocumentItem[] = useMemo(() => {
    if (Array.isArray(documentsData?.items)) return documentsData.items;
    if (Array.isArray(documentsData)) return documentsData;
    return [];
  }, [documentsData]);

  const categoryCounts = useMemo(() => {
    return documentsList.reduce<Record<string, number>>((acc, doc) => {
      const cat = doc.category || 'other';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
  }, [documentsList]);

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return documentsList.filter((doc) => {
      if (activeFilter !== 'all' && doc.category !== activeFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        doc.original_name,
        doc.note,
        doc.tooth,
        doc.category,
        CATEGORY_META[doc.category]?.label,
        doc.uploaded_by_name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [documentsList, activeFilter, searchQuery]);

  const existingDocsCount = documentsList.length;

  const existingDocsSize = useMemo(() => {
    if (typeof documentsData?.total_size_bytes === 'number') {
      return documentsData.total_size_bytes;
    }
    return documentsList.reduce((sum, doc) => sum + (Number(doc.size) || 0), 0);
  }, [documentsData, documentsList]);

  const handleFilesSelection = (fileList: FileList | null) => {
    setUploadError(null);
    if (!fileList || fileList.length === 0) return;

    const incoming = Array.from(fileList);
    const validFiles: File[] = [];
    const rejected: string[] = [];

    for (const file of incoming) {
      if (!isAllowedFile(file)) {
        rejected.push(`${file.name} (непідтримуваний формат)`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejected.push(`${file.name} (понад 50 МБ)`);
        continue;
      }
      validFiles.push(file);
    }

    if (rejected.length > 0) {
      setUploadError(`Пропущено файли: ${rejected.join(', ')}`);
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFileAt = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
    setUploadError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFilesSelection(e.dataTransfer?.files || null);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleUploadSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setUploadError(null);

    if (selectedFiles.length === 0) {
      openFilePicker();
      return;
    }

    const formData = new FormData();
    if (patientData?.id) {
      formData.append('patient_id', String(patientData.id));
    }
    if (typeTab) {
      formData.append('type_tab', String(typeTab));
    }
    formData.append('category', category);
    formData.append('tooth', tooth.trim());
    formData.append('note', note.trim());

    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    setUploading(true);

    const targetUrl = route('patient.documents.upload');

    router.post(targetUrl, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setSelectedFiles([]);
        setTooth('');
        setNote('');
        setUploadError(null);
      },
      onError: (errors) => {
        const firstError =
          typeof errors === 'object' && errors !== null ? Object.values(errors)[0] : null;
        setUploadError(
          typeof firstError === 'string'
            ? firstError
            : 'Не вдалося завантажити файли. Перевірте дані та спробуйте ще раз.'
        );
      },
      onFinish: () => {
        setUploading(false);
      },
    });
  };

  const totalSelectedSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <>
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Документи та клінічні медіафайли
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/70">
              Сховище пацієнта
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Рентгенограми, КТ-зрізи, фотопротокол та підписані медичні згоди пацієнта
          </p>
        </div>

        {/* Quick Stats & Fast Action Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span>
              Всього файлів:{' '}
              <strong className="text-slate-900 font-semibold">{existingDocsCount}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-mono">{formatBytes(existingDocsSize)}</span>
          </div>
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg shadow-sm transition-colors"
            type="button"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              ></path>
            </svg>
            <span>Експорт архіву (ZIP)</span>
          </button>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6">
        <form onSubmit={handleUploadSubmit}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.dcm,.dicom,image/jpeg,image/png,application/pdf,application/dicom"
            className="hidden"
            onChange={(e) => handleFilesSelection(e.target.files)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Drag & Drop Hotspot Area */}
            <div className="lg:col-span-4">
              <div
                role="button"
                tabIndex={0}
                onClick={openFilePicker}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openFilePicker();
                  }
                }}
                onDragEnter={handleDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-3.5 flex items-center gap-3.5 cursor-pointer transition group ${
                  isDragging
                    ? 'border-teal-600 bg-teal-100/60'
                    : 'border-teal-300 hover:border-teal-500 bg-teal-50/30'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-teal-100/80 group-hover:bg-teal-200 text-teal-700 flex items-center justify-center shrink-0 transition">
                  <svg
                    className="w-5 h-5 stroke-[2]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-teal-900 transition">
                    {selectedFiles.length > 0
                      ? `Обрано файлів: ${selectedFiles.length} (${formatBytes(totalSelectedSize)})`
                      : 'Перетягніть файли сюди'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    або оберіть з ПК (JPG, PNG, PDF, DICOM до 50 МБ)
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Formulation & Inline Controls */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="sm:w-44 shrink-0">
                <label className="sr-only" htmlFor="uploadCategorySelect">
                  Категорія
                </label>
                <select
                  id="uploadCategorySelect"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="photo">Фотопротокол</option>
                  <option value="ct">КТ / 3D-діагностика</option>
                  <option value="xray">Рентген / ОПТГ</option>
                  <option value="consent">Згоди та анкети</option>
                </select>
              </div>

              {/* Tooth / Segment Specifier */}
              <div className="sm:w-36 shrink-0">
                <label className="sr-only" htmlFor="uploadToothInput">
                  Зуб або сегмент
                </label>
                <input
                  id="uploadToothInput"
                  type="text"
                  value={tooth}
                  onChange={(e) => setTooth(e.target.value)}
                  placeholder="Зуб (напр. #16, #48)"
                  className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 font-mono"
                />
              </div>

              {/* Note / Title */}
              <div className="flex-1">
                <input
                  id="uploadNoteInput"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Коментар або назва знімка (опціонально)"
                  className="w-full min-w-full h-[38px] text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 truncate"
                />
              </div>

              {/* Upload Action Button */}
              <div className="shrink-0">
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-medium text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                >
                  <svg
                    className="w-4 h-4 stroke-[2]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>{uploading ? 'Завантаження...' : 'Завантажити'}</span>
                </button>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              {selectedFiles.map((file, idx) => (
                <div
                  key={`${file.name}-${file.size}-${idx}`}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <span className="font-medium truncate max-w-[220px]">{file.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFileAt(idx)}
                    className="text-slate-400 hover:text-red-600 font-bold leading-none px-1"
                    title="Прибрати файл"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadError && <p className="mt-2.5 text-xs font-medium text-red-600">{uploadError}</p>}
        </form>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/*Category Pill Tabs -->*/}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0"
            id="categoryFilterPills"
          >
            {[
              { key: 'all', label: 'Усі', count: documentsList.length },
              { key: 'photo', label: 'Фотопротокол', count: categoryCounts.photo || 0 },
              { key: 'ct', label: 'КТ / 3D-діагностика', count: categoryCounts.ct || 0 },
              { key: 'xray', label: 'Рентген / ОПТГ', count: categoryCounts.xray || 0 },
              { key: 'consent', label: 'Згоди та анкети', count: categoryCounts.consent || 0 },
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`filter-tab px-3 py-1.5 rounded-lg text-xs shrink-0 transition ${
                    isActive
                      ? 'font-semibold bg-white text-teal-800 border border-teal-300 shadow-xs'
                      : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                  data-filter={tab.key}
                  type="button"
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>

          {/*Search Input & View Switcher -->*/}
          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                id="docSearchInput"
                placeholder="Пошук за назвою, зубом..."
                type="text"
              />
              <svg
                className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 w-16" scope="col">
                  Прев`ю
                </th>
                <th className="py-3 px-4 min-w-[220px]" scope="col">
                  Назва документа та примітки
                </th>
                <th className="py-3 px-4 w-40" scope="col">
                  Категорія
                </th>
                <th className="py-3 px-4 w-28 text-center" scope="col">
                  Локалізація
                </th>
                <th className="py-3 px-4 min-w-[170px]" scope="col">
                  Дата та автор
                </th>
                <th className="py-3 px-4 w-32" scope="col">
                  Розмір &amp; Формат
                </th>
                <th className="py-3 px-4 text-right w-44" scope="col">
                  Клінічні дії
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700" id="documentsTableBody">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 px-4 text-center text-slate-400 text-xs">
                    Документів за обраними критеріями немає
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => {
                  const ext = getFileExtension(doc);
                  const isImage =
                    doc.mime_type?.startsWith('image/') || ['JPG', 'PNG', 'WEBP'].includes(ext);
                  const isDicom3d = doc.category === 'ct' || ['DCM', 'DICOM'].includes(ext);

                  const catMeta = CATEGORY_META[doc.category] || {
                    label: doc.category || 'Документ',
                    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
                    dotClass: 'bg-slate-400',
                  };

                  const primaryTitle = doc.note?.trim() || doc.original_name;
                  const secondaryText = doc.note?.trim()
                    ? doc.original_name
                    : `${catMeta.label} • ${doc.original_name}`;

                  const authorLabel =
                    doc.uploaded_by_name ||
                    (doc.uploaded_by ? `Користувач #${doc.uploaded_by}` : '—');

                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/80 transition-colors align-middle"
                    >
                      {/* Прев'ю */}
                      <td className="py-3 px-4">
                        {isImage && doc.url ? (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 block shrink-0"
                            title={doc.original_name}
                          >
                            <img
                              src={doc.url}
                              alt={primaryTitle}
                              className="w-full h-full object-cover"
                            />
                          </a>
                        ) : isDicom3d ? (
                          <div className="w-11 h-11 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold leading-none">3D</span>
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold leading-none">{ext}</span>
                          </div>
                        )}
                      </td>

                      {/* Назва документа та примітки */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 text-xs leading-snug">
                          {primaryTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[380px]">
                          {secondaryText}
                        </div>
                      </td>

                      {/* Категорія */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${catMeta.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${catMeta.dotClass}`} />
                          <span>{catMeta.label}</span>
                        </span>
                      </td>

                      {/* Локалізація */}
                      <td className="py-3 px-4 text-center">
                        {doc.tooth ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                            {doc.tooth}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Дата та автор */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 text-xs">
                          {formatDateTime(doc.created_at)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {authorLabel}
                        </div>
                      </td>

                      {/* Розмір & Формат */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 text-xs font-mono">
                          {formatTableSize(doc.size)}
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mt-0.5">
                          {ext}
                        </div>
                      </td>

                      {/* Клінічні дії */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              />
                              <path
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              />
                            </svg>
                            <span>{isDicom3d ? 'DICOM 3D' : 'Огляд'}</span>
                          </a>

                          <a
                            href={doc.url}
                            download={doc.original_name}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Завантажити файл"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
