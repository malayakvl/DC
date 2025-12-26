<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Models\Clinic;
use App\Models\Currency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class ClinicController extends Controller
{
    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;

    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
    }
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
        // $clinic = Clinic::where('id', 18)->first();
        // dd($clinic);exit;
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
            if ($request->user()->can('clinic-create')) {
                $clinicData->fill($request->validated());
                $clinicData->save();
                $clinicData->currency_id = $request->validated('currency_id');
                $clinicData->save();

                $this->auditLogService->log($request->user(), 'clinic.updated', $clinicData, null, $request->validated());

            }

        return Redirect::route('dashboard.index');
        // return $this->withClinicSchema($request, function($clinicId) use ($request) {
        //     $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        //     if ($request->user()->can('clinic-create')) {
        //         $clinicData->fill($request->validated());
        //         $clinicData->save();
        //             dd($request->validated('currency_id'));exit;
        //         $clinicData->currency_id = $request->validated('currency_id');
        //         $clinicData->save();
        //     }

        //     return Redirect::route('dashboard.index');
        // });
        
    }

    
    public function filialEnter(Request $request) {
        // Get clinicId and filialId from query parameters
        $clinicId = $request->query('clinicId');
        $filialId = $request->query('filialId');
        
        // Validate that both parameters are provided
        if (!$clinicId || !$filialId) {
            return Redirect::back()->withErrors(['error' => 'Clinic ID and Filial ID are required']);
        }
        
        // get role for current filial from the clinic schema
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            // Set search path to the clinic schema to access clinic_filials table
            $schemaName = 'clinic_' . $clinicId;
            DB::statement("SET search_path TO {$schemaName}");
            
            // Get clinic_id for this filial (validation)
            $clinicFilial = DB::table('clinic_filials')->where('id', $filialId)->where('clinic_id', $clinicId)->first();
            if (!$clinicFilial) {
                return Redirect::back()->withErrors(['error' => 'Filial not found or does not belong to the specified clinic']);
            }
            
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
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData, $name) {
            $producerData = DB::table('producers')->select('name', 'id')
                ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
                ->get();
            return response()->json([
                'items' => $producerData
            ]);
        });
        
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