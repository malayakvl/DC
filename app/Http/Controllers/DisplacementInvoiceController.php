<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceChangeUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\Displacement;
use App\Models\Filial;
use App\Models\DocumentOperations;
use App\Models\DisplacementItems;
use App\Models\InvoiceStatus;
use App\Models\InvoiceType;
use App\Models\Material;
use App\Models\Producer;
use App\Models\Store;
use App\Models\Invoice;
use App\Models\StoreMaterials;
use App\Models\Tax;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class DisplacementInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->user()->roles[0]->name != 'Admin') {
            // get store filial
            $filialId = $request->session()->get('filial_id');
            $filialdData = ClinicFilial::where('id', '=', $filialId)->first();
            $storeId = $filialdData->store_id;
        }
        if ($request->user()->roles[0]->name == 'Admin') {
            $invoiceData = DB::select('
                        SELECT ds.*, st.name as storeFromName, st1.name as storeToName,
                            ist.name AS status_name, usr.name AS customer_name
                        FROM displacements ds
                        LEFT JOIN stores st ON st.id=ds.storefrom_id
                        LEFT JOIN stores st1 ON st1.id = ds.storeto_id
                        LEFT JOIN invoice_statuses ist ON ist.id = ds.status_id
                        LEFT JOIN users usr ON usr.id = ds.customer_id
                        WHERE ds.clinic_id='.$clinic->id.'
                        ORDER BY invoice_number DESC
                    ');
        } else {
            $invoiceData = DB::select('
                        SELECT ds.*, st.name as storeFromName, st1.name as storeToName,
                            ist.name AS status_name, usr.name AS customer_name
                        FROM displacements ds
                        LEFT JOIN stores st ON st.id=ds.storefrom_id
                        LEFT JOIN stores st1 ON st1.id = ds.storeto_id
                        LEFT JOIN invoice_statuses ist ON ist.id = ds.status_id
                        LEFT JOIN users usr ON usr.id = ds.customer_id
                        WHERE (ds.storefrom_id='.$storeId.' OR ds.storeto_id='.$storeId.')
                        ORDER BY invoice_number DESC
                    ');
        }
        return Inertia::render('InvoiceChange/List', [
            'clinicData' => $clinic,
            'listData' => $invoiceData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('invoice-exchange-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
//            $storeData = Store::where('clinic_id', $clinicData->id)->get();
            $storeData = Store::where('clinic_id', $clinicData->id)->where('filial_id', $request->session()->get('filial_id'))->get();
            $unitsData = Unit::where('clinic_id', $clinicData->id)->get();
            $statusData = InvoiceStatus::all();
            $currencyData = Currency::where('clinic_id', $clinicData->id)->get();
            $taxData = Tax::where('clinic_id', $clinicData->id)->get();
            $typeData = InvoiceType::all();
            $formData = new Invoice();
            $lastInvoiceNum = DB::table('invoices')
                ->where('clinic_id', $clinicData->id)
                ->max('invoice_number');
            if (!$lastInvoiceNum) {
                $num = 1;
            } else {
                $maxNum = (explode('-', $lastInvoiceNum));
                if (intval($maxNum[1])) {
                    $num = intval($maxNum[1]);
                }
                ++$num;
            }
            $formData->invoice_number = date("dmy").'-'.$paddedNumber = str_pad($num, 7, '0', STR_PAD_LEFT);;
            $producerData = Producer::all();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)
                ->orderBy('name')->get();
            return Inertia::render('InvoiceChange/Create', [
                'clinicData' => $clinicData,
                'filialData' => $storeData,
                'formData' => $formData,
                'storeData' => $storeData,
                'customerData' => $customerData,
                'producerData' => $producerData,
                'statusData' => $statusData,
                'typeData' => $typeData,
                'currencyData' => $currencyData,
                'taxData' => $taxData,
                'unitsData' => $unitsData
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('invoice-exchange-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $storeData = Store::where('clinic_id', $clinicData->id)->get();
            $statusData = InvoiceStatus::all();
            $typeData = InvoiceType::all();
            $formData = Displacement::find($id);
            $currencyData = Currency::where('clinic_id', $clinicData->id)->get();
            $taxData = Tax::where('clinic_id', $clinicData->id)->get();
            $rowData = DisplacementItems::select('displacement_items.*', 'materials.name as product')
                ->leftJoin('materials', 'materials.id', '=', 'displacement_items.product_id')
                ->where('invoice_id', $id)->get();

            $producerData = Producer::all();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            return Inertia::render('InvoiceChange/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $storeData,
                'formData' => $formData,
                'formRowData' => $rowData,
                'storeData' => $storeData,
                'customerData' => $customerData,
                'producerData' => $producerData,
                'statusData' => $statusData,
                'typeData' => $typeData,
                'currencyData' => $currencyData,
                'taxData' => $taxData
            ]);

        } else {

        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('invoice-exchange-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Store/FilialView', [
                'filialData' => $filial,
            ]);
        } else {

        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(InvoiceChangeUpdateRequest $request) {
        if ($request->id) {
            $data = $request;
        } else {
            $data = $request->values;
        }
        if ($request->user()->can('invoice-exchange-edit')) {
            if ($request->id)
                $invoice = Displacement::find($data->id);
            else {
                $invoice = new Displacement();
            }
            $invoice->fill($request->validated());
            $invoice->invoice_number = $request->invoice_number;
            $invoice->invoice_date = $request->invoice_date;
            $invoice->status_id = $request->status_id;
            $invoice->storefrom_id = $request->storefrom_id;
            $invoice->storeto_id = $request->storeto_id;
            $invoice->save();
            if (!$request->id) {
                $invoiceId = $invoice->id;
            } else {
                $invoiceId = $request->id;
                DB::table('displacement_items')->where('invoice_id', $invoiceId)->delete();
            }

            if ($request->status_id === 2) {
                DB::table('document_operations')
                    ->where('document_id', $invoiceId)
                    ->where('document_type', 'invoice')
                    ->delete();
            }
            $total = 0;
            $storeFrom = Store::find($request->storefrom_id);
            $storeTo = Store::find($request->storeto_id);
            foreach ($request->rows as $row) {
                $materialQty = floatval($row["fact_qty"]);
                $material = Material::find($row["product_id"]);
                // делаем перемещение в табличке остатков
                // находим в остатках позиции у котороих не нулевое значение на остатке склада
                $storeQuery = 'SELECT sm.*, m.name AS material_name,
	                    sm.unit_id, sm.fact_unit_id, sm.material_id, m.producer_id 
                    FROM store_materials sm
                    LEFT JOIN materials m ON m.id = sm.material_id
                    LEFT JOIN units u ON u.id = sm.unit_id
                    LEFT JOIN units u2 ON u2.id = sm.fact_unit_id
                    WHERE  sm.material_id = ' .$row["product_id"]. ' AND  store_id = ' .$request->storefrom_id. ' AND sm.store_fact_qty > 0
                    ORDER BY doc_date ASC';
                $storeRes = DB::select($storeQuery);
                foreach ($storeRes as $storeData) {
                    $storeDataM = StoreMaterials::find($storeData->id);

                    if ($storeData->store_fact_qty >= $materialQty) {
                        $storeDataM->store_fact_qty = $storeData->store_fact_qty - $materialQty;
                        $unitPrice = $storeData->price_per_unit;
                        $qtyD = $materialQty;
                        $materialQty = 0;
                    } else {
                        $materialQty = $materialQty - $storeDataM->store_fact_qty;
                        $unitPrice = $storeData->price_per_unit;
                        $qtyD = $storeDataM->store_fact_qty;
                        $storeDataM->store_fact_qty = 0;
                    }
                    $dStoreMaterials = new StoreMaterials();
                    $dStoreMaterials->doc_date = $request->invoice_date;
                    $dStoreMaterials->document_type = 'echinv';
                    $dStoreMaterials->document_id = $invoiceId;
                    $dStoreMaterials->store_id = $request->storeto_id;
                    $dStoreMaterials->material_id = $row["product_id"];
                    $dStoreMaterials->qty = $row["quantity"];
                    $dStoreMaterials->store_qty = $qtyD;
                    $dStoreMaterials->unit_id = $storeData->unit_id;
                    $dStoreMaterials->fact_qty = $qtyD;
                    $dStoreMaterials->store_fact_qty = $qtyD;
                    $dStoreMaterials->fact_unit_id = $storeData->fact_unit_id;
                    $dStoreMaterials->price_per_unit = $unitPrice;
                    $dStoreMaterials->producer_id = $storeData->producer_id;
                    $dStoreMaterials->save();

                    $invoiceItem = new DisplacementItems();
                    $invoiceItem->invoice_id = $invoiceId;
                    $invoiceItem->product_id = $row["product_id"];
                    $invoiceItem->quantity = $row["quantity"];
                    $invoiceItem->price = $qtyD;
                    $invoiceItem->total = $qtyD*$unitPrice;
                    $invoiceItem->fact_qty = $row["quantity"];
                    $invoiceItem->unit_id = $material->unit_id;
                    $invoiceItem->price_per_unit = $unitPrice;
                    $invoiceItem->save();


                    $documentOperation  = new DocumentOperations();
                    $documentOperation->operation_date = $request->invoice_date;
                    $documentOperation->operation_number = $request->invoice_number;
                    $documentOperation->document_id = $invoiceId;
                    $documentOperation->amount = $qtyD*$unitPrice;
                    $documentOperation->document_type = 'displacements';
                    $documentOperation->operation_dt = '281';
                    $documentOperation->subconto_dt = json_encode(array(
                        'store_id' => $request->storeto_id,
                        'store_name' => $storeTo->name,
                        'product_id' => $material->id,
                        'product_name' => $material->name,
                        'price_per_unit' => $unitPrice,
                        'fact_qty' => $qtyD
                    ));
                    $documentOperation->operation_kt = '281';
                    $documentOperation->subconto_kt = json_encode(array(
                        'store_id' => $request->storefrom_id,
                        'store_name' => $storeFrom->name,
                        'product_id' => $material->id,
                        'product_name' => $material->name,
                        'price_per_unit' => $unitPrice,
                        'fact_qty' => $qtyD
                    ));
                    $documentOperation->quantity = $row["quantity"];
                    $documentOperation->comment = 'move_products';
                    $documentOperation->save();

                    $storeDataM->save();
                    if ($materialQty === 0) {
                        break;
                    }
                }
//                dd($materialQty);exit;


//                DB::select('
//                        INSERT INTO store_materials AS sm (store_id, material_id, producer_id)
//                        VALUES ('.$request->storefrom_id.', '.$row["product_id"].', '.$row["producer_id"].')
//                        ON CONFLICT ON CONSTRAINT store_materials_pkey
//                        DO UPDATE SET
//                        weight = sm.weight - '.($material->weight*$row["quantity"]). ',
//                        quantity = sm.quantity - ' .$row["quantity"]. ';
//                    ');
//                DB::select('
//                        INSERT INTO store_materials AS sm (store_id, material_id, producer_id, quantity, weight)
//                        VALUES ('.$request->storeto_id.', '.$row["product_id"].', '.$row["producer_id"].', '.$row["quantity"].', '.($material->weight*$row["quantity"]).')
//                        ON CONFLICT ON CONSTRAINT store_materials_pkey
//                        DO UPDATE SET
//                        weight = sm.weight + '.($material->weight*$row["quantity"]). ',
//                        quantity = sm.quantity + ' .$row["quantity"]. ';
//                    ');
//                if (intval($request->status_id) === 2) {
//                    $documentOperation  = new DocumentOperations();
//                    $documentOperation->operation_date = $request->invoice_date;
//                    $documentOperation->operation_number = $request->invoice_number;
//                    $documentOperation->document_id = $invoiceId;
//                    $documentOperation->amount = 0;
//                    $documentOperation->document_type = 'displacements';
//                    $documentOperation->operation_dt = '281';
//                    $documentOperation->subconto_dt = json_encode(array(
//                        'store_id' => $request->storeto_id,
//                        'name' => $storeTo->name,
//                        'product_id' => $row["product_id"],
//                        'product_name' => $row['product']
//                    ));
//                    $documentOperation->operation_kt = '281';
//                    $documentOperation->subconto_kt = json_encode(array(
//                        'store_id' => $request->storefrom_id,
//                        'name' => $storeFrom->name,
//                        'product_id' => $row["product_id"],
//                        'product_name' => $row['product']
//                    ));
//                    $documentOperation->quantity = $row["quantity"];
//                    $documentOperation->comment = 'move_products';
//                    $documentOperation->save();
//                }
            }

            return Redirect::route('invoice.change.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Displacement $displacement) {
        //
    }
}
