export const doctors = [
    { id: 1, name: "Sergey" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Iryna" },
];

export const cabinets = [
    { id: 1, name: "Cabinet 1" },
    { id: 2, name: "Cabinet 2" },
];

export const events = [
    {
        id: 1,
        cabinetId: 1,
        doctorId: 1,
        title: "Caries",
        patient: "Anna Petrova",
        start: "2026-06-21T09:00:00",
        end: "2026-06-21T09:30:00",
    },
    {
        id: 2,
        cabinetId: 1,
        doctorId: 2,
        title: "Cleaning",
        patient: "Ivan",
        start: "2026-06-21T09:15:00",
        end: "2026-06-21T10:00:00",
    },
    {
        id: 3,
        cabinetId: 2,
        doctorId: 1,
        title: "Consultation",
        patient: "Olga",
        start: "2026-06-21T10:00:00",
        end: "2026-06-21T10:30:00",
    },
];