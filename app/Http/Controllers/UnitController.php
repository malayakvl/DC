<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitUpdateRequest;
use App\Models\Clinic;
use App\Models\Unit;
use App\Models\Filial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $listData = DB::table('units')
            ->select('units.*')
            ->where('units.clinic_id', $clinic->id)
            ->orderBy('name')->get();
        return Inertia::render('Unit/List', [
            'clinicData' => $clinic,
            'listData' => $listData
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $storeData = new Unit();
            return Inertia::render('Unit/Create', [
                'clinicData' => $clinicData,
                'formData' => $storeData,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = Unit::find($id);
            return Inertia::render('Unit/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UnitUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            if ($request->id)
                $unit = Unit::find($request->id);
            else {
                $unit = new Unit();
            }
            $unit->fill($request->validated());
            $unit->clinic_id = $clinicData->id;
            $unit->save();

            return Redirect::route('unit.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filial $filial) {
        //
    }
}
