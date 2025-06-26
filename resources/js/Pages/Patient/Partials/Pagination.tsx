import React from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngLayouts from '../../../Lang/Layouts/translation';

export default function Pagination({ listData }) {
  const appLang = useSelector(appLangSelector);
  const msgLayouts = new Lang({
    messages: lngLayouts,
    locale: appLang,
  });

  return (
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            {msgLayouts.get('layouts.pagination.show')} {listData.current_page} {msgLayouts.get('layouts.pagination.of')} {listData.last_page}
          </p>
        </div>
        <nav className="flex space-x-2">
      {/* Previous Button */}
      <a
        href={listData.first_page_url}
        className={`px-3 py-1 border rounded text-sm ${
          listData.current_page !== 1
            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        onClick={(e) => !listData.first_page_url && e.preventDefault()}
      >
        {msgLayouts.get('layouts.pagination.first')}
      </a>

      {/* Page Links */}
      {listData.links
        .filter((link) => link.label !== 'Previous' && link.label !== 'Next')
        .map((link) => (
          <a
            key={link.label}
            href={link.url || '#'}
            className={`px-3 py-1 border rounded text-sm ${
              link.active
                ? 'bg-blue-500 text-white border-blue-500'
                : link.url
                  ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={(e) => !link.url && e.preventDefault()}
          >
            {link.label === '&laquo; Previous' ? '« '+msgLayouts.get('layouts.pagination.previous') : link.label === 'Next &raquo;' ?  msgLayouts.get('layouts.pagination.next') +' »' : link.label}
          </a>
        ))}

      {/* Next Button */}
      <a
        href={listData.last_page_url || '#'}
        className={`px-3 py-1 border rounded text-sm ${
          listData.next_page_url
            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        onClick={(e) => !listData.last_page_url && e.preventDefault()}
      >
        {msgLayouts.get('layouts.pagination.last')}
      </a>
    </nav>
      </div>
  );
}
