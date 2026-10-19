// ------------------------------------
// Selectors
// ------------------------------------
export const actItemsSelector = (state: any) => state.act.actItems;
export const invoiceTaxSelector = (state: any) => state.act.invoiceTax;
export const tableErrorSelector = (state: any) => state.act.showTableError;
export const actFiltersSelector = (state: any) => state.act.filters;
export const actClearFiltersSelector = (state: any) => state.act.isClear;
export const actDeficitsErrorSelector = (state: any) => state.act.actItemsError;
