<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Customer;
use App\Models\Filial;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use App\Services\CustomerService;
use App\Services\AuditLogService;

class CustomerController extends Controller
{
    protected AuditLogService $auditLogService;

    protected CustomerService $customerService;
    /**
     * Helper для работы с текущей схемой клиники
     */
    public function __construct(AuditLogService $auditLogService, CustomerService $customerService)
    {
        $this->auditLogService = $auditLogService;
        $this->customerService = $customerService;
    }
    
    private function withClinicSchema(Request $request, \Closure $callback)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");
            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial($clinicId);

            // Проверка прав
            if (!$request->user()->canClinic('customer-view')) {
                return Inertia::render('Customer/List', ['error' => 'Insufficient permissions']);
            }

            // 1️⃣ Получаем филиалы клиники (уже ОК, они в clinic_{id})
            $filialData = ClinicFilial::where('clinic_id', $clinicId)->get();

            // 2️⃣ Получаем сотрудников через core.clinic_user
            $customerData = DB::table('core.clinic_user as cu')
                        ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                        ->where('cu.clinic_id', $clinicId)
                        ->whereNull('pt.id') // 💥 вот ключевая строка
                        ->select(
                            'u.id',
                'u.first_name',
                'u.last_name',
                'u.email',
                'cu.avatar'
            )
            ->orderBy('u.last_name')
            ->get();

            return Inertia::render('Customer/List', [
                'clinicData'   => $clinicData,
                'filialData'   => $filialData,
                'customerData' => $customerData,
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $formData = new User();
        $rolesData = Role::all();
        return Inertia::render('Customer/CustomerCreate', [
            'clinicData' => $clinicData,
            'formData' => $formData,
            'roleData' => $rolesData
        ]);
    }

    public function salaryCalc(Request $request, $userId)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $userId) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $filialId = $request->session()->get('filial_id');
            $schema = "clinic_{$clinicId}";

            // 1. Отримуємо співробітника
            $usersData = DB::table('core.users')
                ->join('core.clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->leftJoin("{$schema}.clinic_filial_user as cfu", function($join) use ($clinicId, $filialId) {
                    $join->on('users.id', '=', 'cfu.user_id')
                        ->where('cfu.clinic_id', $clinicId)
                        ->where('cfu.filial_id', $filialId);
                })
                ->select(
                    'users.*',
                    'clinic_user.avatar',
                    'cfu.color',
                    'cfu.phone',
                    'cfu.inn'
                )
                ->where('users.id', $userId)
                ->where('clinic_user.clinic_id', $clinicId)
                ->first();

            // 2. Отримуємо категорії прайсу
            $priceCategories = DB::table("{$schema}.price_categories")
                ->select('id', 'name')
                ->orderBy('id')
                ->get();

            // 3. Отримуємо збережені налаштування зарплати для цього співробітника
            $salarySetting = DB::table("{$schema}.employee_salary_settings")
                ->where('user_id', $userId)
                ->first();

            // 4. Отримуємо збережені відсотки по категоріях, якщо налаштування існують
            $categoryCommissions = [];
            if ($salarySetting) {
                $commissions = DB::table("{$schema}.employee_category_commissions")
                    ->where('employee_salary_setting_id', $salarySetting->id)
                    ->get();

                foreach ($commissions as $comm) {
                    $categoryCommissions[$comm->category_id] = [
                        'enabled' => true,
                        'percentage' => $comm->percentage,
                    ];
                }
            }

            return Inertia::render('Customer/SalaryCalc', [
                'clinicData' => $clinicData,
                'usersData' => $usersData,
                'priceCategories' => $priceCategories,
                'salarySettings' => [
                    'base_salary' => $salarySetting ? $salarySetting->base_salary : '',
                    'salary_type' => $salarySetting ? $salarySetting->salary_type : 'hybrid',
                    'category_commissions' => $categoryCommissions,
                ],
            ]);
        });
    }

    public function storeSalarySettings(Request $request)
    {
        // Валідація вхідних даних з фронтенду
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'base_salary' => 'required|numeric|min:0',
            'category_commissions' => 'required|array',
            'category_commissions.*.enabled' => 'boolean',
            'category_commissions.*.percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        return $this->withClinicSchema($request, function($clinicId) use ($validated) {
            $schema = "clinic_{$clinicId}";
            // Використовуємо транзакцію, щоб запис ставки та комісій пройшов атомарно
            DB::transaction(function () use ($schema, $validated) {

                // 1. Зберігаємо або оновлюємо базову ставку співробітника
                // Використовуємо upsert на основі унікального індексу user_id
                $settingId = DB::table("{$schema}.employee_salary_settings")->updateOrInsert(
                    ['user_id' => $validated['user_id']],
                    [
                        'base_salary' => $validated['base_salary'],
                        'salary_type' => 'hybrid',
                        'updated_at' => now(),
                        'created_at' => now(), // буде проігноровано при оновленні, якщо вже існувало
                    ]
                );

                // Отримуємо ID налаштування (бо updateOrInsert повертає boolean в деяких версіях, краще витягнути явно)
                $setting = DB::table("{$schema}.employee_salary_settings")
                    ->where('user_id', $validated['user_id'])
                    ->first();

                $settingId = $setting->id;

                // 2. Зберігаємо відсотки по категоріях прайсу
                foreach ($validated['category_commissions'] as $categoryId => $commission) {
                    // Якщо категорія увімкнена і вказано відсоток більший за 0
                    if (!empty($commission['enabled']) && isset($commission['percentage']) && $commission['percentage'] !== '') {
                        DB::table("{$schema}.employee_category_commissions")->updateOrInsert(
                            [
                                'employee_salary_setting_id' => $settingId,
                                'category_id' => $categoryId,
                            ],
                            [
                                'percentage' => $commission['percentage'],
                                'updated_at' => now(),
                                'created_at' => now(),
                            ]
                        );
                    } else {
                        // Якщо чекбокс вимкнули — видаляємо запис про комісію для цієї категорії, якщо він існував
                        DB::table("{$schema}.employee_category_commissions")
                            ->where('employee_salary_setting_id', $settingId)
                            ->where('category_id', $categoryId)
                            ->delete();
                    }
                }
            });

            // У методі storeSalarySettings замість redirect()->back() ставимо:
            return redirect()->back();
        });
    }

    public function findByEmail(Request $request) {
        $email = $request->searchEmail;
        $usersData = DB::table('users')->select('name', 'email', 'id')
            ->where('email', 'like', $email.'%')
            ->get();
        return response()->json([
            'name' => 'Abigail',
            'state' => 'CA',
            'items' => $usersData
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if (!$request->user()->canClinic('customer-edit')) {
                return Inertia::render('Layout/NoPermission', ['error' => 'Insufficient permissions']);
            }

            $clinicData = $request->user()->clinicByFilial($clinicId);
            
            $filialId = $request->session()->get('filial_id');

            $formData = DB::table('core.users')
                ->join('core.clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->leftJoin("clinic_{$clinicId}.clinic_filial_user as cfu", function($join) use ($clinicId, $filialId) {
                    $join->on('users.id', '=', 'cfu.user_id')
                         ->where('cfu.clinic_id', $clinicId)
                         ->where('cfu.filial_id', $filialId);
                })
                ->select(
                    'users.*',
                    'clinic_user.avatar',
                    'cfu.color',
                    'cfu.phone',
                    'cfu.inn'
                )
                ->where('users.id', $id)
                ->where('clinic_user.clinic_id', $clinicId)
                ->first();

            if (!$formData) {
                abort(404);
            }
            $photoPath = '';
            if ($formData->avatar) {
                $serverFilePath = public_path('storage/users/' . $formData->avatar);
                if (file_exists($serverFilePath)) {
                    $photoPath = asset('storage/users/' . $formData->avatar);
                }
            }

            $rolesData = Role::all();
            return Inertia::render('Customer/CustomerEdit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'roleData' => $rolesData,
                'photoPath' => $photoPath
            ]);
        });
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerUpdateRequest $request, CustomerService $service) {
        $filialId = $request->session()->get('filial_id');
        $clinicId = $request->session()->get('clinic_id');
        $user = User::find($request->id);
        

        return $this->withClinicSchema($request, function () use (
            $service, $request, $user, $clinicId, $filialId
        ) {
            if (!$request->user()->canClinic('customer-edit')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            DB::transaction(function () use ($request, $service, &$user, $clinicId) {
            
                $user = $service->createOrUpdateUser(
                    $request->validated(),
                    $request->id
                );
                if ($request->file('file')) {
                    $service->updateAvatar($user, $request->file('file'), $clinicId);
                }
            }); 

            
            $service->updateFilialData(
                $user->id,
                $clinicId,
                $filialId,
                [
                    'color' => $request->color,
                    'phone' => $request->phone,
                    'inn' => $request->inn,
                ]
            );

            $this->auditLogService->log(
                $request->user(),
                'customer_update',
                null,
                null,
                ['customer_id' => $user->id]
            );

            return Inertia::location(route('customer.index'));
        });
        
    }

    /**
     * Display the specified resource.
     */
    public function showOld(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if (!$request->user()->canClinic('customer-edit')) {
                return Inertia::render('Layout/NoPermission', ['error' => 'Insufficient permissions']);
            }

            $clinicData = $request->user()->clinicByFilial($clinicId);

            $filialId = $request->session()->get('filial_id');

            $formData = DB::table('core.users')
                ->join('core.clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->leftJoin("clinic_{$clinicId}.clinic_filial_user as cfu", function($join) use ($clinicId, $filialId) {
                    $join->on('users.id', '=', 'cfu.user_id')
                        ->where('cfu.clinic_id', $clinicId)
                        ->where('cfu.filial_id', $filialId);
                })
                ->select(
                    'users.*',
                    'clinic_user.avatar',
                    'cfu.color',
                    'cfu.phone',
                    'cfu.inn'
                )
                ->where('users.id', $id)
                ->where('clinic_user.clinic_id', $clinicId)
                ->first();

            if (!$formData) {
                abort(404);
            }
            $photoPath = '';
            if ($formData->avatar) {
                $serverFilePath = public_path('storage/users/' . $formData->avatar);
                if (file_exists($serverFilePath)) {
                    $photoPath = asset('storage/users/' . $formData->avatar);
                }
            }
            $rolesData = Role::all();

            return Inertia::render('Customer/CustomerShow', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'roleData' => $rolesData,
                'photoPath' => $photoPath
            ]);
        });
    }

    public function show(Request $request, $userId)
    {
        $clinicId = $request->session()->get('clinic_id');
        $clinic = $request->user()->clinicByFilial($clinicId);
        $filialId = $request->session()->get('filial_id');

        // 1️⃣ Получаем пользователя из core.users
        $customer = DB::table('core.users')
            ->join('core.clinic_user', 'users.id', '=', 'clinic_user.user_id')
            ->leftJoin("clinic_{$clinicId}.clinic_filial_user as cfu", function($join) use ($clinicId, $filialId) {
                $join->on('users.id', '=', 'cfu.user_id')
                    ->where('cfu.clinic_id', $clinicId)
                    ->where('cfu.filial_id', $filialId);
            })
            ->select(
                'users.*',
                'clinic_user.avatar',
                'cfu.color',
                'cfu.phone',
                'cfu.inn'
            )
            ->where('users.id', $userId)
            ->where('clinic_user.clinic_id', $clinicId)
            ->first();

        // 3️⃣ Переключаемся в схему клиники и забираем роли + связи
        $original = DB::select("SHOW search_path")[0]->search_path;

        try {
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

            // 2️⃣ Получаем список филиалов (они в clinic_{id})
            $filialData = ClinicFilial::where('clinic_id', $clinicId)->get();

            // 3.1️⃣ Роли внутри клиники
            $rolesData = DB::table('roles')
                ->select('id', 'name')
                ->orderBy('name')
                ->get();

            // 3.2️⃣ Назначения пользователя по филиалам
            $assignedData = DB::table('clinic_filial_user')
                ->where('user_id', $userId)
                ->where('clinic_id', $clinicId)
                ->get();

        } finally {
            DB::statement("SET search_path TO {$original}");
        }

        // 4️⃣ Если пользователь уже назначен хотя бы в один филиал → страница редактирования
        return Inertia::render('Customer/CustomerShow', [
            'rolesData'   => $rolesData,
            'clinicData'  => $clinic,
            'filialData'  => $filialData,
            'formData'    => $customer,
            'customer'    => $customer,
            'assignedData'=> $assignedData
        ]);
    }


    public function assign(Request $request, $userId)
    {
        $clinicId = $request->session()->get('clinic_id');
        $clinic = $request->user()->clinicByFilial($clinicId);

        // 1️⃣ Получаем пользователя из core.users
        $customer = User::findOrFail($userId);

        // 3️⃣ Переключаемся в схему клиники и забираем роли + связи
        $original = DB::select("SHOW search_path")[0]->search_path;
        try {
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

            // 2️⃣ Получаем список филиалов (они в clinic_{id})
            $filialData = ClinicFilial::where('clinic_id', $clinicId)->orderBy('name')->get();

            // 3.1️⃣ Роли внутри клиники
            $rolesData = DB::table('roles')
                ->select('id', 'name')
                ->orderBy('name')
                ->get();

            // 3.2️⃣ Назначения пользователя по филиалам
            $assignedData = DB::table('clinic_filial_user')
                ->where('user_id', $userId)
                ->where('clinic_id', $clinicId)
                ->get();

        } finally {
            DB::statement("SET search_path TO {$original}");
        }

        // 4️⃣ Если пользователь уже назначен хотя бы в один филиал → страница редактирования
        if ($assignedData->count() > 0) {
            return Inertia::render('Customer/AssignFilialEdit', [
                'rolesData'   => $rolesData,
                'clinicData'  => $clinic,
                'filialData'  => $filialData,
                'customer'    => $customer,
                'assignedData'=> $assignedData
            ]);
        }

        // 5️⃣ Иначе — новая привязка
        return Inertia::render('Customer/AssignFilial', [
            'rolesData'  => $rolesData,
            'clinicData' => $clinic,
            'filialData' => $filialData,
            'customer'   => $customer
        ]);
    }

    public function assignSubmit(Request $request)
    {
        $clinicId   = $request->clinicId;
        $userId     = $request->customerId;
        $values     = $request->values;

        // Сохраняем оригинальный search_path
        $original = DB::select("SHOW search_path")[0]->search_path;
        try {
            // Переключаемся на схему клиники
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

            // 1️⃣ Удаляем старые назначения
            DB::table('clinic_filial_user')
                ->where('user_id', $userId)
                ->where('clinic_id', $clinicId)
                ->delete();

            // 2️⃣ Добавляем новые
            foreach ($values as $filialBlock) {
                foreach ($filialBlock as $item) {

                    if (!empty($item['role_id']) && intval($item['role_id']) > 0) {

                        DB::table('clinic_filial_user')->insert([
                            'user_id'   => $userId,
                            'filial_id' => $item['filial_id'],
                            'role_id'   => $item['role_id'],
                            'color'     => $item['color'] ?? null,
                            'clinic_id' => $clinicId,
                            'in_scheduler' => $item['in_scheduler'],

                        ]);
                    }
                }
            }

        } finally {
            // Возвращаем search_path (обязательно!)
            DB::statement("SET search_path TO {$original}");
        }

        return Inertia::location(route('customer.index'));
    }

    public function assignSubmitOld(Request $request) {
        DB::table('clinic_filial_user')
            ->where('user_id', $request->customerId)
            ->where('clinic_id', $request->clinicId)
            ->delete();
        foreach ($request->values as $values) {
            foreach ($values as $value) {
                if (intval($value['role_id']) > 0) {
//                    dd($value['role_id']);exit;
                    DB::table('clinic_filial_user')->insert(
                        [
                            'user_id' => $request->customerId,
                            'filial_id' => $value['filial_id'],
                            'role_id' => $value['role_id'],
                            'clinic_id' => $request->clinicId
                        ]
                    );
                }
            }
        }

        return Inertia::location(route('customer.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer) {
        //
    }
}
