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
          <p className="pagination-title">
            {msgLayouts.get('layouts.pagination.show')} {listData.current_page} {msgLayouts.get('layouts.pagination.of')} {listData.last_page}
          </p>
        </div>
        <nav className="flex space-x-2">
      {/* Previous Button */}
      <a
        href={listData.first_page_url}
        className={`pagination-btns ${
          listData.current_page !== 1
            ? 'page-active'
            : 'page-active cursor-not-allowed'
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
            className={`pagination-btns ${
              link.active
                ? 'page-active'
                : link.url
                  ? 'pagination-btns'
                  : 'pagination-btns cursor-not-allowed'
            }`}
            onClick={(e) => !link.url && e.preventDefault()}
          >
            {link.label === '&laquo; Previous' ? '« '+msgLayouts.get('layouts.pagination.previous') : link.label === 'Next &raquo;' ?  msgLayouts.get('layouts.pagination.next') +' »' : link.label}
          </a>
        ))}

      {/* Next Button */}
      <a
        href={listData.last_page_url || '#'}
        className={`pagination-btns ${
          listData.next_page_url
            ? 'page-active'
            : 'page-active cursor-not-allowed'
        }`}
        onClick={(e) => !listData.last_page_url && e.preventDefault()}
      >
        {msgLayouts.get('layouts.pagination.last')}
      </a>
    </nav>
      </div>
  );
}
