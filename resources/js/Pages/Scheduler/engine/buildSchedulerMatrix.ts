export function buildSchedulerMatrix(cabinets: any, doctors: any, events: any) {
  return cabinets.map((cabinet: any) => {
    return {
      cabinetId: cabinet.id,
      cabinetName: cabinet.name,

      doctors: doctors.map((doctor: any) => {
        const doctorEvents = events.filter(
          (e: any) => e.cabinetId === cabinet.id && e.doctorId === doctor.id
        );

        return {
          doctorId: doctor.id,
          doctorName: doctor.name,
          events: doctorEvents,
        };
      }),
    };
  });
}
