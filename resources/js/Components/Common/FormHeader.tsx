import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react'; // Или используйте Material Symbols, если они у вас везде

interface FormHeaderProps {
  backUrl: string;
  title: string;
  description?: string;
  badge?: string;
}

export default function FormHeader({ backUrl, title, description, badge }: FormHeaderProps) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-100 mt-3">
      <div className="flex items-start gap-3">
        <Link
          href={backUrl}
          className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white text-slate-700 shadow-xs border border-slate-200 hover:bg-slate-50 hover:text-teal-700 transition-all shrink-0 group"
          title="Повернутись назад"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                {badge}
              </span>
            )}
          </div>
          {description && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
    </div>
  );
}
