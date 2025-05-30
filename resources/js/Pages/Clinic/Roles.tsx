import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { appLangSelector } from "@/Redux/Layout/selectors.tsx";
import { appLangSelector } from '../../Redux/Layout/selectors';
import Lang from 'lang.js';
import lngClinic from '../../Lang/Clinic/translation';
// import PrimaryButton from "@/Components/Partials/PrimaryButton.tsx";
// import { Link } from "@inertiajs/react";
// import DataTable from "@/Components/Table/DataTable.tsx";
// import { PaginationType } from "@/Constants/index.ts";

export default function Roles() {
  const dispatch = useDispatch();

  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngClinic,
    locale: appLang,
  });

  const sendRequest = useCallback(() => {
    return dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <AuthenticatedLayout header={<Head title="Roles" />}>
      <div className="py-0">
        <div>
          <div className="p-4 sm:p-8 mb-8 content-data bg-content">
            <section>
              <header>
                <div className="flex inline-flex">
                  <h2>{msg.get('clinic.title.roles')}</h2>
                </div>
              </header>
            </section>
          </div>
          <table className="min-w-full float-table">
            <thead>
              <tr>
                <th className="border" />
                <th className="border">
                  {/*{resItems?.owner?.photo && (*/}
                  {/*    <img*/}
                  {/*        width={24}*/}
                  {/*        height={24}*/}
                  {/*        className="rounded-full cursor-pointer inline-block mr-1.5"*/}
                  {/*        alt=""*/}
                  {/*        src={`${baseApiUrl}/storage/${resItems.owner.photo}`}*/}
                  {/*    />*/}
                  {/*)}*/}
                  {/*{!resItems?.owner?.photo && <i className="fas fa-ghost" />}*/}
                  {/*<span>{resItems?.owner?.name}</span>*/}
                  <span>User 1</span>
                </th>
                <th className="border">
                  <span>User 1</span>
                </th>
                {/*{resItems.staff.map((staff: any) => (*/}
                {/*    <th className="border" key={staff.id}>*/}
                {/*        {staff.photo && (*/}
                {/*            <img*/}
                {/*                width={24}*/}
                {/*                height={24}*/}
                {/*                className="rounded-full cursor-pointer inline-block mr-1.5"*/}
                {/*                alt=""*/}
                {/*                src={`${baseApiUrl}/storage/${resItems.owner.photo}`}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*        {!staff.photo && (*/}
                {/*            <UserIcon*/}
                {/*                className="rounded-full cursor-pointer inline-block mr-1.5 border"*/}
                {/*                width={24}*/}
                {/*                height={24}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*        <span>{staff.name}</span>*/}
                {/*    </th>*/}
                {/*))}*/}
              </tr>
            </thead>
            <tbody>
              {/*<tr>*/}
              {/*    <td className="border">&nbsp;</td>*/}
              {/*    <td className="border">*/}
              {/*        <button className="dropdown-button">*/}
              {/*            <span>{t('ceo')}</span>*/}
              {/*        </button>*/}
              {/*    </td>*/}
              {/*    {resItems.staff.map((staff: any) => (*/}
              {/*        <td className="border" key={staff.id}>*/}
              {/*            <button*/}
              {/*                data-dropdown-toggle="dropdown"*/}
              {/*                className="dropdown-button"*/}
              {/*                onClick={() => {*/}
              {/*                    showDropdownMenu(staff.id);*/}
              {/*                }}*/}
              {/*                type="button">*/}
              {/*                    <span>*/}
              {/*                        {staffProps[staff.id].role*/}
              {/*                            ? t(`staff_${staffProps[staff.id].role}`)*/}
              {/*                            : 'Set role'}*/}
              {/*                    </span>*/}
              {/*                <svg*/}
              {/*                    className="ml-2 w-4 h-4"*/}
              {/*                    fill="none"*/}
              {/*                    stroke="currentColor"*/}
              {/*                    viewBox="0 0 24 24"*/}
              {/*                    xmlns="http://www.w3.org/2000/svg">*/}
              {/*                    <path*/}
              {/*                        strokeLinecap="round"*/}
              {/*                        strokeLinejoin="round"*/}
              {/*                        strokeWidth="2"*/}
              {/*                        d="M19 9l-7 7-7-7"*/}
              {/*                    />*/}
              {/*                </svg>*/}
              {/*            </button>*/}

              {/*            /!*{categoryId.find((_id: number) => _id == staff.id) && (*!/*/}
              {/*            {staffProps[staff.id].showDropdown && (*/}
              {/*                <div className="dropdown-items">*/}
              {/*                    <ul className="py-1">*/}
              {/*                        <li>*/}
              {/*                                <span*/}
              {/*                                    role="presentation"*/}
              {/*                                    className="item"*/}
              {/*                                    onClick={() =>*/}
              {/*                                        changeRole(staff.id, 'ceo')*/}
              {/*                                    }>*/}
              {/*                                    {t('staff_ceo')}*/}
              {/*                                </span>*/}
              {/*                        </li>*/}
              {/*                        <li>*/}
              {/*                                <span*/}
              {/*                                    role="presentation"*/}
              {/*                                    className="item"*/}
              {/*                                    onClick={() =>*/}
              {/*                                        changeRole(*/}
              {/*                                            staff.id,*/}
              {/*                                            'administrator'*/}
              {/*                                        )*/}
              {/*                                    }>*/}
              {/*                                    {t('staff_administrator')}*/}
              {/*                                </span>*/}
              {/*                        </li>*/}
              {/*                        <li>*/}
              {/*                                <span*/}
              {/*                                    role="presentation"*/}
              {/*                                    className="item"*/}
              {/*                                    onClick={() =>*/}
              {/*                                        changeRole(staff.id, 'doctor')*/}
              {/*                                    }>*/}
              {/*                                    {t('staff_doctor')}*/}
              {/*                                </span>*/}
              {/*                        </li>*/}
              {/*                        <li>*/}
              {/*                                <span*/}
              {/*                                    role="presentation"*/}
              {/*                                    className="item"*/}
              {/*                                    onClick={() =>*/}
              {/*                                        changeRole(staff.id, 'assistent')*/}
              {/*                                    }>*/}
              {/*                                    {t('staff_assistent')}*/}
              {/*                                </span>*/}
              {/*                        </li>*/}
              {/*                    </ul>*/}
              {/*                </div>*/}
              {/*            )}*/}
              {/*        </td>*/}
              {/*    ))}*/}
              {/*</tr>*/}
              {/*<tr>*/}
              {/*    <td className="border" style={{ paddingLeft: '15px' }}>*/}
              {/*        {t('Color')}*/}
              {/*    </td>*/}
              {/*    <td className="border"/>*/}
              {/*    {resItems.staff.map((staff: any) => (*/}
              {/*        <td className="border" key={staff.id}>*/}
              {/*            <div className="color-stretch-indicator relative">*/}
              {/*                <div*/}
              {/*                    className="color"*/}
              {/*                    role="presentation"*/}
              {/*                    onClick={() => showPicker(staff.id)}*/}
              {/*                    style={{*/}
              {/*                        backgroundColor: staffProps[staff.id].color*/}
              {/*                            ? staffProps[staff.id].color*/}
              {/*                            : '#ff7fab'*/}
              {/*                    }}*/}
              {/*                />*/}
              {/*                {staffProps[staff.id].showPicker && (*/}
              {/*                    <div className="absolute top-7">*/}
              {/*                        <SketchPicker*/}
              {/*                            data-picker-id={staff.id}*/}
              {/*                            onChange={handleChangeColor}*/}
              {/*                            color={staffProps[staff.id].color}*/}
              {/*                        />*/}
              {/*                    </div>*/}
              {/*                )}*/}
              {/*            </div>*/}
              {/*            /!*<SketchPicker color={staffProps[staff.id].color} />*!/*/}
              {/*        </td>*/}
              {/*    ))}*/}
              {/*</tr>*/}
              {/*<tr>*/}
              {/*    <td*/}
              {/*        style={{ paddingLeft: '15px' }}*/}
              {/*        colSpan={resItems.staff.length + 2}*/}
              {/*        className="border bg-gray-200">*/}
              {/*        Общие настройки*/}
              {/*    </td>*/}
              {/*</tr>*/}
              {/*{resItems.permissions.map((permission: any) => (*/}
              {/*    <tr className="border" key={permission.id}>*/}
              {/*        <td*/}
              {/*            className="border"*/}
              {/*            style={{ paddingLeft: '15px' }}>*/}
              {/*            {permission.title}*/}
              {/*        </td>*/}
              {/*        <td className="border">*/}
              {/*            <div className="flex flex-col justify-center items-center">*/}
              {/*                <CheckIcon width={24} height={24} />*/}
              {/*            </div>*/}
              {/*        </td>*/}
              {/*        {resItems.staff.map((staff: any) => (*/}
              {/*            <td*/}
              {/*                className="border cursor-pointer"*/}
              {/*                key={staff.id}*/}
              {/*                role="presentation"*/}
              {/*                onClick={() =>*/}
              {/*                    changePermission(staff.id, permission.id)*/}
              {/*                }>*/}
              {/*                <div className="flex flex-col justify-center items-center">*/}
              {/*                    {resItems.permissionByRoles[staff.id][*/}
              {/*                        permission.id*/}
              {/*                        ] && <CheckIcon width={20} height={20} />}*/}
              {/*                    {!resItems.permissionByRoles[staff.id][*/}
              {/*                        permission.id*/}
              {/*                        ] && <BanIcon width={20} height={20} />}*/}
              {/*                </div>*/}
              {/*            </td>*/}
              {/*        ))}*/}
              {/*    </tr>*/}
              {/*))}*/}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
