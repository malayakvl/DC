<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\User;
use App\Services\ClinicSchemaService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    protected ClinicSchemaService $schemaService;

    public function __construct(ClinicSchemaService $schemaService)
    {
        $this->schemaService = $schemaService;
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 1️⃣ Создаём пользователя
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2️⃣ Создаём дефолтную клинику
        $clinic = Clinic::create([
            'name' => $user->name . '\'s Clinic',
            'address' => 'Default Address',
            'uraddress' => 'Default Legal Address',
            'inn' => '1234567890',
            'edrpou' => '0987654321',
            'phone' => '+1234567890',
            'currency_id' => 1, 
            'user_id' => $user->id,
        ]);

        // 3️⃣ Создаём отдельную схему и все таблицы для клиники
        $this->schemaService->createClinicSchema($clinic->id);

        // 4️⃣ Создаём дефолтный филиал
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        try {
            $schema = "clinic_{$clinic->id}";
            DB::statement("SET search_path TO {$schema}");

            DB::table('clinic_filials')->insert([
                'name'       => $clinic->name,
                'address'    => $clinic->address,
                'uraddress'  => $clinic->uraddress,
                'inn'        => $clinic->inn,
                'edrpou'     => $clinic->edrpou,
                'phone'      => $clinic->phone,
                'clinic_id'  => $clinic->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $filialId = DB::table('clinic_filials')->where('clinic_id', $clinic->id)->value('id');

        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }

        // 5️⃣ Назначаем роль и права через сервис
        app(\App\Services\ClinicAccessService::class)
            ->assignRole($user, $clinic->id, $filialId, 'ceo');

        // 6️⃣ Сбрасываем кеш Spatie и перезагружаем пользователя с ролями и правами
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        $user = $user->fresh()->load('roles', 'permissions');

        // 7️⃣ Логиним пользователя
        event(new Registered($user));
        Auth::login($user);

        // 8️⃣ Сохраняем текущую клинику и филиал в сессии
        $request->session()->put('clinic_id', $clinic->id);
        $request->session()->put('filial_id', $filialId);
        $request->session()->regenerate();
        $request->session()->save();

        // 9️⃣ Загружаем роли и права пользователя для фронта
        $access = app(\App\Services\ClinicAccessService::class)
            ->getUserRolesWithPermissions($user, $clinic->id);

        // 🔟 Редирект на страницу выбора клиники, как в оригинальном flow
        // или можно вернуть Inertia с ролями и правами
        return redirect()->route('clinic.new')
            ->with([
                'auth_roles' => $access['roles'],
                'auth_permissions' => $access['permissions'],
            ]);
    }



    public function storeOld(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create default currencies in main schema if they don't exist
        $this->createDefaultCurrencies();

        // 1️⃣ Создаём пользователя
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2️⃣ Назначаем роль CEO пользователю
        // Role assignment is now done when creating the clinic schema

        // 3️⃣ Создаём клинику в основном schema
        $clinic = Clinic::create([
            'name' => $user->name . '\'s Clinic',
            'address' => 'Default Address',
            'uraddress' => 'Default Legal Address',
            'inn' => '1234567890',
            'edrpou' => '0987654321',
            'phone' => '+1234567890',
            'currency_id' => 1, // Default to USD
            'user_id' => $user->id, // Associate clinic with user
        ]);

        // 4️⃣ Создаём отдельную схему для клиники и все необходимые таблицы
        $this->schemaService->createClinicSchema($clinic->id);

        // 5️⃣ Работаем с новой схемой для создания дефолтных записей
        // Сохраняем текущий search_path
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        $clinicFilialId = null; // Default value
        $roleId = null; // Default value
        
        try {
            $schemaName = 'clinic_' . $clinic->id;
            DB::statement("SET search_path TO {$schemaName}");
            
            // Создаём дефолтный филиал
            DB::table('clinic_filials')->insert([
                'name' => $clinic->name,
                'address' => $clinic->address,
                'uraddress' => $clinic->uraddress,
                'inn' => $clinic->inn,
                'edrpou' => $clinic->edrpou,
                'phone' => $clinic->phone,
                'clinic_id' => $clinic->id,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            $clinicFilialRecord = DB::table('clinic_filials')->where('clinic_id', $clinic->id)->first();
            $clinicFilialId = $clinicFilialRecord->id ?? 1;
            
            // Get the CEO role ID
            $roleRecord = DB::table('roles')->where('name', 'ceo')->first();
            $roleId = $roleRecord->id ?? 1;
            
            // First assign the role using Spatie
            $user->assignRole('ceo'); // роль должна существовать в таблице roles схемы клиники
            
            // Refresh the user object to ensure it has the latest roles
            // $user->refresh();
            
            // Clear all of Spatie's caches to ensure the role assignment is recognized
            // app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
            // \Illuminate\Support\Facades\Cache::forget(config('permission.cache.key'));
            
            // 🔹 Привязываем пользователя через pivot
            DB::table('clinic_filial_user')->insert([
                'clinic_id' => $clinic->id,
                'filial_id' => $clinicFilialId,
                'user_id' => $user->id,
                'role_id' => $roleId,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // 🔹 Также добавляем запись в core.user_clinic_roles
            DB::table('core.user_clinic_roles')->insert([
                'user_id' => $user->id,
                'clinic_id' => $clinic->id,
                'role_name' => 'ceo',
                'created_at' => now(),
                'updated_at' => now()
            ]);

        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
      

        // 8️⃣ Логиним пользователя
        event(new Registered($user));
        Auth::login($user);

        // 9️⃣ Сохраняем текущую клинику и филиал в сессии
        $request->session()->put('clinic_id', $clinic->id);
        $request->session()->put('filial_id', $clinicFilialId);
        $request->session()->regenerate(); // важно

        // Убедимся, что сессия сохранена (чтобы избежать гонок при regenerate)
        $request->session()->save();
        logger('Controller: session_id='.session()->getId());
        logger('Controller: clinic_id='.session('clinic_id'));
        logger('Controller: filial_id='.session('filial_id'));

        // 🔟 Редирект на страницу создания/выбора клиники
        return redirect()->route('clinic.new');
    }

    /**
     * Create default currencies in the main schema if they don't exist
     */
    private function createDefaultCurrencies()
    {
        // Check if currencies already exist
        if (Currency::count() > 0) {
            return;
        }

        $defaultCurrencies = [
            ['name' => 'USD'],
            ['name' => 'EUR'],
            ['name' => 'UAH'],
        ];

        foreach ($defaultCurrencies as $currency) {
            DB::table('currencies')->insert([
                'name' => $currency['name']
            ]);
        }
    }
}