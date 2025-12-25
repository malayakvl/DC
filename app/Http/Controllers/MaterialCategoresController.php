<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialCategoryUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\MaterialCategories;
use App\Models\Producer;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class MaterialCategoresController extends Controller
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

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('store-view')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $categories = MaterialCategories::where('parent_id', null)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);

            return Inertia::render('MaterialCategories/List', [
                'clinicData' => $clinic,
                'storeData' => $categories,
                'categoriesData' => $categories,
                'tree' => $tree
            ]);
        });
       
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
    public function create(Request $request) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
            if (!$request->user()->canClinic('store-create')) {
                return Inertia::render('Store/Edit', ['error' => 'Insufficient permissions']);
            }
            $categories = MaterialCategories::where('parent_id', null)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $producerData = Producer::get();
            $formData = new MaterialCategories();
            return Inertia::render('MaterialCategories/Create', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'producerData' => $producerData,
                'formData' => $formData,
            ]);
        });

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
            // Log the material category creation
            $this->auditLogService->log($request->user(), 'material_category.updated', $data, null, $data->toArray());


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


}
