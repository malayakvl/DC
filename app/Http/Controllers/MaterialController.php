<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Material;
use App\Models\Filial;
use App\Models\MaterialCategories;
use App\Models\Producer;
use App\Models\Store;
use App\Models\Unit;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use DateTime;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $listData = DB::table('materials')
            ->select('materials.*', 'material_categories.name AS categoryName', 'producers.name AS producerName',
            'material_categories.percent', 'sizes.name AS sizeName', 'units.name AS unitName')
            ->leftJoin('material_categories', 'material_categories.id', '=', 'materials.category_id')
            ->leftJoin('producers', 'producers.id', '=', 'materials.producer_id')
            ->leftJoin('units', 'units.id', '=', 'materials.unit_id')
            ->leftJoin('sizes', 'sizes.id', '=', 'materials.size_id')
            ->where('materials.clinic_id', $clinic->id)
            ->orderBy('name')->get();

        return Inertia::render('Material/List', [
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
            $categories = MaterialCategories::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $unitsData = Unit::where('clinic_id', '=', $clinicData->id)->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $formData = new MaterialCategories();
            return Inertia::render('Material/Create', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'unitsData' => $unitsData,
                'formData' => $formData,
            ]);
        } else {
            return Inertia::render('Layouts/NoPermission', [
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $categories = MaterialCategories::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $formData = Material::find($id);
            $producer = Producer::where('id', '=', $formData->producer_id)->get();
            $unitsData = Unit::where('clinic_id', '=', $clinicData->id)->get();
            if (count($producer)) {
                $formData->producer = $producer[0]->name;
            }
            $unit = Unit::where('id', '=', $formData->unit_id)->get();
            if (count($unit)) {
                $formData->unit = $unit[0]->name;
            }
            $size = Size::where('id', '=', $formData->size_id)->get();
            if (count($size)) {
                $formData->size = $size[0]->name;
            }
            $category = MaterialCategories::where('id', '=', $formData->category_id)->get();
            if (count($category)) {
                $formData->percent = $category[0]->percent;
            }
            return Inertia::render('Material/Edit', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'formData' => $formData,
                'percent' => $formData->percent,
                'unitsData' => $unitsData
            ]);

        } else {
            return Inertia::render('Layouts/NoPermission', [
            ]);
        }
    }

    public function storeReport(Request $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->user()->roles[0]->name != 'Admin') {
                // get store filial
                $filialId = $request->session()->get('filial_id');
                $filialdData = ClinicFilial::where('id', '=', $filialId)->first();
                $storeId = $filialdData->store_id;
                $stores = Store::where('filial_id', '=', $filialdData->id)->get();
            } else {
                $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                $stores = Store::where('clinic_id', '=', $clinicData->id)->get();
            }
            return Inertia::render('Material/Report', [
                'storesData' => $stores,
            ]);
        }
    }

    public function generateStoreReportData(Request $request) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $storeId = $request->get('storeId');

            $reportDate = $request->get('reportDate');
            $date = new DateTime($reportDate);
            $formattedDate = $date->format('Y-m-d');
            $arrReminders = array();
            if (!$storeId) {
                $dataStores = Store::where('filial_id', '=', $request->session()->get('filial_id'))->get();
                foreach ($dataStores as $store) {
                    $results = DB::select("SELECT (subconto_dt->>'product_id')::integer AS product_id, (subconto_dt->>'product_name') AS product_name, 
                        SUM(quantity) AS total_quantity, u.name AS unit_name, p.name AS producer_name, 
                        SUM(CAST(subconto_dt->>'fact_qty' AS NUMERIC)) as total_fact,
                        um.name as unit_weightname
                        FROM document_operations 
                            JOIN materials m ON (subconto_dt->>'product_id')::integer = m.id 
                            JOIN units u ON m.unit_id = u.id
                            LEFT JOIN units um ON m.weightunit_id = um.id
                            JOIN producers p ON m.producer_id = p.id
                        WHERE (subconto_dt->>'store_id')::text = '" .$store->id. "' 
                            AND DATE(operation_date) <= '" .$formattedDate. "'::date
                        GROUP BY (subconto_dt->>'product_id')::integer, (subconto_dt->>'product_name'), unit_name, producer_name, unit_weightname");
                    $arrReminders[$store->name] = $results;
                }
            } else {
                $dataStores = Store::where('id', '=', $storeId)->get();
                $results = DB::select("SELECT (subconto_dt->>'product_id')::integer AS product_id, (subconto_dt->>'product_name') AS product_name, 
                    SUM(quantity) AS total_quantity, u.name AS unit_name, p.name AS producer_name, 
                    SUM(CAST(subconto_dt->>'fact_qty' AS NUMERIC)) as total_fact, 
                    um.name as unit_weightname
                    FROM document_operations 
                        JOIN materials m ON (subconto_dt->>'product_id')::integer = m.id 
                        JOIN units u ON m.unit_id = u.id
                        LEFT JOIN units um ON m.weightunit_id = um.id
                        JOIN producers p ON m.producer_id = p.id
                    WHERE (subconto_dt->>'store_id')::text = '" .$storeId. "' AND DATE(operation_date) <= '" .$formattedDate. "'::date
                    GROUP BY (subconto_dt->>'product_id')::integer, (subconto_dt->>'product_name'), unit_name, producer_name, unit_weightname");
                $arrReminders[$dataStores[0]->name] = $results;
            }
            return response()->json([
                'results' => $arrReminders,
                'clinicData' => $clinicData
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProducerUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $material = Material::find($request->id);
            else {
                $material = new Material();
            }
            // find producer
            $producer = Producer::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->producer). '%')->get();
            if (count($producer) > 0) {
                $producerId = $producer[0]->id;
            } else {
                $producerNew = new Producer();
                $producerNew->name = $request->producer;
                $producerNew->save();
                $producerId = $producerNew->id;
            }
            // find unit
//            $unit = Unit::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->unit). '%')->get();
            $unit = Unit::where('id', '=', $request->unit_id)->first();
            $unitWeight = '';
            if ($request->weightunit_id) {
                $unitWeight = Unit::where('id', '=', $request->weightunit_id)->first();
            }

            // find size
            $size = Size::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->size). '%')->get();
            if (count($size) > 0) {
                $sizeId = $size[0]->id;
            } else {
                $sizeNew = new Size();
                $sizeNew->name = $request->size;
                $sizeNew->save();
                $sizeId = $sizeNew->id;
            }
            $material->name = $request->name;
            $material->price = (float)$request->price;
            $material->retail_price = (float)$request->retail_price;
            $material->category_id = $request->category_id;
            $material->clinic_id = $request->clinic_id;
            $material->producer_id = $producerId;
            $material->unit_id = $unit->id;
            $material->size_id = $sizeId;
            $material->weight = $request->weight;
            $material->weightunit_id = $unitWeight ? $unitWeight->id : null;
            $material->price_per_unit = $request->price_per_unit | null;
            $material->save();

            return Redirect::route('material.index');
        }
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

    public function findStoreMaterial(Request $request) {
        $name = $request->searchName;
        $storeId = $request->storeId;

//        $resData = DB::table('materials m')
//            ->select('m.name', 'producers.name AS producerName', 'm.price', 'store_materials.weight',
//                'store_materials.quantity', 'units.name AS unitName', 'materials.id', 'materials.producer_id',
//                'materials.unit_id', 'materials.weight AS material_weight', 'material.weightunit_id'
//            )
//            ->leftJoin('store_materials', 'store_materials.material_id', '=', 'm.id')
//            ->leftJoin('producers', 'producers.id', '=', 'store_materials.producer_id')
//            ->leftJoin('units u', 'u.id', '=', 'm.unit_id')
//            ->leftJoin('units u2', 'u2.id', '=', 'm.weightunit_id')
//            ->whereRaw('LOWER(m.name) LIKE ?', '%' .mb_strtolower($name). '%')
//            ->where('store_id', $storeId)
//            ->get();
        $resData = DB::select('
            SELECT m.name, m.unit_id, m.weightunit_id, u.name AS packunit_name, u2.name as perunit_name,
                m.id AS product_id,   
                m.price, sm.weight, sm.quantity, m.weight AS material_weight
            FROM materials m
            LEfT JOIN store_materials sm ON sm.material_id = m.id 
            LEFT JOIN units u ON u.id = m.unit_id
            LEFT JOIN units u2 ON u2.id = m.weightunit_id
            WHERE  
              LOWER(m.name) LIKE \'%' .mb_strtolower($name). '%\'
        ');


        return response()->json([
            'items' => $resData
        ]);
    }

    public function findMaterial(Request $request) {
        $name = $request->searchName;
        $resData = DB::table('materials')->select('*')
            ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
            ->get();
        return response()->json([
            'items' => $resData
        ]);
    }


    public function findUnit(Request $request) {
        $name = $request->searchName;
        $producerData = DB::table('units')->select('name', 'id')
            ->where('name', 'like', $name.'%')
            ->get();
        return response()->json([
            'items' => $producerData
        ]);
    }

    public function findSize(Request $request) {
        $name = $request->searchName;
        $producerData = DB::table('sizes')->select('name', 'id')
            ->where('name', 'like', $name.'%')
            ->get();
        return response()->json([
            'items' => $producerData
        ]);
    }

    public function findPercent(Request $request) {
        $catData = DB::table('material_categories')->select('percent', 'id')
            ->where('id', '=', $request->searchId)
            ->get();
        return response()->json([
            'percent' => $catData[0]->percent
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer) {
        //
    }
}
