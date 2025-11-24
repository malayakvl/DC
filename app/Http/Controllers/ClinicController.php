<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ClinicController extends Controller
{
    /**
     * Helper для работы с текущей схемой клиники
     */
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

    public function create(Request $request): Response
    {
        // Get clinic data from the default schema
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        
        if ($clinicData) {
            // Set session data for this clinic
            $request->session()->put('clinic_id', $clinicData->id);
            
            // Try to get currency data from the clinic-specific schema first
            $clinicId = $clinicData->id;
            $schemaName = 'clinic_' . $clinicId;
            
            // Save current search_path
            $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Set search_path to clinic schema
                DB::statement("SET search_path TO {$schemaName}");
                
                // Try to get currency data from clinic schema
                $currencyData = DB::table('currencies')->get();
                
                // If no currencies in clinic schema, fall back to default
                if ($currencyData->isEmpty()) {
                    throw new \Exception('No currencies found in clinic schema');
                }
                
                // Also try to get filial data and set filial_id in session
                $filialData = DB::table('clinic_filials')->where('clinic_id', $clinicId)->first();
                if ($filialData) {
                    $request->session()->put('filial_id', $filialData->id);
                }
            } catch (\Exception $e) {
                // Restore original search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
                
                // Fall back to default schema currencies
                $currencyData = Currency::all();
            } finally {
                // Always restore original search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
            }
            
            return Inertia::render('Clinic/Create', [
                'clinicData' => $clinicData,
                'currencyData' => $currencyData
            ]);
        } else {
            $clinicData = new Clinic();
            $currencyData = Currency::all();
            return Inertia::render('Clinic/Create', [
                'clinicData' => $clinicData,
                'currencyData' => $currencyData
            ]);
        }
    }

    public function new(Request $request): Response
    {
        // Get clinic data from the default schema
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        
        if ($clinicData) {
            // Try to get currency data from the clinic-specific schema first
            $clinicId = $clinicData->id;
            $schemaName = 'clinic_' . $clinicId;
            
            // Save current search_path
            $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Set search_path to clinic schema
                DB::statement("SET search_path TO {$schemaName}");
                
                // Try to get currency data from clinic schema
                $currencyData = DB::table('currencies')->get();
                
                // If no currencies in clinic schema, fall back to default
                if ($currencyData->isEmpty()) {
                    throw new \Exception('No currencies found in clinic schema');
                }
            } catch (\Exception $e) {
                // Restore original search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
                
                // Fall back to default schema currencies
                $currencyData = Currency::all();
            } finally {
                // Always restore original search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
            }
            
            return Inertia::render('Clinic/Create', [
                'clinicData' => $clinicData,
                'currencyData' => $currencyData
            ]);
        } else {
            $clinicData = new Clinic();
            $currencyData = Currency::all();
            return Inertia::render('Clinic/Create', [
                'clinicData' => $clinicData,
                'currencyData' => $currencyData
            ]);
        }
    }

    /**
     * Display the user's profile form.
     */
    public function roles(Request $request): Response
    {
        return Inertia::render('Clinic/Roles', [
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ClinicUpdateRequest $request) {
        $clinic = Clinic::where('user_id', $request->user()->id)->first();

        if (!$request->user()->can('clinic-create')) {
            $clinic->fill($request->validated());
            $clinic->save();
        }

        return Redirect::route('dashboard.index');
    }

    
    public function filialEnter(Request $request, $filialId) {
        // get role for current filial from the clinic schema
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            // Get clinic_id for this filial
            $clinicFilial = DB::table('clinic_filials')->where('id', $filialId)->first();
            if (!$clinicFilial) {
                return Redirect::back()->withErrors(['error' => 'Filial not found']);
            }
            
            $clinicId = $clinicFilial->clinic_id;
            $schemaName = 'clinic_' . $clinicId;
            DB::statement("SET search_path TO {$schemaName}");
            
            // get role for current filial from clinic schema
            $data = DB::table('clinic_filial_user')
                ->select('role_id', 'roles.name AS roleName', 'clinic_filial_user.clinic_id', 'clinic_filial_user.filial_id')
                ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
                ->where('filial_id', $filialId)
                ->where('user_id', $request->user()->id)->get();

            if ($data->isEmpty()) {
                return Redirect::back()->withErrors(['error' => 'User not found in this filial']);
            }

            // assign role for current filial
            foreach ($request->user()->roles as $role) {
                $request->user()->removeRole($role->name);
            }
            $request->user()->assignRole($data[0]->roleName);
            
            $request->session()->put('clinic_id', $data[0]->clinic_id);
            $request->session()->put('filial_id', $data[0]->filial_id);
            
            // Update user_clinic_roles table
            DB::table('core.user_clinic_roles')
                ->where('user_id', $request->user()->id)
                ->where('clinic_id', $data[0]->clinic_id)
                ->update([
                    'role_name' => $data[0]->roleName,
                    'updated_at' => now()
                ]);
        } finally {
            // Restore original search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }

        return Redirect::route('dashboard.index');
    }

    public function findProducer(Request $request) {
        $name = $request->searchName;
        $producerData = DB::table('producers')->select('name', 'id')
            ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
            ->get();
        return response()->json([
            'items' => $producerData
        ]);
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}