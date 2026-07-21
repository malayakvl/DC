export function buildSchedulerMatrix(cabinets, doctors, events) {
    return cabinets.map((cabinet) => {
        return {
            cabinetId: cabinet.id,
            cabinetName: cabinet.name,

            doctors: doctors.map((doctor) => {
                const doctorEvents = events.filter(
                    (e) =>
                        e.cabinetId === cabinet.id &&
                        e.doctorId === doctor.id
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