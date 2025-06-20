<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\ClinicUser;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
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
        $clinic->name = 'New Clinic Name';
        $clinic->address = '';
        $clinic->uraddress = '';
        $clinic->inn = '';
        $clinic->edrpou = '';
        $clinic->phone = '';
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
//        $request->authenticateToClinic();
//        $request->session()->regenerate();

        // почему то не видит роутера, хотя он есть
//        return redirect(route('dashboard', absolute: false));
        return redirect(route('clinic.new', absolute: true));
    }
}
