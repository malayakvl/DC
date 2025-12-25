<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicUser;
use App\Models\User;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\LazyCollection;
use Inertia\Inertia;
use Rap2hpoutre\FastExcel\FastExcel;
use Illuminate\Support\Facades\File;

class ImportController extends Controller
{
    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;
    //
    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
    }

    private function withClinicSchema(Request $request, \Closure $callback)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        try {
            DB::statement("SET search_path TO clinic_{$clinicId}");
            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    public function index(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('clinic-create')) {
                return Inertia::render('Layout/Error', ['error' => 'Insufficient permissions']);
            }
            return Inertia::render('Import/Index', [
            ]);
        });

    }

    public function parsePersonData($string) {
        $result = [
            'surname' => null,
            'name' => null,
            'patronymic' => null,
            'percent' => null,
        ];

        // Проверка на пустую строку
        if (empty($string) || !is_string($string)) {
            Log::warning("Некорректная строка для парсинга: " . json_encode($string));
            return $result;
        }

        // Извлечение процента скидки
        if (preg_match('/\(-(\d+)%[^)]*\)/', $string, $matches)) {
            $result['percent'] = (int) $matches[1];
            $string = preg_replace('/\(-(\d+)%[^)]*\)/', '', $string);
        }

        // Удаляем лишние пробелы
        $string = trim($string);

        // Разбиваем строку на части
        $parts = array_filter(explode(' ', $string), function ($part) {
            return !empty($part);
        });

        // Назначаем части в зависимости от их количества
        if (empty($parts)) {
            Log::warning("Не удалось разобрать строку: " . $string);
            return $result;
        }

        $parts = array_values($parts); // Переиндексируем массив

        if (count($parts) >= 3) {
            $result['surname'] = $parts[0];
            $result['name'] = $parts[1];
            $result['patronymic'] = $parts[2];
        } elseif (count($parts) == 2) {
            $result['surname'] = $parts[0];
            $result['name'] = $parts[1];
        } elseif (count($parts) == 1) {
            $result['surname'] = $parts[0];
        }

        return $result;
    }

    function generateDoctorEmail(string $lastName, string $firstName, ?int $clinicId = null): string
    {
        $base = $lastName . '.' . $firstName;

        // 1) Попытка через intl (Transliterator) — лучше всего
        $transliterated = null;
        if (class_exists(\Transliterator::class)) {
            $trans = \Transliterator::create('Any-Latin; Latin-ASCII; NFD; [:Nonspacing Mark:] Remove; NFC');
            if ($trans) {
                $transliterated = $trans->transliterate($base);
            }
        }

        // 2) Фоллбэк на iconv, если intl недоступен
        if ($transliterated === null) {
            $transliterated = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $base);
        }

        // 3) Нормализация в нижний регистр и замена всего, что не a-z0-9, на '-'
        $slug = strtolower($transliterated ?: $base);
        $slug = preg_replace('/[^a-z0-9]+/i', '-', $slug);
        $slug = trim($slug, '-');

        // 4) Если получилось пусто — fallback
        if (empty($slug)) {
            $slug = 'doctor-' . uniqid();
        }

        // Опционально: добавить clinicId, чтобы гарантировать уникальность между клиниками
        if ($clinicId) {
            $slug .= '-' . $clinicId;
        }

        return $slug . '@clinicdoctor.com';
    }

    private function processEmployees($employees, $clinicData, $request = null)
    {
        // Remove duplicates from the employees array
        $uniqueEmployees = array_unique($employees, SORT_REGULAR);
        if (count($uniqueEmployees) > 0) {
            foreach ($uniqueEmployees as $employeeData) {
                // Определяем формат данных - строка (Фамилия Имя) или массив (из JSON)
                if (is_string($employeeData)) {
                    // Разбиваем "Фамилия Имя"
                    $parts = preg_split('/\s+/', trim($employeeData));
                    if (count($parts) < 2) {
                        Log::warning("Некорректное имя сотрудника: " . $employeeData);
                        continue;
                    }
                    $lastName = $parts[0];
                    $firstName = $parts[1];
                } else if (is_array($employeeData) && isset($employeeData['lastname']) && isset($employeeData['firstname'])) {
                    // Данные из JSON
                    $lastName = $employeeData['lastname'];
                    $firstName = $employeeData['firstname'];
                } else {
                    Log::warning("Некорректный формат данных сотрудника: " . json_encode($employeeData));
                    continue;
                }

                // Ищем сотрудника в core.users
                $existingUser = User::where('first_name', $firstName)
                    ->where('last_name', $lastName)
                    ->first();
                // Создаём, если нет
                if (!$existingUser) {
                    $email = $this->generateDoctorEmail($firstName, $lastName, $clinicData->id);

                    try {
                        $existingUser = User::create([
                            'name'       => $lastName . ' ' . $firstName,
                            'first_name' => $firstName,
                            'last_name'  => $lastName,
                            'email'      => $email,
                            'password'   => Hash::make('doctor123'),
                        ]);

                        Log::info("Создан новый сотрудник: {$existingUser->id}");
                    } catch (\Exception $e) {
                        Log::error("Ошибка при создании сотрудника {$lastName} {$firstName}: " . $e->getMessage());
                        continue;
                    }
                }
                // Проверяем существование связи в clinic_{id}.clinic_users
                ClinicUser::createInCore([
                    'clinic_id' => $clinicData->id,
                    'user_id' => $existingUser->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                // try {
                //     // Используем правильное переключение схемы для доступа к таблице clinic_users
                //     $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
                //     DB::statement("SET search_path TO clinic_{$clinicData->id}");
                //     $existsPivot = DB::table("clinic_users")
                //         ->where('clinic_id', $clinicData->id)
                //         ->where('user_id', $existingUser->id)
                //         ->exists();

                //     if (!$existsPivot) {
                //         // Получаем ID роли из таблицы roles схемы клиники по имени
                //         $roleName = 'doctor'; // по умолчанию
                //         if (is_array($employeeData) && isset($employeeData['role'])) {
                //             $roleName = strtolower($employeeData['role']);
                //         }
                        
                //         // Получаем ID роли из таблицы roles в схеме клиники
                //         $roleRecord = DB::table('roles')->where('name', $roleName)->first();
                //         if ($roleRecord) {
                //             $roleId = $roleRecord->id;
                //         } else {
                //             // Если роль не найдена, используем значение по умолчанию
                //             $roleId = 15; // DOCTOR по умолчанию
                //         }
                        
                //         $insertResult = DB::table("clinic_users")->insert([
                //             'clinic_id'  => $clinicData->id,
                //             'user_id'    => $existingUser->id,
                //             'role_id'    => $roleId,
                //             'created_at' => now(),
                //             'updated_at' => now(),
                //         ]);
                        
                //         if ($insertResult) {
                //             Log::info("Пользователь {$existingUser->id} успешно привязан к clinic_{$clinicData->id}.clinic_users с ролью {$roleId}");
                //         } else {
                //             Log::warning("Не удалось привязать пользователя {$existingUser->id} к clinic_{$clinicData->id}.clinic_users");
                //         }
                //     }       
                    
                //     // Добавляем логирование через AuditLogService если доступен request
                //     if ($request) {
                //         $this->auditLogService->log(
                //             $request->user(), 
                //             'employee_imported', 
                //             null, 
                //             null, 
                //             ['user_id' => $existingUser->id, 'clinic_id' => $clinicData->id]
                //         );
                //     }

                //     // Восстанавливаем исходный search_path
                //     DB::statement("SET search_path TO {$originalSearchPath}");
                // } catch (\Exception $e) {
                //     // Восстанавливаем исходный search_path в случае ошибки
                //     if (isset($originalSearchPath)) {
                //         DB::statement("SET search_path TO {$originalSearchPath}");
                //     }
                //     Log::error("Ошибка при проверке/привязке пользователя {$existingUser->id} к clinic_{$clinicData->id}.clinic_users: " . $e->getMessage());
                // }
            }
        }
        // Return the count of processed employees
        return count($uniqueEmployees);
    }

    public function update(Request $request) {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        if ($request->user()->can('import') || $request->user()->canClinic('clinic-create')) {
            $filialId = $request->session()->get('filial_id');
            if ($request->file) {
                $extension = $request->file->extension();
                $fileName = 'Clinic'.$clinicData->id.'.'.$request->file->extension();
                $request->file->move(public_path('clinic-import/patients'), $fileName);
            }
            if ($extension === 'xlsx') {
                $filePath = public_path('clinic-import/patients/' . $fileName);
                $batchSize = 1000; // Number of rows per chunk
                $resultCollection = collect(); // Final collection
                $emailCounter = 0;
                try {
                    // Увеличение времени выполнения и лимита памяти
                    ini_set('max_execution_time', 300);
                    ini_set('memory_limit', '512M');

                    // Импорт файла в LazyCollection
                    $lazyCollection = LazyCollection::make(function () use ($filePath) {
                        $data = (new FastExcel)->import($filePath);
                        foreach ($data as $row) {
                            yield $row;
                        }
                    });

                    // Обработка в транзакции для целостности
                    $allEmployees = [];
                    DB::transaction(function () use ($lazyCollection, $batchSize, &$clinicData, &$allEmployees) {
                        $lazyCollection->chunk($batchSize)->each(function ($chunk) use (&$clinicData, &$allEmployees) {
                            $employees = $chunk->map(function ($row) use (&$clinicData) {
                                return $row['Куратор'];
                            })->toArray();

                            // Собираем всех сотрудников для последующей обработки
                            $allEmployees = array_merge($allEmployees, $employees);

                            gc_collect_cycles(); // Очистка памяти
                        });
                    });

                    // Обрабатываем сотрудников после завершения транзакции пациентов
                    $employeeCount = 0;
                    if (!empty($allEmployees)) {
                        $this->processEmployees($allEmployees, $clinicData, $request);
                        $employeeCount = count(array_unique(array_filter($allEmployees)));
                    }

                    // Добавляем одну запись в лог через AuditLogService
                    $this->auditLogService->log(
                        $request->user(),
                        'employee_import',
                        null,
                        null,
                        ['employee_count' => $employeeCount, 'file_name' => $fileName]
                    );

                } catch (\Exception $e) {
                    Log::error("Ошибка при загрузке в базу: " . $e->getMessage());
                    return Inertia::render('Import/Index', [
                        'error' => $e->getMessage()
                    ]);
                }
            }
            if ($extension === 'json') {
                $contents = File::get((public_path('clinic-import/patients/'.$fileName)));
                $jsonData = json_decode(json: $contents, associative: true);
                
                // Обрабатываем только сотрудников из JSON
                $employeeCount = 0;
                if (!empty($jsonData)) {
                    $this->processEmployees($jsonData, $clinicData, $request);
                    $employeeCount = count($jsonData);
                }
                
                // Добавляем одну запись в лог через AuditLogService
                $this->auditLogService->log(
                    $request->user(),
                    'employee_import',
                    null,
                    null,
                    ['employee_count' => $employeeCount, 'file_name' => $fileName, 'format' => 'json']
                );
            }
            return redirect()->back()->with([
                'message' => 'Данные успешно загружены',
                'success' => true,
                'employee_count' => $employeeCount,
                'file_name' => $fileName,
                'format' => $extension,
            ]);
        }
    }
}
