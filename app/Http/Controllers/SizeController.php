<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\MaterialCategories;
use App\Models\Producer;
use App\Models\Size;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $listData = DB::table('sizes')
            ->select('sizes.*')
            ->where('sizes.clinic_id', $clinic->id)
            ->orderBy('name')->get();
        return Inertia::render('Size/List', [
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
            $formData = new Size();
            return Inertia::render('Size/Create', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = Size::find($id);
            return Inertia::render('Size/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);

        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SizeUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $store = Size::find($request->id);
            else {
                $store = new Size();
            }
            $store->fill($request->validated());
            $store->save();

            return Redirect::route('size.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size) {
        //
    }
}
