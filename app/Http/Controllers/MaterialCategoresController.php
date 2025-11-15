<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialCategoryUpdateRequest;
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

class MaterialCategoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $categories = MaterialCategories::where('parent_id', null)
            ->where('clinic_id', $clinicData->id)
            ->orWhere('special', true)
            ->get();
        $arrCat = array();
        $tree = $this->generateCategories($categories, $arrCat, 0);

        return Inertia::render('MaterialCategories/List', [
            'clinicData' => $clinicData,
            'storeData' => $categories,
            'categoriesData' => $categories,
            'tree' => $tree
        ]);
    }

    public function generateCategories($categories, &$arrCat, $level) {

        foreach ($categories as $category) {
            $category->level = $level;
            $category->producerName = $category->producer();
            $arrCat[] = $category;
            if (count($category->children) > 0) {
                $this->generateCategories($category->children, $arrCat, ($level+1));
            }
        }

        return $arrCat;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $categoryData = MaterialCategories::where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $categories = MaterialCategories::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $producerData = Producer::where('clinic_id', $clinicData->id)
                ->get();
            $formData = new MaterialCategories();
            return Inertia::render('MaterialCategories/Create', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'producerData' => $producerData,
                'formData' => $formData,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('store-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Store/FilialView', [
                'filialData' => $filial,
            ]);
        } else {

        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = MaterialCategories::find($id);
            $categories = MaterialCategories::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $producerData = Producer::where('clinic_id', $clinicData->id)
                ->get();
            return Inertia::render('MaterialCategories/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'producerData' => $producerData,
                'categoryData' => $tree
            ]);

        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MaterialCategoryUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $data = MaterialCategories::find($request->id);
            else {
                $data = new MaterialCategories();
            }
            $data->fill($request->validated());
            $data->save();
            $data->producer_id = $request->producer_id;
            if ($request->parent_id) {
                $data->parent_id = $request->parent_id;
                $data->save();
            }
            if ($request->percent) {
                $data->percent = $request->percent;
                $data->save();
            }

            return Redirect::route('material.categories.index');
        }
    }

    public function delete(Request $request) {
        $mCategory = MaterialCategories::where('id', '=', $request->id)->get();
        $child = MaterialCategories::where('parent_id', '=', $request->id)->get();
        if (count($child)) {

        } else {
            $mCategory[0]->delete();
        }
        return Redirect::route('material.categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filial $filial) {
        //
    }
}
