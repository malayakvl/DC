import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react'; // Или используй material-symbols, если иконки оттуда

export default function FormHeader({
  title,
  description,
  backUrl = '/patients',
  processing,
  saveText = 'Зберегти зміни',
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Link
              href={backUrl}
              className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-teal-700 transition-all border border-slate-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 mt-1">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
                  {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
