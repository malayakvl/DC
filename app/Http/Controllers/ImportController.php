<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicUser;
use App\Models\User;
use App\Models\Patient;
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
        // if ($clinicId) {
        //     $slug .= '-' . $clinicId;
        // }

        return $slug . '@clinicdoctor.com';
    }

    function generatePatientEmail(string $lastName, string $firstName, string $phone): string
    {
        if ($phone) {
            return $phone . '@clinicpatient.com';
        } 
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
        // if ($clinicId) {
        //     $slug .= '-' . $clinicId;
        // }

        return $slug . '@clinicpatient.com';
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
            }
        }
        // Return the count of processed employees
        return count($uniqueEmployees);
    }


    private function importPatientRow($patientData, $clinicData)
    {
        // 1. Получаем и чистим имя
        $rawName = trim($patientData['Пацієнт']);
        preg_match('/\((-?\d+)%\)/u', $rawName, $m);
        $discount = isset($m[1]) ? (int)$m[1] : 0;
        $cleanName = trim(preg_replace('/\s*\(-?\d+%\)\s*/u', ' ', $rawName));
        [$last, $first, $middle] = array_pad(explode(' ', $cleanName, 3), 3, null);

        // 2. Статус пациента
        $statusName = trim($patientData['Статус пацієнта']); // "Новий"
        $statusId = $this->resolvePatientStatus($statusName, $clinicData->id);

        // 3. Телефон
        $phone = trim($patientData['Телефон']);
        
        // 4. Ищем пользователя в core.users
        $user = User::firstOrCreate(
            ['first_name' => $first, 'last_name' => $last],
            [
                'name' => "$last $first",
                'email' => $this->generatePatientEmail($first, $last, $phone),
                'password' => Hash::make('patient123')
            ]
        );

        // 5. Создаём связь с клиникой в core.clinic_users
        ClinicUser::firstOrCreate([
            'clinic_id' => $clinicData->id,
            'user_id' => $user->id
        ]);

        // 6. Создаём запись пациента в локальной таблице клиники
        // Проверяем существование пациента в схеме клиники
        $existingPatient = DB::table("clinic_{$clinicData->id}.patients")
            ->where('user_id', $user->id)
            ->first();
        
        if ($existingPatient) {
            $patient = $existingPatient;
        } else {
            // Создаём нового пациента
            $patientId = DB::table("clinic_{$clinicData->id}.patients")->insertGetId([
                'user_id' => $user->id,
                'medical_card_no' => $patientData['Номер картки'] ?? null,
                'registered_at' => $patientData['Дата реєстрації'] ?? now(),
                'discount' => $discount,
                'balance' => $patientData['Баланс'] ?? 0,
                'visits_count' => $patientData['Було візитів'] ?? 0,
                'last_visit' => $patientData['Останній візит'] ?? null,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            // Получаем созданного пациента
            $patient = DB::table("clinic_{$clinicData->id}.patients")
                ->where('id', $patientId)
                ->first();
        }

        return $patient;
    }

    private function importPatientWithActsAndPayments(array $patientData, $clinicData, $filialId, array $actsData = [], array $paymentsData = [])
    {
        // ---------------------------
        // 1️⃣ Пользователь в core.users
        // ---------------------------
        $rawName = trim($patientData['Пацієнт']);
        preg_match('/\((-?\d+)%\)/u', $rawName, $m);
        $discount = isset($m[1]) ? (int)$m[1] : 0;
        $cleanName = trim(preg_replace('/\s*\(-?\d+%\)\s*/u', ' ', $rawName));
        [$last, $first, $middle] = array_pad(explode(' ', $cleanName, 3), 3, null);
        $phone = trim($patientData['Телефон']);
        
        $user = User::firstOrCreate(
            ['first_name' => $first, 'last_name' => $last],
            [
                'name' => "$last $first",
                'email' => $this->generatePatientEmail($first, $last, $phone),
                'password' => Hash::make('patient123')
            ]
        );

        // ---------------------------
        // 2️⃣ Связь с клиникой в core.clinic_users
        // ---------------------------
        ClinicUser::firstOrCreate([
            'clinic_id' => $clinicData->id,
            'user_id' => $user->id
        ]);

        // ---------------------------
        // 3️⃣ Локальный пациент в clinic_{id}.patients
        // ---------------------------
        $statusName = trim($patientData['Статус пацієнта']);
        $statusId = $this->resolvePatientStatus($statusName, $clinicData->id);

        $patient = DB::table("clinic_{$clinicData->id}.patients")->updateOrInsert(
            ['user_id' => $user->id],
            [
                'medical_card_no' => $patientData['Номер картки'] ?? null,
                'registered_at' => $patientData['Дата реєстрації'] ?? now(),
                'discount' => $discount,
                'balance' => $patientData['Баланс'] ?? 0,
                'visits_count' => $patientData['Було візитів'] ?? 0,
                'last_visit' => $patientData['Останній візит'] ?? null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        );

        // Получаем id пациента
        $patientRecord = DB::table("clinic_{$clinicData->id}.patients")
            ->where('user_id', $user->id)
            ->first();

        $patientId = $patientRecord->id;

        // ---------------------------
        // 4️⃣ Импорт актов
        // ---------------------------
        $actIds = [];
        $workAmount = $patientData['Виконано на суму'] ?? 0;
        $paymentAmount = $patientData['Оплачено'] ?? 0;
        if ($workAmount > 0) {
            $price = DB::table("clinic_{$clinicData->id}.pricings")
                ->where('name', 'Переніс даних')
                ->first();
            // if (!$priceItem) {
            //     Log::warning("Услуга {$priceItem['name']} не найдена в клинике {$clinicData->id} среди перенесённых данных");
            //     return false; // или return false; в зависимости от логики вашего кода
            // }
            $lastInvoiceNum = DB::table("clinic_{$clinicData->id}.acts")
                    ->max('act_number');
            if (!$lastInvoiceNum) {
                $num = 1;
            } else {
                $maxNum = (explode('-', $lastInvoiceNum));
                if (intval($maxNum[1])) {
                    $num = intval($maxNum[1]);
                }
                ++$num;
            }
            $invoice_number = date("dmy").'-'.$paddedNumber = str_pad($num, 7, '0', STR_PAD_LEFT);;
            $actId = DB::table("clinic_{$clinicData->id}.acts")->insertGetId([
                'patient_id' => $patientId,
                'doctor_id' => 55,
                'filial_id' => $filialId,
                'act_number' => $invoice_number,
                'act_date' => date('Y-m-d H:i:s'),
                'total_amount' => $workAmount,
                'status' => 'posted',
                'created_at' => now(),
                'updated_at' => now()
            ]);
            DB::table("clinic_{$clinicData->id}.act_items")->insert([
                'act_id' => $actId,
                'service_id' => $price->id,
                'qty' => 1,
                'price' => $workAmount,
                'total' => $workAmount,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        

        // ---------------------------
        // 5️⃣ Импорт платежей
        // ---------------------------
        if ($paymentAmount > 0) {
            DB::table("clinic_{$clinicData->id}.payments")->insert([
                'patient_id' => $patientId,
                'filial_id' => $filialId,
                'act_id' => $actId,
                'payment_date' => date('Y-m-d H:i:s'),
                'amount' => $paymentAmount,
                'method' => 'cash',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        

        return $patientRecord;
    }


    private function resolvePatientStatus(string $statusName, $clinicId): int
    {
        $statusName = trim($statusName);
        
        // Ищем статус по имени
        $status = DB::table("clinic_{$clinicId}.patient_statuses")
            ->where('name', $statusName)
            ->first();

        if ($status) {
            return $status->id;
        }

        // Если нет — создаём новый
        return DB::table("clinic_{$clinicId}.patient_statuses")->insertGetId([
            'name' => $statusName,
            'discount' => 0, // можно изменить, если нужно
            'created_at' => now(),
            'updated_at' => now(),
        ]);
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
            if ($extension === 'xlsx' && $request->get('type') === 'customers') {
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
            if ($extension === 'xlsx' && $request->get('type') === 'patients') {
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
                    $filialId = $request->session()->get('filial_id');
                    $lazyCollection->each(function ($row) use ($clinicData, $filialId) {
                        DB::transaction(function () use ($row, $clinicData, $filialId) {
                            try {
                                $this->importPatientWithActsAndPayments($row, $clinicData, $filialId);
                            } catch (\Exception $e) {
                                dd($e->getMessage());exit;
                                Log::error('Error importing patient row: ' . $e->getMessage(), [
                                    'row_data' => $row,
                                    'error' => $e->getMessage(),
                                    'trace' => $e->getTraceAsString()
                                ]);
                                // Re-throw the exception to rollback the transaction for this row
                                throw $e;
                            }
                        });
                    });
                    

                    // Добавляем одну запись в лог через AuditLogService
                    $this->auditLogService->log(
                        $request->user(),
                        'patient_import',
                        null,
                        null,
                        ['file_name' => $fileName]
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
                'employee_count' => @intval($employeeCount) ?: 0,
                'file_name' => $fileName,
                'format' => $extension,
            ]);
        }
    }
}
