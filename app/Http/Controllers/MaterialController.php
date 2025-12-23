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
use Exception;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class MaterialController extends Controller
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
            $clinic = $request->user()->clinicByFilial($clinicId);
            if (!$request->user()->canClinic('store-view')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = DB::table('materials')
                ->select('materials.*', 'material_categories.name AS categoryName', 'producers.name AS producerName',
                    'material_categories.percent', 'units.name AS unitName')
                ->leftJoin('material_categories', 'material_categories.id', '=', 'materials.category_id')
                ->leftJoin('producers', 'producers.id', '=', 'materials.producer_id')
                ->leftJoin('units', 'units.id', '=', 'materials.unit_id')
                // ->leftJoin('sizes', 'sizes.id', '=', 'materials.size_id')
                // ->where('materials.clinic_id', $clinic->id)
                ->orderBy('name')->get();

            return Inertia::render('Material/List', [
                'clinicData' => $clinic,
                'listData' => $listData
            ]);
        });
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
            $unitsData = Unit::all();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $formData = new MaterialCategories();
            $producerData = Producer::get();
            
            return Inertia::render('Material/Create', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'producerData' => $producerData,
                'unitsData' => $unitsData,
                'formData' => $formData,
            ]);

            // $categories = MaterialCategories::where('parent_id', null)
            //     ->orWhere('special', true)
            //     ->get();
            // $arrCat = array();
            // $tree = $this->generateCategories($categories, $arrCat, 0);
            // $producerData = Producer::get();
            // $formData = new MaterialCategories();
            // return Inertia::render('MaterialCategories/Create', [
            //     'clinicData' => $clinicData,
            //     'categoryData' => $tree,
            //     'producerData' => $producerData,
            //     'formData' => $formData,
            // ]);
        });

    }
        
    // }

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
            $unitsData = Unit::all();
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

        /**
     * Update the specified resource in storage.
     */
    public function update(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
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
            // // find unit
            // $unit = Unit::where('id', '=', $request->unit_id)->first();
            // $unitWeight = '';
            // if ($request->weightunit_id) {
            //     $unitWeight = Unit::where('id', '=', $request->weightunit_id)->first();
            // }
            // find size
            // $size = Size::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->weightunit_id). '%')->get();
            // dd($size);exit;
            // if (count($size) > 0) {
            //     $sizeId = $size[0]->id;
            // } else {
            //     $sizeNew = new Size();
            //     $sizeNew->name = $request->size;
            //     $sizeNew->save();
            //     $sizeId = $sizeNew->id;
            // }
            $material->name = $request->name;
            $material->price = (float)$request->price;
            $material->retail_price = (float)$request->retail_price;
            $material->category_id = $request->category_id;
            $material->producer_id = $producerId;
            $material->unit_id = $request->unit_id;
            // $material->size_id = $request->weightunit_id;
            $material->weight = $request->weight;
            $material->weightunit_id = $request->weightunit_id ? $request->weightunit_id : null;
            $material->price_per_unit = $request->price_per_unit | null;
            $material->save();

            return Redirect::route('material.index');

            
            // Update currency information
            // $currency = Currency::find($request->id);
            // // Capture old data before updating
            // $oldData = $currency->toArray();
            // $currency->fill($request->validated());
            // $currency->symbol = $request->symbol;
            // // Prepare new data
            // $newData = $currency->toArray();
            // $currency->save();
            // // Log the currency update
            // $this->auditLogService->log($request->user(), 'currency.updated', $currency, $oldData, $newData);

            // // Create new currency exchange rate record
            // $currencyExchange = new CurrencyExchange();
            // $currencyExchange->clinic_id = $clinicId;
            // $currencyExchange->currency_id = $request->id; // Use the currency ID, not from request
            // $currencyExchange->rate_value = floatval($request->rate);
            // $currencyExchange->rate_date = date('Y-m-d H:i:s');
            // $currencyExchange->save();
            // // Log the currency exchange rate creation
            // $this->auditLogService->log($request->user(), 'currency_exchange.created', $currencyExchange, null, $currencyExchange->toArray());

            // return Redirect::route('currency.index')->with('success', 'Currency updated successfully');
        });
    }

    // public function update(Request $request) {
    //     $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
    //     return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
    //         dd($request->user()->can('store-edit'));exit;
    //         if ($request->user()->can('store-edit')) {
    //             if ($request->id)
    //                 $material = Material::find($request->id);
    //             else {
    //                 $material = new Material();
    //             }
    //             // find producer
    //             $producer = Producer::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->producer). '%')->get();
    //             if (count($producer) > 0) {
    //                 $producerId = $producer[0]->id;
    //             } else {
    //                 $producerNew = new Producer();
    //                 $producerNew->name = $request->producer;
    //                 $producerNew->save();
    //                 $producerId = $producerNew->id;
    //             }
    //             // find unit
    //             $unit = Unit::where('id', '=', $request->unit_id)->first();
    //             $unitWeight = '';
    //             if ($request->weightunit_id) {
    //                 $unitWeight = Unit::where('id', '=', $request->weightunit_id)->first();
    //             }
    //             // find size
    //             // $size = Size::whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($request->weightunit_id). '%')->get();
    //             // dd($size);exit;
    //             // if (count($size) > 0) {
    //             //     $sizeId = $size[0]->id;
    //             // } else {
    //             //     $sizeNew = new Size();
    //             //     $sizeNew->name = $request->size;
    //             //     $sizeNew->save();
    //             //     $sizeId = $sizeNew->id;
    //             // }
    //             dd('here we are');exit;
    //             $material->name = $request->name;
    //             $material->price = (float)$request->price;
    //             $material->retail_price = (float)$request->retail_price;
    //             $material->category_id = $request->category_id;
    //             $material->clinic_id = $request->clinic_id;
    //             $material->producer_id = $producerId;
    //             $material->unit_id = $unit->id;
    //             // $material->size_id = $request->weightunit_id;
    //             $material->weight = $request->weight;
    //             $material->weightunit_id = $unitWeight ? $unitWeight->id : null;
    //             $material->price_per_unit = $request->price_per_unit | null;
    //             $material->save();

    //             return Redirect::route('material.index');
    //         }
    //     });
        
    // }


    public function storeReport(Request $request) {
        if ($request->user()->can('store-edit')) {
            $stores = collect(); // Initialize as empty collection
            
            if ($request->user()->roles[0]->name != 'Admin') {
                // Get store for filial user
                $filialId = $request->session()->get('filial_id');
                $filialData = ClinicFilial::where('id', '=', $filialId)->first();
                if ($filialData) {
                    $stores = Store::where('filial_id', '=', $filialData->id)->get();
                }
            } else {
                // Get all stores for admin/clinic user
                $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                if ($clinicData) {
                    $stores = Store::where('clinic_id', '=', $clinicData->id)->get();
                }
            }
            
            // If there are stores available, automatically select the first one
            $firstStoreId = null;
            if ($stores->count() > 0) {
                $firstStoreId = $stores->first()->id;
            }
            
            // Generate initial report data using the PostgreSQL function for current date and all stores
            $currentDate = date('Y-m-d');
            $initialReportData = [];
            
            if ($stores->count() > 0) {
                // Get report data for all stores on current date
                $results = DB::select('SELECT * FROM calculate_store_balance(NULL, ?, ?, NULL)', [
                    $currentDate, // date_from
                    $currentDate  // date_to
                ]);
                
                // Transform results to the expected format
                foreach ($results as $result) {
                    $productId = $result->product_id;
                    
                    // Initialize the product in balanceData if it doesn't exist
                    if (!isset($initialReportData[$productId])) {
                        $initialReportData[$productId] = [
                            'startPeriod' => [
                                'product_id' => (int)$result->product_id,
                                'product_name' => $result->product_name,
                                'balance_quantity' => (float)$result->beginning_balance_qty,
                                'balance_fact_quantity' => (float)$result->beginning_balance_fact_qty
                            ],
                            'movement' => []
                        ];
                    }
                    
                    // Add movement data if there are movements
                    if ($result->movements) {
                        $movements = json_decode($result->movements, true);
                        if (is_array($movements)) {
                            foreach ($movements as $movement) {
                                $initialReportData[$productId]['movement'][] = [
                                    'total_quantity' => (float)(($movement['incoming_qty'] ?? 0) - ($movement['outgoing_qty'] ?? 0)),
                                    'total_fact_dt' => (float)(($movement['incoming_fact_qty'] ?? 0) - ($movement['outgoing_fact_qty'] ?? 0)),
                                    'unit_name' => '', // Not available in current data
                                    'producer_name' => '', // Not available in current data
                                    'document_type' => $movement['document_type'] ?? '',
                                    'invoice_number' => $movement['operation_number'] ?? '',
                                    'operation_date' => $movement['operation_date'] ?? ''
                                ];
                            }
                        }
                    }
                }
            }
            return Inertia::render('Material/Report', [
                'storesData' => $stores,
                'firstStoreId' => $firstStoreId, // Pass the first store ID to auto-select
                'initialReportData' => $initialReportData // Pass initial report data
            ]);
        }
        
        // Return an error response if user doesn't have permission
        return response()->json([
            'error' => 'Unauthorized action.'
        ], 403);
    }

    public function generateStoreReportData(Request $request) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $storeId = $request->get('storeId');
            
            // Handle date parsing with error checking
            try {
                $reportDateFrom = $request->get('reportFromDate');
                $reportDateTo = $request->get('reportToDate');
                
                // If dates are not provided, use current date
                if (!$reportDateFrom || !$reportDateTo) {
                    $reportDateFrom = date('Y-m-d');
                    $reportDateTo = date('Y-m-d');
                }
                
                $dateFrom = new DateTime($reportDateFrom);
                $formattedFromDate = $dateFrom->format('Y-m-d');
                
                $dateTo = new DateTime($reportDateTo);
                $formattedToDate = $dateTo->format('Y-m-d');
            } catch (Exception $e) {
                // If date parsing fails, use today's date
                $formattedFromDate = date('Y-m-d');
                $formattedToDate = date('Y-m-d');
            }

            // Use the PostgreSQL function to calculate store balances
            // If no store is selected, we pass NULL to get all stores
            if ($storeId) {
                $results = DB::select('SELECT * FROM calculate_store_balance(?, ?, ?, NULL)', [
                    $storeId, // store_id
                    $formattedFromDate, // date_from
                    $formattedToDate // date_to
                ]);
            } else {
                // Get all stores
                $results = DB::select('SELECT * FROM calculate_store_balance(NULL, ?, ?, NULL)', [
                    $formattedFromDate, // date_from
                    $formattedToDate // date_to
                ]);
            }

            // Transform the results into the expected format
            $balanceData = [];
            foreach ($results as $result) {
                $productId = $result->product_id;
                
                // Initialize the product in balanceData if it doesn't exist
                if (!isset($balanceData[$productId])) {
                    $balanceData[$productId] = [
                        'startPeriod' => [
                            'product_id' => (int)$productId,
                            'product_name' => $result->product_name,
                            'balance_quantity' => (float)$result->beginning_balance_qty,
                            'balance_fact_quantity' => (float)$result->beginning_balance_fact_qty
                        ],
                        'movement' => []
                    ];
                }
                
                // Add movements
                $movements = json_decode($result->movements, true);
                if (is_array($movements)) {
                    foreach ($movements as $movement) {
                        $balanceData[$productId]['movement'][] = [
                            'total_quantity' => (float)(($movement['incoming_qty'] ?? 0) - ($movement['outgoing_qty'] ?? 0)),
                            'total_fact_dt' => (float)(($movement['incoming_fact_qty'] ?? 0) - ($movement['outgoing_fact_qty'] ?? 0)),
                            'unit_name' => '', // Not available in current data
                            'producer_name' => '', // Not available in current data
                            'document_type' => $movement['document_type'] ?? '',
                            'invoice_number' => $movement['operation_number'] ?? '',
                            'operation_date' => $movement['operation_date'] ?? ''
                        ];
                    }
                }
            }

            return response()->json([
                'results' => $balanceData,
                'clinicData' => $clinicData,
                'dates' => [
                    'from' => $formattedFromDate,
                    'to' => $formattedToDate
                ]
            ]);
        }
        
        // Return an error response if user doesn't have permission
        return response()->json([
            'error' => 'Unauthorized action.'
        ], 403);
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
//        $resData = DB::select('
//            SELECT m.name, m.unit_id, m.fact_unit_id, u.name AS packunit_name, u2.name as perunit_name,
//                m.id AS product_id,
//                m.price, sm.fact_qty, sm.quantity
//            FROM materials m
//            LEfT JOIN store_materials sm ON sm.material_id = m.id
//            LEFT JOIN units u ON u.id = sm.unit_id
//            LEFT JOIN units u2 ON u2.id = sm.fact_unit_id
//            WHERE
//              LOWER(m.name) LIKE \'%' .mb_strtolower($name). '%\'
//        ');
        $resData = DB::select('
            SELECT SUM(sm.fact_qty) AS unit_total, SUM(sm.qty) AS pack_total, u.name AS pack_name, 
                   u2.name as unit_name, sm.material_id, m.name AS material_name,
                   sm.unit_id, sm.fact_unit_id, sm.material_id 
            FROM store_materials sm
                LEFT JOIN materials m ON m.id = sm.material_id
                LEFT JOIN units u ON u.id = sm.unit_id
                LEFT JOIN units u2 ON u2.id = sm.fact_unit_id
            WHERE LOWER(m.name) LIKE \'%' .mb_strtolower($name). '%\' AND store_id = ' .$storeId. '
                    AND fact_unit_id > 0
            GROUP BY material_id, store_id, u.name, u2.name, sm.material_id, m.name,
                sm.unit_id, sm.fact_unit_id, sm.material_id            
        ');



        return response()->json([
            'items' => $resData
        ]);
    }

    public function findMaterial(Request $request) {
        $name = $request->searchName;
        return $this->withClinicSchema($request, function($clinicId, $name) use ($request) {
            $resData = DB::table('materials')->select('*')
                ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
                ->get();
            return response()->json([
                'items' => $resData
            ]);
        });
    }


    public function findUnit(Request $request) {
        $name = $request->searchName;
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $name = $request->searchName;
            $producerData = DB::table('units')->select('name', 'id')
                ->where('name', 'like', $name.'%')
                ->get();
        });
        return response()->json([
            'items' => $producerData
        ]);
    }

    public function findSize(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $name = $request->searchName;
            $producerData = DB::table('sizes')->select('name', 'id')
                ->where('name', 'like', $name.'%')
                ->get();

            return response()->json([
                'items' => $producerData
            ]);
        });
    }

    public function findPercent(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $catData = DB::table('material_categories')->select('percent', 'id')
                ->where('id', '=', $request->searchId)
                ->get();
            return response()->json([
                'percent' => $catData[0]->percent
            ]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer) {
        //
    }
}
