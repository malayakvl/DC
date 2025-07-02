<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\LoginClinicRequest;
use App\Models\ClinicUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use function Laravel\Prompts\select;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function accept(Request $request) {
        $clinicData = DB::table('users')
            ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
            ->leftJoin('clinics', 'clinics.id', '=', 'clinic_user.clinic_id')
            ->where('clinic_token', $request->access_token)->get();

        return Inertia::render('Auth/LoginInvite', [
            'status' => session('status'),
            'clinicData' => $clinicData[0]
        ]);
    }

    public function storeClinicLogin(LoginClinicRequest $request): RedirectResponse
    {
        $request->authenticateToClinic();
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();
        $logUser = Auth::getUser();
        $data = DB::table('clinic_filial_user')
            ->select('role_id', 'roles.name', 'clinic_filial_user.clinic_id', 'clinic_filial_user.filial_id')
            ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
            ->where('user_id', $logUser->id)->get();
        if (count($data) > 1) {
            return response()->json([
                'dashboardSelect' => true,
            ]);
        } else {
            $data = DB::table('clinic_user')
                ->select('role_id', 'roles.name', 'clinic_user.clinic_id')
                ->leftJoin('roles', 'roles.id', '=', 'clinic_user.role_id')
                ->where('user_id', $logUser->id)->get();

            $logUser->assignRole($data[0]->name);
            $request->session()->put('clinic_id', $data[0]->clinic_id);
            $request->session()->put('filial_id', $data[0]->filial_id);
            return response()->json([
                'dashboardSelect' => false,
            ]);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::user()->syncRoles([]);
        Auth::guard('web')->logout();
        $request->session()->forget('clinic_id');
        $request->session()->forget('filial_id');
        $request->session()->flush();
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
