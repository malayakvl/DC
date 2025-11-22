<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\ClinicFilialUser;
use App\Models\ClinicUser;
use App\Models\User;
use App\Services\ClinicSchemaService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function storeOld(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // aasign role
        $role = Role::where('name', 'Ceo')->first();
        $user->assignRole($role);
        // создаем пустую клинику и филиал
        $clinic = new Clinic();
        $clinic->name = $user->name . '\'s Clinic';
        $clinic->address = 'Default Address';
        $clinic->uraddress = 'Default Legal Address';
        $clinic->inn = '1234567890';
        $clinic->edrpou = '0987654321';
        $clinic->phone = '+1234567890';
        $clinic->currency_id = 1; // Default currency
        $clinic->save();

        // созадем дефолтний филиал
        $clinicFilial = new ClinicFilial();
        $clinicFilial->name = $clinic->name;
        $clinicFilial->address = $clinic->address;
        $clinicFilial->uraddress = $clinic->uraddress;
        $clinicFilial->inn = $clinic->inn;
        $clinicFilial->edrpou = $clinic->edrpou;
        $clinicFilial->phone = $clinic->phone;
        $clinicFilial->clinic_id = $clinic->id;
        $clinicFilial->save();

        //connect user with clinic
        $clinicUser = new ClinicUser();
        $clinicUser->clinic_id = $clinic->id;
        $clinicUser->user_id = $user->id;
        $clinicUser->role_id = 8;
        $clinicUser->save();

        event(new Registered($user));

        Auth::login($user);

        $request->session()->put('clinic_id', $clinic->id);
        $request->session()->put('filial_id', $clinicFilial->id);

        return redirect(route('clinic.new', absolute: true));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 1️⃣ Создаём пользователя
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2️⃣ Присваиваем роль Spatie
        $role = Role::where('name', 'Ceo')->first();
        $user->assignRole($role);

        // 3️⃣ Создаём клинику
        $clinic = Clinic::create([
            'name' => $user->name . '\'s Clinic',
            'address' => 'Default Address',
            'uraddress' => 'Default Legal Address',
            'inn' => '1234567890',
            'edrpou' => '0987654321',
            'phone' => '+1234567890',
            'currency_id' => 1,
        ]);

        // 4️⃣ Создаём отдельную схему для клиники и все необходимые таблицы
        $this->schemaService->createClinicSchema($clinic->id);

        // 5️⃣ Работаем с новой схемой для создания дефолтных записей
        // Сохраняем текущий search_path
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            // Устанавливаем search_path на новую схему
            $schemaName = 'clinic_' . $clinic->id;
            DB::statement("SET search_path TO {$schemaName}");
            
            // Создаём дефолтный филиал в новой схеме
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
            
            // Получаем ID созданного филиала
            $clinicFilialId = DB::table('clinic_filials')->where('clinic_id', $clinic->id)->first()->id ?? 1;

            // 6️⃣ Привязываем пользователя к клинике и филиалу через pivot
            DB::table('clinic_filial_user')->insert([
                'clinic_id' => $clinic->id,
                'filial_id' => $clinicFilialId,
                'user_id' => $user->id,
                'role_id' => $role->id,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        } finally {
            // Возвращаем оригинальный search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }

        // 7️⃣ Логиним пользователя
        event(new Registered($user));
        Auth::login($user);

        // 8️⃣ Сохраняем текущую клинику и филиал в сессии
        $request->session()->put('clinic_id', $clinic->id);
        $request->session()->put('filial_id', $clinicFilialId);

        // 9️⃣ Редирект на страницу создания/выбора клиники
        return redirect()->route('clinic.new');
    }
}