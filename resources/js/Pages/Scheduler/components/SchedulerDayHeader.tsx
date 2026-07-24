type SchedulerDayHeaderProps = {
  day: { label: string };
  isToday: boolean;
  cabinets: any[];
  people: any[];
  doctorWidth: number;
  todayBg: string;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export default function SchedulerDayHeader({
  day,
  isToday,
  cabinets,
  people,
  doctorWidth,
  todayBg,
}: SchedulerDayHeaderProps) {
  return (
    <div
      className={'calendar-header-content'}
      style={{
        flexShrink: 0,
        background: '#fff',
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,.05)',
      }}
    >
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '0.05em',
          background: isToday ? todayBg : '#f8fafc',
          boxShadow: 'inset 0 -2px 0 #e2e8f0',
        }}
      >
        {day.label.toUpperCase()}
      </div>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 70,
            flexShrink: 0,
            background: '#fff',
            borderRight: '2px solid #e2e8f0',
            borderLeft: '1px solid #e2e8f0',
            height: '115px',
          }}
        />
        <div style={{ display: 'flex', flex: 1 }}>
          {cabinets.map((cab, cabIdx) => (
            <div
              key={cab.id}
              style={{
                flex: 1,
                borderRight: cabIdx < cabinets.length - 1 ? '2px solid #94a3b8' : 'none',
              }}
            >
              <div
                style={{
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  background: '#f1f5f9',
                  color: '#334155',
                  boxShadow: 'inset 0 -1px 0 #cbd5e1',
                }}
              >
                {cab.cabinet_name}
              </div>
              <div style={{ display: 'flex', height: 34 }}>
                {people.map((doc, docIdx) => {
                  const fullName = doc.name || doc.label || '';
                  const initials = getInitials(fullName);
                  // Используем цвет из базы, либо генерируем дефолтный серый/синий для заглушки
                  const avatarBg = doc.color || '#94a3b8';

                  return (
                    <div
                      key={doc.id}
                      style={{
                        width: doctorWidth,
                        flexShrink: 0,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column', // Элементы друг под другом
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '70px',
                        padding: '4px 2px',
                        background: '#fff',
                        borderRight:
                          docIdx < people.length - 1 ? '1px solid #e2e8f0' : '1px solid #e2e8f0',
                        minWidth: 0, // Важно для работы text-overflow: ellipsis в flex-контейнерах
                      }}
                    >
                      {/* КРУГЛЫЙ АВАТАР */}
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: avatarBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#fff',
                          overflow: 'hidden',
                          marginBottom: 2,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                        title={fullName} // При наведении покажет полное имя
                      >
                        {doc.avatar ? (
                          <img
                            src={`/storage/${doc.avatar}`} // Корректируй путь в зависимости от твоего Laravel Storage
                            alt={fullName}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              // Если картинка не прогрузилась — покажем инициалы
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      {/* ТЕКСТ ПОД АВАТАРОМ С АВТО-СОКРАЩЕНИЕМ */}
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: '#334155',
                          textAlign: 'center',
                          width: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis', // Добавит "..." если имя всё равно слишком длинное
                          padding: '0 2px',
                        }}
                        title={fullName} // При наведении покажет полное имя
                      >
                        {fullName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
