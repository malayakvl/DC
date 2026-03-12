<?php

namespace App\Http\Controllers;

use App\Constants\Invoices;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\StoreBatches;
use App\Models\StoreMovements;
use App\Models\InvoiceItems;
use App\Models\Act;
use App\Models\ActItem;
use App\Models\InvoiceStatus;
use App\Models\InvoiceType;
use App\Models\Patient;
use App\Models\Supplier;
use App\Models\Tax;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class ReportController extends Controller
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

    public function store(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('report-create')) {
                return Inertia::render('Report/Store', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $filials = ClinicFilial::where('clinic_id', $clinicId)->get();
            
            $storeData = DB::table('stores')
                ->select('stores.*', 'users.name AS ceoName', 'clinic_filials.name AS filialName')
                ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                ->where('stores.clinic_id', $request->session()->get('clinic_id'))
                ->orderBy('name')->get();
            
            // dd($clinic, $filials);exit;
            $dateFrom = $request->input('date_from', now()->startOfWeek()->format('Y-m-d'));
            $dateTo = $request->input('date_to', now()->endOfWeek()->format('Y-m-d'));
            return Inertia::render('Report/Store', [
                'clinicData' => $clinic,
                'filials'   => $filials,
                'stores'   => $storeData,
                'dateFrom'  => $dateFrom,
                'dateTo'    => $dateTo,
            ]);
        });
    }
    

    public function balance(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('store-all')) {
                return Inertia::render('Report/Balance', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $filials = ClinicFilial::where('clinic_id', $clinicId)->get();
            // dd($clinic, $filials);exit;
            $dateFrom = $request->input('date_from', now()->startOfWeek()->format('Y-m-d'));
            $dateTo = $request->input('date_to', now()->endOfWeek()->format('Y-m-d'));
            return Inertia::render('Report/Balance', [
                'clinicData' => $clinic,
                'filials'   => $filials,
                'dateFrom'  => $dateFrom,
                'dateTo'    => $dateTo,
            ]);
        });
    }
    

    public function fetchPatient(Request $request, $value) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $value) {
            return Patient::leftJoin('core.users', 'core.users.id', '=', 'patients.user_id')
                ->select('patients.id', 'core.users.first_name', 'core.users.last_name', 'core.users.email', 'core.users.name')
                ->where('core.users.name', 'like', "%{$value}%")
                ->orWhere('core.users.email', 'like', "%{$value}%")
                ->orWhere('core.users.first_name', 'like', "%{$value}%")
                ->orWhere('core.users.last_name', 'like', "%{$value}%")
                ->get();
        });
    }

    public function generateBalanceReport(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            $params = $request->get('values');
            $filialId = $params['filial_id'];
            $dateFrom = $params['dateFrom'];
            $dateTo = $params['dateTo'];
            $patientId = $params['patient_id'];

            $pid = $patientId ?? 'NULL';
            $fid = $filialId ?? 'NULL';

            $query = "SELECT * FROM core.balance_documents('clinic_{$clinicId}', {$pid}, {$fid});";
// dd($query);exit;
            $result = DB::select($query);

            return response()->json($result);
        });
    }

    public function generateStoreReport(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            $params = $request->get('values');
            $filialId = $params['filial_id'];
            $dateFrom = $params['dateFrom'];
            $dateTo = $params['dateTo'];
            $storeId = $params['store_id'];

//             SELECT *
// FROM core.get_store_turnover_report(
//     'clinic_1',
//     2,
//     '2026-02-17 00:00:00',
//     '2026-02-28 23:59:59'
// );

            $sid = $storeId ?? 'NULL';
            $fid = $filialId ?? 'NULL';

            $query = "SELECT * FROM core.get_store_movements_by_material('clinic_{$clinicId}', {$storeId}, '{$dateFrom} 00:00:00', '{$dateTo} 23:59:59');";
            $result = DB::select($query);
            return response()->json($result);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice) {
        //
    }
}
