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
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");
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
            $arrCat[] = $category;
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
//                dd($formRow);exit;
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
            $resData = DB::table('pricings')->select('id', 'name', 'price')
                ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
                ->orderBy('name')
                ->limit(20)
                ->get();
            return response()->json([
                'items' => $resData
            ]);
        });
    }

    public function findServiceItems(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $serviceId = $request->serviceId;

            $filialId = $request->session()->get('filial_id');
            $storeId = DB::table('stores')->where('filial_id', $filialId)->value('id');

            // 1. Отримуємо базові компоненти послуги з таблиці pricing_items разом із матеріалами та одиницями
            $pricingItems = DB::table('pricing_items')
                ->select(
                    'pricing_items.*',
                    'materials.name AS product',
                    'units.name AS unit_name',
                    'materials.is_instrument',
                    'materials.expected_uses',
                    'materials.price AS fallback_price'
                )
                ->leftJoin('materials', 'materials.id', '=', 'pricing_items.material_id')
                ->leftJoin('units', 'units.id', '=', 'pricing_items.unit_id')
                ->where('pricing_id', '=', $serviceId)
                ->get();

            if ($pricingItems->isEmpty() || !$storeId) {
                return response()->json(['items' => []]);
            }

            // Збираємо всі унікальні material_id для запиту партій зі складу
            $materialIds = $pricingItems->pluck('material_id')->unique()->all();

            // Кешуємо доступні партії по кожному матеріалу (де є залишок)
            $availableByMaterial = [];
            foreach ($materialIds as $materialId) {
                $availableByMaterial[$materialId] = DB::table('store_batches')
                    ->where('store_id', $storeId)
                    ->where('material_id', $materialId)
                    ->where('fact_qty_left', '>', 0)
                    ->orderBy('arrived_at')
                    ->orderBy('id')
                    ->get(['id', 'arrived_at', 'fact_qty_left', 'price_per_unit'])
                    ->map(fn ($batch) => [
                        'id' => $batch->id,
                        'arrived_at' => $batch->arrived_at,
                        'fact_qty_left' => (float) $batch->fact_qty_left,
                        'price_per_unit' => (float) $batch->price_per_unit,
                    ])
                    ->all();
            }

            $resultItems = [];

            // 2. Проходимо по кожному компоненту і робимо FIFO-розрахунок
            foreach ($pricingItems as $item) {
                $materialId = (int) $item->material_id;
                $requiredQty = (float) $item->quantity; // Кількість за замовчуванням у рецептурі
                $remainingQty = $requiredQty;
                $cost = 0.0;
                $batches = [];

                $isInstrument = (bool) $item->is_instrument;
                $expectedUses = (int) ($item->expected_uses ?? 0);
                $fallbackPrice = (float) ($item->fallback_price ?? 0);

                // Симулюємо списування по партіях (FIFO)
                if (isset($availableByMaterial[$materialId])) {
                    foreach ($availableByMaterial[$materialId] as &$batch) {
                        if ($remainingQty <= 0) {
                            break;
                        }

                        $usedQty = min($remainingQty, $batch['fact_qty_left']);
                        $rawUnitCost = $batch['price_per_unit'] > 0 ? $batch['price_per_unit'] : $fallbackPrice;

                        // Враховуємо амортизацію для інструментів
                        $unitCost = ($isInstrument && $expectedUses > 0) ? ($rawUnitCost / $expectedUses) : $rawUnitCost;
                        $lineCost = round($usedQty * $unitCost, 4);

                        $batches[] = [
                            'batch_id' => $batch['id'],
                            'arrived_at' => $batch['arrived_at'],
                            'quantity' => $usedQty,
                            'price_per_unit' => round($unitCost, 4),
                            'total' => $lineCost,
                        ];

                        $cost += $lineCost;
                        $remainingQty = round($remainingQty - $usedQty, 4);
                        // Зменшуємо залишок локально в симуляції для наступних ітерацій
                        $batch['fact_qty_left'] = round($batch['fact_qty_left'] - $usedQty, 4);
                    }
                    unset($batch);
                }

                $availableQty = round($requiredQty - $remainingQty, 4);
                $shortageQty = max(0, $remainingQty);

                // Вираховуємо actual_price (як у вашому старому запиті)
                $rawPriceForCalc = !empty($batches) ? $batches[0]['price_per_unit'] : $fallbackPrice;
                $actualPrice = ($isInstrument && $expectedUses > 0) ? ($rawPriceForCalc / max($expectedUses, 1)) : $rawPriceForCalc;

                // Формуємо фінальний об'єкт компонента з усіма партіями та статусом залишків
                $resultItems[] = [
                    'id' => $item->id,
                    'pricing_id' => $item->pricing_id,
                    'material_id' => $materialId,
                    'quantity' => $requiredQty,
                    'unit_id' => $item->unit_id,
                    'price' => $item->price,
                    'total' => $item->total,
                    'mark_up' => $item->mark_up,
                    'base_price' => $item->base_price,
                    'product' => $item->product,
                    'unit_name' => $item->unit_name,
                    'actual_price' => (string)$actualPrice,
                    'is_instrument' => $isInstrument,
                    'expected_uses' => $item->expected_uses,
                    'base_quantity' => $item->base_quantity ?? $requiredQty,
                    // Додаємо поля FIFO прямо в компонент під час первинного завантаження
                    'available_qty' => $availableQty,
                    'shortage_qty' => $shortageQty,
                    'cost' => round($cost, 4),
                    'batches' => $batches,
                ];
            }

            return response()->json([
                'items' => $resultItems
            ]);
        });
    }



    public function update(PricingUpdateRequest $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            try {
                \Log::info('=== PRICING UPDATE START ===');
                \Log::info('Request data:', $request->all());

                if (!$request->user()->can('service-edit')) {
                    abort(403, 'Немає прав service-edit');
                }

                DB::beginTransaction();

                if ($request->id) {
                    $pricing = Pricing::find($request->id);
                    if (!$pricing) {
                        throw new \Exception('Pricing not found with id: ' . $request->id);
                    }
                    DB::table('pricing_items')->where('pricing_id', $pricing->id)->delete();
                } else {
                    $pricing = new Pricing();
                }

                $pricing->name = $request->name;
                $pricing->category_id = $request->category_id;
                $pricing->price = $request->price;
                $pricing->duration = $request->duration;
                $pricing->save();

                \Log::info('Pricing saved, id = ' . $pricing->id);
                $total = 0;

                foreach ($request->rows as $index => $row) {
                    \Log::info("Row {$index}:", $row);

                    if (empty($row['product_id'])) {
                        continue;
                    }

                    $item = new PricingItems();
                    $item->pricing_id = $pricing->id;
                    $item->material_id = $row['product_id'];
                    $item->unit_id = $row['unit_id'] ?? null;
                    $item->quantity = str_replace(',', '.', $row['quantity'] ?? 0);
                    $item->price = $row['price'];
                    $item->total = $row['total'];
                    $item->mark_up = $row['mark_up'];
                    $total += $row['total'];
                    $item->save();
                }

                $pricing->total_price = $total; // Проверь название колонки в БД, если у тебя просто total, то меняй на $pricing->total = $total;
                $pricing->save();

                DB::commit();
                \Log::info('=== PRICING UPDATE SUCCESS ===');

                return Redirect::route('service.index');

            } catch (\Throwable $e) {
                DB::rollBack();

                \Log::error('PRICING UPDATE ERROR: ' . $e->getMessage());
                \Log::error($e->getTraceAsString());

                // Тимчасово повертаємо текст помилки прямо в браузер
                return response('<h1>Помилка</h1><pre>' . $e->getMessage() . "\n\n" . $e->getTraceAsString() . '</pre>', 500);
            }
        });
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateOld(PricingUpdateRequest $request) {
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
                dd($request);exit;
                foreach ($request->rows as $row) {
                    if ($row["product_id"]) {
                        $pricingItem = new PricingItems();
                        $pricingItem->pricing_id = $pricingId;
                        $pricingItem->unit_id = $row["unit_id"];
                        $pricingItem->material_id = $row["product_id"];
                        $pricingItem->quantity = $row["quantity"];
                        $pricingItem->price = $row["price"];
                        $pricingItem->total = $row["total"];
                        $pricingItem->mark_up = $row["mark_up"];
                        $pricingItem->base_price = $row["base_price"] || 0;
                        $total += $row["total"];
                        $pricingItem->save();
                    }

                }
                $pricing->total_price = $total + $request->price;
                dd($pricing->total_price);
                $pricing->save();

                return Redirect::route('service.index');
            }
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicFilial $filial) {
        //
    }
}
