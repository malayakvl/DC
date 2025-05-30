import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.staffs,
    (staffs: State.Staffs): State.Staffs => staffs
);

export const paginatedProductsSelector = createSelector(
    rootSelector,
    (staffs: State.Staffs): Staffs.DataItem[] => staffs.items
);
export const paletterDataSelector = (state) => state.staff.staffColor;
// export const staffByRoleSelector = createSelector(
//     rootSelector,
//     (staffs: State.Staffs): any => staffs.itemsByRoles
// );
// export const rolesSelector = createSelector(
//     rootSelector,
//     (staffs: State.Staffs): string[] => staffs.roles
// );
//
// export const activeTabSelector = createSelector(
//     rootSelector,
//     (staffs: State.Staffs): string => staffs.activeTab
// );
//
// export const suggestionsSelector = createSelector(
//     rootSelector,
//     (staffs: State.Staffs): any => staffs.suggestionsResult
// );
//
// export const itemResRolesSelector = createSelector(
//     rootSelector,
//     (staffs: State.Staffs): Staffs.DataRoleItem => staffs.itemsResRoles
// );
