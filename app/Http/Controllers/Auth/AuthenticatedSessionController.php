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
        /** @var \App\Models\User $logUser */
        $logUser = Auth::user();
        
        // First, we need to get the clinics that this user belongs to
        // Using the new user_clinic_roles table in the core schema
        $userClinics = DB::table('core.user_clinic_roles')
            ->select('clinic_id', 'role_name')
            ->where('user_id', $logUser->id)
            ->get();
            
        if ($userClinics->isEmpty()) {
            // User is not associated with any clinic
            return response()->json([
                'dashboardSelect' => false,
            ]);
        }
        
        // If user belongs to multiple clinics, they need to select one
        if (count($userClinics) > 1) {
            // Get the list of clinics for the user
            $clinics = [];
            foreach ($userClinics as $userClinic) {
                $clinic = DB::table('clinics')->find($userClinic->clinic_id);
                if ($clinic) {
                    $clinics[] = [
                        'id' => $clinic->id,
                        'name' => $clinic->name
                    ];
                }
            }
            
            return response()->json([
                'dashboardSelect' => true,
                'clinics' => $clinics
            ]);
        }
        
        // User belongs to only one clinic, get the clinic_id
        $clinicId = $userClinics[0]->clinic_id;
        $roleName = $userClinics[0]->role_name;
        
        // Assign the role we got from user_clinic_roles table
        $logUser->assignRole($roleName);
        
        // Set session data
        $request->session()->put('clinic_id', $clinicId);

        // We still need to get the filial_id from the clinic schema
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            // Set search_path to clinic schema
            $schemaName = 'clinic_' . $clinicId;
            DB::statement("SET search_path TO {$schemaName}");
            
            // Get filial_id from clinic schema
            $data = DB::table('clinic_filial_user')
                ->select('clinic_filial_user.filial_id')
                ->where('user_id', $logUser->id)
                ->where('clinic_id', $clinicId)
                ->first();
                
            if ($data) {
                $request->session()->put('filial_id', $data->filial_id);
            }
        } finally {
            // Restore original search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
        
        return response()->json([
            'dashboardSelect' => false,
            'clinic_id' => $clinicId,
            'filial_id' => $request->session()->get('filial_id')
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->syncRoles([]);
        Auth::guard('web')->logout();
        $request->session()->forget('clinic_id');
        $request->session()->forget('filial_id');
        $request->session()->flush();
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
