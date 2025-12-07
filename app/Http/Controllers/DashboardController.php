<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Http\Requests\FilialUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // 1️⃣ Получаем клиники пользователя
        $clinics = DB::table('core.clinic_user')
            ->join('core.clinics', 'core.clinics.id', '=', 'core.clinic_user.clinic_id')
            ->where('core.clinic_user.user_id', $userId)
            ->select(
                'core.clinics.id as clinic_id',
                'core.clinics.name as clinic_name'
            )
            ->get();

        $result = [];

        foreach ($clinics as $clinic) {

            // 3️⃣ Получаем названия филиалов из схемы клиники
            $original = DB::select("SHOW search_path")[0]->search_path;
            DB::statement("SET search_path TO clinic_{$clinic->clinic_id}, public, core");

            // 2️⃣ Филиалы, к которым пользователь назначен (core)
            $assignedFilialData = DB::table('clinic_filial_user')
                ->join('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
                ->where('clinic_filial_user.clinic_id', $clinic->clinic_id)
                ->where('clinic_filial_user.user_id', $userId)
                ->select('clinic_filial_user.filial_id', 'clinic_filial_user.role_id', 'roles.name as role_name')
                ->get();
            
            $assignedFilialIds = $assignedFilialData->pluck('filial_id')->toArray();
            // Получаем филиалы с информацией о ролях
            $filials = DB::table('clinic_filials')
                ->whereIn('id', $assignedFilialIds)
                ->select('id', 'name')
                ->get()
                ->map(function ($filial) use ($assignedFilialData) {
                    $assignment = $assignedFilialData->firstWhere('filial_id', $filial->id);
                    $filial->role_id = $assignment->role_id ?? null;
                    $filial->role_name = $assignment->role_name ?? null;
                    return $filial;
                });

            DB::statement("SET search_path TO {$original}");

            // 4️⃣ Формируем единый объект
            $result[] = [
                'clinic_id' => $clinic->clinic_id,
                'clinic_name' => $clinic->clinic_name,
                'filials' => $filials,
            ];
        }
        // dd($result);exit;
        return Inertia::render('Dashboard/DashboardSelect', [
            'clinicsData' => $result,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
        $storeData = new Store();
        return Inertia::render('Store/StoreCreate', [
            'clinicData' => $clinicData,
            'filialData' => $filailData,
            'formData' => $storeData
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('filial-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Clinic/FilialView', [
                'filialData' => $filial,
            ]);
        } else {
            return Inertia::render('Clinic/FilialView', [
            ]);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        //
        $imagePath = asset('storage/clinic/stamps/filial-stamp-1.png');

        if ($request->user()->can('filial-edit')) {
//            $clinic = $request->user()->clinic;
            $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
            $filial = ClinicFilial::find($id);
            $filial->stamp = $imagePath;
            return Inertia::render('Clinic/FilialEdit', [
                'filialData' => $filial,
                'clinicData' => $clinic,
                'stampPath' => $imagePath
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request) {
        if ($request->user()->can('store-edit')) {
            $store = Store::find($request->id);

            $store->fill($request->validated());
            $store->save();

            $ext = $request->file->getClientOriginalExtension();
            Storage::disk('public')->put('clinic/stamps/store-stamp-' .$request->id. '.'.$ext, file_get_contents($request->file));

            return Redirect::route('stores');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id) {
        //
    }
}
