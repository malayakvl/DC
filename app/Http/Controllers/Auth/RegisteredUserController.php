<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\ClinicUser;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\User;
use App\Services\ClinicSchemaService;
use App\Services\AuditLogService;
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
    protected AuditLogService $auditLogService;

    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
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

        // 5️⃣ Associate user with clinic in core schema
        ClinicUser::createInCore([
            'clinic_id' => $clinic->id,
            'user_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 6️⃣ Назначаем роль и права через сервис
        app(\App\Services\ClinicAccessService::class)
            ->assignRole($user, $clinic->id, $filialId, 'ceo');

        // 7️⃣ Логируем ключевые события регистрации
        $request->session()->put('clinic_id', $clinic->id);
        $this->auditLogService->log($user, 'clinic.created', $clinic);
        $this->auditLogService->log($user, 'filial.created', null, null, ['filial_id' => $filialId, 'clinic_id' => $clinic->id]);
        $this->auditLogService->log($user, 'role.assigned', null, null, ['role' => 'ceo', 'clinic_id' => $clinic->id, 'filial_id' => $filialId]);

        // 8️⃣ Сбрасываем кеш Spatie и перезагружаем пользователя с ролями и правами
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        $user = $user->fresh()->load('roles', 'permissions');

        // 9️⃣ Логиним пользователя
        event(new Registered($user));
        Auth::login($user);

        // ⓪ Сохраняем текущую клинику и филиал в сессии
        $request->session()->put('clinic_id', $clinic->id);
        $request->session()->put('filial_id', $filialId);
        $request->session()->regenerate();
        $request->session()->save();

        // ① Загружаем роли и права пользователя для фронта
        $access = app(\App\Services\ClinicAccessService::class)
            ->getUserRolesWithPermissions($user, $clinic->id);

        // ② Редирект на страницу выбора клиники, как в оригинальном flow
        // или можно вернуть Inertia с ролями и правами
        return redirect()->route('clinic.new')
            ->with([
                'auth_roles' => $access['roles'],
                'auth_permissions' => $access['permissions'],
            ]);
    }
}