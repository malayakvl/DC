<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialCategoryUpdateRequest;
use App\Http\Requests\PricingUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\InvoiceItems;
use App\Models\Pricing;
use App\Models\PricingItems;
use App\Models\PriceCategory;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class ServiceController extends Controller
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
            $clinicData = $request->user()->clinicByFilial($clinicId);
            $categories = PriceCategory::get();
            $arrServices = [];
            foreach ($categories as $category) {
                $arrServices[$category->id] = Pricing::where('category_id', '=', $category->id)->orderBy('name')->get();
            }
            $arrCat = array();
            
            $tree = $this->generateCategories($categories, $arrCat, 0);
            return Inertia::render('Service/List', [
                'clinicData' => $clinicData,
                'categoriesData' => $categories,
                'services' => $arrServices,
                'tree' => $tree,
                'currency' => $clinicData->currency->symbol
            ]);
        });
        
    }

    public function generateCategories($categories, &$arrCat, $level) {
        foreach ($categories as $category) {
            $category->level = $level;
            // $category->producerName = $category->producer();
            $arrCat[] = $category;
            // if (count($category->children) > 0) {
            //     $this->generateCategories($category->children, $arrCat, ($level+1));
            // }
        }

        return $arrCat;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('store-create')) {
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $categories = PriceCategory::get();
                $arrCat = array();
                $tree = $this->generateCategories($categories, $arrCat, 0);
                $unitData = Unit::all();
                $formData = new Pricing();
                return Inertia::render('Service/Create', [
                    'clinicData' => $clinicData,
                    'categoryData' => $tree,
                    'unitData' => $unitData,
                    'formData' => $formData,
                ]);
            }
        });
        
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('service-edit')) {
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $categories = PriceCategory::get();
                $arrCat = array();
                $tree = $this->generateCategories($categories, $arrCat, 0);
                $unitData = Unit::all();
                $formData = Pricing::find($request->id);
                $formRow = DB::table('pricing_items')
                    ->select('pricing_items.*', 'materials.name AS product', "materials.id AS product_id")
                    ->leftJoin('materials', 'materials.id', '=', 'pricing_items.material_id')
                    ->where('pricing_id', $request->id)->get();
                return Inertia::render('Service/Edit', [
                    'clinicData' => $clinicData,
                    'categoryData' => $tree,
                    'unitData' => $unitData,
                    'formData' => $formData,
                    'formRowData' => $formRow
                ]);
            } else {

            }
        });
        
    }

    public function updateServiceCategory(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Layouts/NoPermission', ['error' => 'Insufficient permissions']);
            }
            if (!$request->id) {
                $priceCategory = new PriceCategory();
                $priceCategory->name = $request->name;
                $priceCategory->save();
            }
            return to_route('service.categories.index');
        });
    }

    public function findService(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $name = $request->searchName;
            
            $resData = DB::table('pricings')->select('*')
                ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
                ->get();
            return response()->json([
                'items' => $resData
            ]);
        });
    }

    public function findServiceItems(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $serviceId = $request->serviceId;
            
            $resData = DB::table('pricing_items')->select('pricing_items.*','materials.name AS product')
                ->leftJoin('materials', 'materials.id', '=', 'pricing_items.material_id')
                ->where('pricing_id', '=', $serviceId)
                ->get();
            return response()->json([
                'items' => $resData
            ]);
        });
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PricingUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('service-edit')) {
                if ($request->id) {
                    $pricing = Pricing::find($request->id);
                    DB::table('pricing_items')->where('pricing_id', $request->id)->delete();
                }
                else {
                    $pricing = new Pricing();
                }
                $pricing->fill($request->validated());
                $pricing->category_id = $request->category_id;
                $pricing->price = $request->price;
                $pricing->save();
                $pricingId = $pricing->id;

                $total = 0;
                foreach ($request->rows as $row) {
                    if ($row["product_id"]) {
                        $pricingItem = new PricingItems();
                        $pricingItem->pricing_id = $pricingId;
                        $pricingItem->unit_id = $row["unit_id"];
                        $pricingItem->material_id = $row["product_id"];
                        $pricingItem->quantity = $row["quantity"];
                        $pricingItem->save();
                    }

                }
                $pricing->save();
            }

            return Redirect::route('service.categories.index');
        });
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicFilial $filial) {
        //
    }
}
