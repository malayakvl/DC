import { createAction } from 'redux-actions';
import axios from 'axios';
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export const setPaletteAction = createAction('staff/SET_PALETTE');

export const fetchStaffsAction: any = createAction(
    'staff/FETCH_STAFF',
    async () =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<{ roles: string[]; items: Staffs.DataItem[] }> => {
            const state = getState();
            // const { limit, offset, sort, column, query } = paginationSelectorFactory(
            //     PaginationType.CABINETS
            // )(state);

            return
            // return axios
            //     .get(
            //         `${baseUrl}/staff/list?${queryString.stringify({
            //             limit,
            //             offset,
            //             sort,
            //             column,
            //             query
            //         })}`,
            //         {
            //             headers: {
            //                 ...authHeader(state.user.user.email)
            //             }
            //         }
            //     )
            //     .then((res: any) => ({
            //         roles: res.data.roles,
            //         items: res.data.staffs,
            //         itemsByRoles: res.data.staffsByRoles
            //     }));
        }
);
export const fetchRolesAction: any = createAction(
    'staff/FETCH_ROLES',
    async () =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<{ itemsResRoles: any }> => {
            const state = getState();
            return axios
                .get(`/staff/roles`)
                .then((res: any) => ({
                    itemsResRoles: res.data
                }));
        }
);

export const findUserAction: any = createAction(
    'staff/FIND_USER',
    async (query: string) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`/user/search?str=${query}`)
                .then((res: any) => res.data);
        }
);
export const changeStaffColorAction: any = createAction(
    'staff/CHANGE_COLOR',
    async (id: string, color: string) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`/staff/setColor?color=${color}&staffId=${id}`)
                .then(async () => {
                    // dispatch(setSuccessToastAction('Color has been changed'));
                });
        }
);
export const changeStaffRoleAction: any = createAction(
    'staff/CHANGE_ROLE',
    async (id: string, role: string) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`/staff/setRole?role=${role}&staffId=${id}`)
                .then(async () => {
                    // dispatch(setSuccessToastAction('Role has been changed'));
                });
        }
);
export const changeStaffPermissionAction: any = createAction(
    'staff/CHANGE_PERMISSION',
    async (id: number, permissionId: number) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();
            return axios
                .get(`/staff/setPermission?permissionId=${permissionId}&staffId=${id}`)
                .then(async () => {
                    // dispatch(setSuccessToastAction('Permission has been changed'));
                    // dispatch(fetchRolesAction());
                });
        }
);

export const inviteAction: any = createAction(
    'staff/INVITE',
    async (id: number) =>
        (dispatch: Type.Dispatch, getState: () => State.Root): Promise<void> => {
            const state = getState();

            return
            // return axios
            //     .post(
            //         `${baseUrl}/user/invite`,
            //         { id: id },
            //         {
            //             headers: {
            //                 ...authHeader(state.user.user.email)
            //             }
            //         }
            //     )
            //     .then(async () => {
            //         dispatch(setSuccessToastAction('User has been invited'));
            //     });
        }
);
export const setActiveTabAction: any = createAction('staff/SET_ACTIVE_TAB');
