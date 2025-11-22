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

class PricingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $categories = PriceCategory::where('parent_id', null)
            ->where('clinic_id', $clinicData->id)
            ->get();
        $arrServices = [];
        foreach ($categories as $category) {
            $arrServices[$category->id] = Pricing::where('category_id', '=', $category->id)->orderBy('name')->get();
        }
        $arrCat = array();
        $tree = $this->generateCategories($categories, $arrCat, 0);
        return Inertia::render('Pricing/List', [
            'clinicData' => $clinicData,
            'categoriesData' => $categories,
            'services' => $arrServices,
            'tree' => $tree,
            'currency' => $clinicData->currency->symbol
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
    public function create(Request $request) {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $categories = PriceCategory::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $unitData = Unit::all();
            $formData = new Pricing();
            return Inertia::render('Pricing/Create', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'unitData' => $unitData,
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
            $categories = PriceCategory::where('parent_id', null)
                ->where('clinic_id', $clinicData->id)
                ->orWhere('special', true)
                ->get();
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);
            $unitData = Unit::all();
            $formData = Pricing::find($request->id);
            $formRow = DB::table('pricing_items')
                ->select('pricing_items.*', 'materials.name AS product', "materials.id AS product_id")
                ->leftJoin('materials', 'materials.id', '=', 'pricing_items.material_id')
                ->where('pricing_id', $request->id)->get();
            return Inertia::render('Pricing/Edit', [
                'clinicData' => $clinicData,
                'categoryData' => $tree,
                'unitData' => $unitData,
                'formData' => $formData,
                'formRowData' => $formRow
            ]);
        } else {

        }
    }

    public function updatePriceCategory(Request $request) {
        if ($request->user()->can('store-edit')) {
            if (!$request->id) {
                $priceCategory = new PriceCategory();
                $priceCategory->name = $request->name;
                $priceCategory->clinic_id = $request->clinic_id;
                $priceCategory->save();
            }
            return to_route('pricing.categories.index');
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PricingUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
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
                    $pricingItem->price = $row["price"];
                    $pricingItem->total = ($row["quantity"])*floatval($row["price"]);
                    $total += ($row["quantity"])*floatval($row["price"]);
                    $pricingItem->save();
                }

            }
            $pricing->total = floatval($total) + floatval($request->price ? $request->price : 0);
            $pricing->save();
        }

        return Redirect::route('pricing.categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicFilial $filial) {
        //
    }
}
