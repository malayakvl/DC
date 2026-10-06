export type DayColumn = {
  id: string;
  cabinet: any;
  doctor: any;
};

const hasId = (item: any, id: string) => String(item.id) === id;

/**
 * Builds only the resource columns requested by the two scheduler filters.
 * With no filters, the day view retains the existing cabinet × doctor matrix.
 */
export function buildDayColumns(
  cabinets: any[] = [],
  doctors: any[] = [],
  cabinetId = '',
  doctorId = ''
): DayColumn[] {
  const visibleCabinets = cabinetId
    ? cabinets.filter((cabinet) => hasId(cabinet, cabinetId))
    : cabinets;
  const visibleDoctors = doctorId ? doctors.filter((doctor) => hasId(doctor, doctorId)) : doctors;

  return visibleCabinets.flatMap((cabinet) =>
    visibleDoctors.map((doctor) => ({
      id: `${cabinet.id}-${doctor.id}`,
      cabinet,
      doctor,
    }))
  );
}
