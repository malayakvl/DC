type ScheduleTab = 'patients' | 'visits' | 'plans';

const isRoleGroup = (group: any, role: string) =>
  group.label === `roles.${role}` ||
  group.options?.some((person: any) => person.role_name === role);

/** Returns people for the active scheduler tab without depending on translated group labels. */
export function getSchedulePeople(groups: any[] = [], tab: ScheduleTab | string) {
  const doctors = groups.filter((group) => isRoleGroup(group, 'doctor'));
  const assistants = groups.filter((group) => isRoleGroup(group, 'assistant'));

  switch (tab) {
    case 'visits':
      return assistants.flatMap((group) => group.options || []);
    case 'plans':
      return groups
        .filter((group) => !doctors.includes(group) && !assistants.includes(group))
        .flatMap((group) => group.options || []);
    case 'patients':
    default:
      return doctors.flatMap((group) => group.options || []);
  }
}
