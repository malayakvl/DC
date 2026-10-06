// ------------------------------------
// Selectors
// ------------------------------------
export const actItemsSelector = (state) => state.act.actItems;
export const invoiceTaxSelector = (state) => state.act.invoiceTax;
export const tableErrorSelector = (state) => state.act.showTableError;
export const actFiltersSelector = (state) => state.act.filters;
export const actClearFiltersSelector = (state) => state.act.isClear;
export const actDeficitsErrorSelector = (state) => state.act.actItemsError;
