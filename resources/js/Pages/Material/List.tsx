import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngMaterial from '../../Lang/Material/translation';
import PrimaryButton from '../../Components/Form/PrimaryButton';
import NavLink from '../../Components/Links/NavLink';
import DataTable from '../../Components/Table/DataTable';
import { PaginationType } from '@/Constants';
import { Link } from '@inertiajs/react';

export default function List({ listData }) {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngMaterial,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    // return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head />}>
      <Head title={'Producers'} />
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex w-full mb-4">
                  <h2 className="text-xl font-semibold leading-tight">
                    {msg.get('material.title.list')}
                  </h2>
                  <div className="flex-1 text-right mt-[5px]">
                    <PrimaryButton>
                      <NavLink href={'/material/create'}>{msg.get('material.create')}</NavLink>
                    </PrimaryButton>
                  </div>
                </div>
              </header>
            </section>
            <section className="table-card">
              <DataTable paginationType={PaginationType.MATERIALS} sendRequest={sendRequest}>
                {listData?.map((item) => (
                  <tr className="" key={item.id}>
                    <td style={{ width: '100px' }}>
                      <img
                        src={
                          item.image
                            ? `/storage/materials/${item.id}/${item.image}`
                            : '/images/no-photo.png'
                        }
                        width={40}
                        className="float-left rounded"
                        height="auto"
                        onError={(e) => {
                          e.currentTarget.src = '/images/no-photo.png';
                        }}
                      />
                    </td>
                    <td className="">{item.name}</td>
                    <td className="">{item.price}</td>
                    <td className="">{item.retail_price}</td>
                    <td className="">
                      {item.percent ? <span className="percent-tbl">{item.percent}%</span> : ''}
                    </td>
                    <td className="">{item.categoryName}</td>
                    <td className="">{item.producerName}</td>
                    <td className="text-left">{item.unitName}</td>
                    <td className="text-left">{item.weight}</td>
                    <td className="text-right whitespace-nowrap">
                      <Link
                        className="btn-edit"
                        title={msg.get('filial.filial.edit')}
                        href={`material/edit/${item.id}`}
                      />
                      <NavLink
                        className="btn-delete"
                        title={msg.get('filial.filial.delete')}
                        href={`material/delete/${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
