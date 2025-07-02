<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\ClinicUser;
use App\Models\DocumentOperations;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Rap2hpoutre\FastExcel\FastExcel;
use File;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Reader\Xls;

class ImportController extends Controller
{
    //
    function __construct()
    {
    }


    public function index(Request $request) {
        if ($request->user()->can('import')) {
            return Inertia::render('Import/Index', [
            ]);
        } else {
            return Inertia::render('Layout/NoPermission', []);
        }
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
            \Log::warning("Некорректная строка для парсинга: " . json_encode($string));
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
            \Log::warning("Не удалось разобрать строку: " . $string);
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

    public function update(Request $request) {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        if ($request->user()->can('import')) {
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

                    // Счетчик для логов и уникальных email
                    $rowCount = 0;
                    $emailCounter = 0;

                    // Обработка в транзакции для целостности
                    DB::transaction(function () use ($lazyCollection, $batchSize, &$rowCount, &$emailCounter, &$clinicData) {
                        $lazyCollection->chunk($batchSize)->each(function ($chunk) use (&$rowCount, &$emailCounter, &$clinicData) {
                            // Преобразование чанка в массив для вставки
                            $dataToInsert = $chunk->map(function ($row) use (&$emailCounter, &$clinicData) {
                                // Парсинг данных пациента
                                $pData = $this->parsePersonData($row['Пацієнт']);
                                $gender = '';
                                if ($row['Стать'] === 'Чоловік') {
                                    $gender = 'male';
                                } else if ($row['Стать'] === 'Жінка') {
                                    $gender = 'female';
                                }
                                $dateB = null;
                                if ($row['Дата народження']) {
                                    $dateB = Carbon::createFromFormat('d.m.Y', $row['Дата народження'])->format('Y-m-d');
                                }

                                $dtBalance = $row['Оплачено'];
                                $ktBalance = $row['Виконано на суму'];
//                                dd($dtBalance);exit;
                                $dateR = null;
                                if ($row['Дата реєстрації']) {
                                    $dateR = Carbon::createFromFormat('d.m.Y', $row['Дата реєстрації'])->format('Y-m-d');
                                }
                                // Генерация уникального email
                                $email = $row['email'] ?? date('YmdHis') . '_' . $emailCounter++ . '@noemail.com';

                                return [
                                    'first_name' => $pData['name'] ?? null,
                                    'last_name' => $pData['surname'] ?? null,
                                    'patronomic_name' => $pData['patronymic'] ?? null,
                                    'discount' => $pData['percent'] ?? null,
                                    'phone' => $row['Телефон'] ?? null,
                                    'gender' => $gender ?: null,
                                    'birthday' => $dateB,
                                    'register_date' => $dateR,
                                    'email' => $email,
                                    'dt_balance' => $dtBalance,
                                    'kt_balance' => $ktBalance,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ];
                            })->filter(function ($row) {
                                // Фильтрация некорректных строк
                                return !is_null($row['first_name']);
                            })->toArray();

                            if (!empty($dataToInsert)) {
                                // Вставка в таблицу patients
                                DB::table('patients')->insert($dataToInsert);
                                $rowCount += count($dataToInsert);
                                \Log::info("Обработано и добавлено в базу: " . $rowCount . " строк");

                                // Получение ID вставленных записей по email
                                $emails = array_column($dataToInsert, 'email');
                                $insertedPatients = DB::table('patients')
                                    ->whereIn('email', $emails)
                                    ->pluck('id', 'email')
                                    ->toArray();

                                // Подготовка данных для pivot-таблицы
                                $pivotData = array_map(function ($row) use ($insertedPatients, $clinicData) {
                                    return [
                                        'patient_id' => $insertedPatients[$row['email']] ?? null,
                                        'filial_id' => 1,
                                        'clinic_id' => $clinicData->id, // Замените на нужный clinic_id
                                        'created_at' => now(),
                                        'updated_at' => now(),
                                    ];
                                }, $dataToInsert);



                                // Вставка в pivot-таблицу
                                DB::table('clinic_patient')->insert($pivotData);
                                \Log::info("Добавлено в pivot-таблицу: " . count($pivotData) . " записей");
                            }

                            gc_collect_cycles(); // Очистка памяти
                        });
                    });

                    \Log::info("Всего загружено в базу: " . $rowCount . " строк");

                } catch (\Exception $e) {
                    \Log::error("Ошибка при загрузке в базу: " . $e->getMessage());
                    return response()->json(['error' => $e->getMessage()], 500);
                }
            }
            if ($extension === 'json') {
                $contents = File::get((public_path('clinic-import/patients/'.$fileName)));
                $jsonData = json_decode(json: $contents, associative: true);
                foreach ($jsonData as $doctor) {
                    $user = new User();
                    $user->name = $doctor['lastname'].' '.$doctor['firstname'];
                    $user->email = $doctor['phone'];
                    $user->password = Hash::make($doctor['phone']);
                    $user->first_name = $doctor['firstname'];
                    $user->last_name = $doctor['lastname'];
                    $user->phone = $doctor['phone'];
                    $user->save();

                    $clinicUser = new ClinicUser();
                    $clinicUser->clinic_id = $clinicData->id;
                    $clinicUser->user_id = $user->id;
                    if ($doctor['role'] === 'MANAGER') {
                        $clinicUser->role_id = 9;
                    } else if ($doctor['role'] === 'DOCTOR') {
                        $clinicUser->role_id = 15;
                    } else if ($doctor['role'] === 'ADMINISTRATOR') {
                        $clinicUser->role_id = 10;
                    }
                    $clinicUser->save();

                    DB::table('clinic_patient')->insert(
                        [
                            'patient_id' => $user->id,
                            'filial_id' => $request->session()->get('filial_id'),
                            'clinic_id' => $clinicData->id
                        ]
                    );
                }

            }
        }
    }
}
