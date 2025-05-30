<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\MaterialCategories;
use App\Models\Producer;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProducerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $listData = DB::table('producers')
            ->select('producers.*')
            ->where('producers.clinic_id', $clinic->id)
            ->orderBy('name')->get();
        return Inertia::render('Producer/List', [
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
            $formData = new MaterialCategories();
            return Inertia::render('Producer/Create', [
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
            $formData = Producer::find($id);
            return Inertia::render('Producer/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);

        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProducerUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $store = Producer::find($request->id);
            else {
                $store = new Producer();
            }
            $store->fill($request->validated());
            $store->save();

            return Redirect::route('producer.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer) {
        //
    }
}
