<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FilialController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\IncomingInvoiceController;
use App\Http\Controllers\DisplacementInvoiceController;
use App\Http\Controllers\OutgoingInvoiceController;
use App\Http\Controllers\SchedulerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialCategoresController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\PatientStatusController;
use App\Http\Controllers\SupplierController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/clinic-new', [ClinicController::class, 'create'])
    ->name('clinic.new');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard.index');
Route::get('/dashboard-select', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard.index');

Route::get('/dashboard-select', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard.select');

//Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
//    ->middleware(['auth', 'verified'])->name('dashboard.select');

Route::get('/clinic/accept', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'accept'])
    ->name('clinic.accept');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/clinic/create', [ClinicController::class, 'create'])->name('clinic.create');
    Route::post('/clinic/update', [ClinicController::class, 'update'])->name('clinic.update');
    Route::get('/enter-filial', [ClinicController::class, 'filialEnter'])->name('filial.enter');
    Route::post('/clinic/findProducers', [ClinicController::class, 'findProducer'])->name('find.producer');

//    Route::get('/clinic/accept', [ClinicController::class, 'accept'])->name('clinic.accept');

    Route::get('/roles', [RoleController::class, 'index'])->name('role.index');
    Route::get('/role/create', [RoleController::class, 'create'])->name('role.create');
    Route::get('/role/edit/{id}', [RoleController::class, 'edit'])->name('role.edit');
    Route::post('/role/update/{id}', [RoleController::class, 'update'])->name('role.update');
    Route::post('/role/store/', [RoleController::class, 'store'])->name('role.store');
//    Route::get('/clinic/roles', [RoleController::class, 'index'])->name('role.index')
//    ->middleware('can:clinic-create');

    Route::get('/filials', [FilialController::class, 'index'])->name('clinic.filials');
    Route::get('/filial/edit/{id}', [FilialController::class, 'edit'])->name('filial.edit');
    Route::get('/filial/show/{id}', [FilialController::class, 'show'])->name('filial.show');
    Route::get('/filial/create', [FilialController::class, 'create'])->name('filial.create');
    Route::post('/filial/update', [FilialController::class, 'update'])->name('filial.update');

    Route::get('/patients', [PatientController::class, 'index'])->name('patient.index');
    Route::post('/patients', [PatientController::class, 'index'])->name('patient.index');
    Route::get('/patient/create', [PatientController::class, 'create'])->name('patient.create');
    Route::get('/patient/edit/{id}', [PatientController::class, 'edit'])->name('patient.edit');
    Route::post('/patient/update-formula', [PatientController::class, 'updateFormula'])->name('patient.updateFormula');
    Route::post('/patient/update-perio', [PatientController::class, 'updatePerio'])->name('patient.updatePerio');
    Route::post('/patient/update-psr', [PatientController::class, 'updatePSR'])->name('patient.updatePSR');
    Route::post('/patient/update', [PatientController::class, 'update'])->name('patient.update');
    Route::get('/patient/view/{id}/{eventId}', [PatientController::class, 'view'])->name('patient.view');
    Route::get('/patient/view/{id}', [PatientController::class, 'view'])->name('patient.view');
    Route::post('/patient/create-treatment', [PatientController::class, 'createTreatment'])->name('patient.createTreatment');
    Route::get('/patient/cliniccard/{id}', [PatientController::class, 'cliniccard'])->name('patient.cliniccard');
    Route::post('/patient/update-act', [PatientController::class, 'updateAct'])->name('patient.updateAct');
    Route::get('/patient/finances/{id}', [PatientController::class, 'view'])->name('patient.finances');
    Route::post('/patient/finances', [PatientController::class, 'view'])->name('patient.');
    Route::post('/patient/finances/{id}', [PatientController::class, 'view'])->name('patient.viewFinances');

    Route::get('/patient-statuses', [PatientStatusController::class, 'index'])->name('patient-status.index');
    Route::get('/patient-status/create', [PatientStatusController::class, 'create'])->name('patient-status.create');
    Route::get('/patient-status/edit/{id}', [PatientStatusController::class, 'edit'])->name('patient-status.edit');
    Route::post('/patient-status/update', [PatientStatusController::class, 'update'])->name('patient-status.update');

    Route::get('/formula/edit/{id}', [PatientController::class, 'formulaEdit'])->name('patient.formula.edit');
    Route::get('/formula/copy/{id}', [PatientController::class, 'formulaCopy'])->name('patient.formula.copy');
    Route::get('/perio/edit/{id}', [PatientController::class, 'perioEdit'])->name('patient.perio.edit');
    Route::get('/perio/copy/{id}', [PatientController::class, 'perioCopy'])->name('patient.perio.copy');
    Route::get('/psr/edit/{id}', [PatientController::class, 'psrEdit'])->name('patient.psr.edit');
    Route::get('/psr/copy/{id}', [PatientController::class, 'psrCopy'])->name('patient.psr.copy');
    Route::get('/import-data', [ImportController::class, 'index'])->name('import.index');
    Route::post('/import/save', [ImportController::class, 'update'])->name('import.update');

    Route::get('/stores', [StoreController::class, 'index'])->name('store.index');
    Route::get('/store/create', [StoreController::class, 'create'])->name('store.create');
    Route::get('/store/edit/{id}', [StoreController::class, 'edit'])->name('store.edit');
    Route::post('/store/update', [StoreController::class, 'update'])->name('store.update');

    Route::get('/units', [UnitController::class, 'index'])->name('unit.index');
    Route::get('/unit/create', [UnitController::class, 'create'])->name('unit.create');
    Route::get('/unit/edit/{id}', [UnitController::class, 'edit'])->name('unit.edit');
    Route::get('/unit/delete/{id}', [UnitController::class, 'delete'])->name('unit.delete');
    Route::post('/unit/update', [UnitController::class, 'update'])->name('unit.update');


    Route::get('/material-categories', [MaterialCategoresController::class, 'index'])->name('material.categories.index');
    Route::get('/material-category/create', [MaterialCategoresController::class, 'create'])->name('material.categories.create');
    Route::get('/material-category/edit/{id}', [MaterialCategoresController::class, 'edit'])->name('material.categories.edit');
    Route::get('/material-category/delete/{id}', [MaterialCategoresController::class, 'delete'])->name('material.categories.delete');
    Route::get('/material-category/update', [MaterialCategoresController::class, 'update'])->name('material.categories.update');

    Route::get('/producers', [ProducerController::class, 'index'])->name('producer.index');
    Route::get('/producer/create', [ProducerController::class, 'create'])->name('producer.create');
    Route::get('/producer/edit/{id}', [ProducerController::class, 'edit'])->name('producer.edit');
    Route::post('/producer/update', [ProducerController::class, 'update'])->name('producer.update');

    Route::get('/suppliers', [SupplierController::class, 'index'])->name('supplier.index');
    Route::get('/supplier/create', [SupplierController::class, 'create'])->name('supplier.create');
    Route::get('/supplier/edit/{id}', [SupplierController::class, 'edit'])->name('supplier.edit');
    Route::post('/supplier/update', [SupplierController::class, 'update'])->name('supplier.update');

    Route::get('/sizes', [SizeController::class, 'index'])->name('size.index');
    Route::get('/size/create', [SizeController::class, 'create'])->name('size.create');
    Route::get('/size/edit/{id}', [SizeController::class, 'edit'])->name('size.edit');
    Route::post('/size/update', [SizeController::class, 'update'])->name('size.update');

    Route::get('/cabinets', [CabinetController::class, 'index'])->name('cabinet.index');
    Route::get('/cabinet/create', [CabinetController::class, 'create'])->name('cabinet.create');
    Route::get('/cabinet/edit/{id}', [CabinetController::class, 'edit'])->name('cabinet.edit');
    Route::post('/cabinet/update', [CabinetController::class, 'update'])->name('cabinet.update');

    Route::get('/materials', [MaterialController::class, 'index'])->name('material.index');
    Route::get('/material/create', [MaterialController::class, 'create'])->name('material.create');
    Route::get('/material/edit/{id}', [MaterialController::class, 'edit'])->name('material.edit');
    Route::post('/material/update', [MaterialController::class, 'update'])->name('material.update');
    Route::post('/material/findByUnit', [MaterialController::class, 'findUnit'])->name('material.findUnit');
    Route::post('/material/findBySize', [MaterialController::class, 'findSize'])->name('material.findSize');
    Route::post('/material/findPercent', [MaterialController::class, 'findPercent'])->name('material.findPercent');
    Route::post('/material/findMaterial', [MaterialController::class, 'findMaterial'])->name('material.findMaterial');
    Route::post('/material/findStoreMaterial', [MaterialController::class, 'findStoreMaterial'])->name('material.findStoreMaterial');

    Route::get('/store-report', [MaterialController::class, 'storeReport'])->name('materials.report');
    Route::post('/material/generateStoreReport', [MaterialController::class, 'generateStoreReportData'])->name('materials.report.data');

    Route::get('/invoice-incoming', [IncomingInvoiceController::class, 'index'])->name('invoice.incoming.index');
    Route::get('/invoice-incoming/create', [IncomingInvoiceController::class, 'create'])->name('invoice.incoming.create');
    Route::get('/invoice-incoming/edit/{id}', [IncomingInvoiceController::class, 'edit'])->name('invoice.incoming.edit');
    Route::post('/invoice-incoming/update', [IncomingInvoiceController::class, 'update'])->name('invoice.incoming.updated');

    Route::get('/invoice-change', [DisplacementInvoiceController::class, 'index'])->name('invoice.change.index');
    Route::get('/invoice-change/create', [DisplacementInvoiceController::class, 'create'])->name('invoice.change.create');
    Route::get('/invoice-change/edit/{id}', [DisplacementInvoiceController::class, 'edit'])->name('invoice.change.edit');
    Route::post('/invoice-change/update', [DisplacementInvoiceController::class, 'update'])->name('invoice.change.updated');

    Route::get('/invoice-outgoing', [OutgoingInvoiceController::class, 'index'])->name('invoice.index');
    Route::get('/invoice-outgoing/create', [OutgoingInvoiceController::class, 'create'])->name('invoice.create');
    Route::get('/invoice-outgoing/edit/{id}', [OutgoingInvoiceController::class, 'edit'])->name('invoice.edit');
    Route::post('/invoice-outgoing/update', [OutgoingInvoiceController::class, 'update'])->name('invoice.updated');

    Route::post('/price-category/update', [PricingController::class, 'updatePriceCategory'])->name('pricing.categories.parent.update');
    Route::get('/pricing', [PricingController::class, 'index'])->name('pricing.categories.index');
    Route::get('/pricing/create', [PricingController::class, 'create'])->name('pricing.categories.create');
    Route::get('/pricing/edit/{id}', [PricingController::class, 'edit'])->name('pricing.categories.edit');
    Route::post('/pricing/update', [PricingController::class, 'update'])->name('pricing.categories.update');

    Route::get('/scheduler', [SchedulerController::class, 'index'])->name('scheduler.index');
    Route::post('/scheduler/update', [SchedulerController::class, 'update'])->name('scheduler.update');
    Route::get('/scheduler/fetchEvents', [SchedulerController::class, 'fetchEvents'])->name('scheduler.fetchEvents');
    Route::get('/scheduler/findPatients', [SchedulerController::class, 'fetchPatients'])->name('scheduler.fetchPatients');
    Route::get('/scheduler/updatePeriod', [SchedulerController::class, 'updatePeriod'])->name('scheduler.updatePeriod');
    Route::post('/scheduler/update-event', [SchedulerController::class, 'updateEvent'])->name('scheduler.updateEvent');

    Route::get('/currency', [CurrencyController::class, 'index'])->name('currency.index');
    Route::get('/currency/edit/{id}', [CurrencyController::class, 'edit'])->name('currency.edit');
    Route::post('/currency/update', [CurrencyController::class, 'update'])->name('currency.updated');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/customer/create', [CustomerController::class, 'create'])->name('customer.create');
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::get('/customer/show/{id}', [CustomerController::class, 'show'])->name('customer.show');
    Route::post('/customer/update', [CustomerController::class, 'update'])->name('customer.update');
    Route::get('/customer/assign/{id}', [CustomerController::class, 'assign'])->name('customer.assign');
    Route::post('/customer/assign-submit', [CustomerController::class, 'assignSubmit'])->name('customer.assignSubmit');
    Route::post('/customer/findByEmail', [CustomerController::class, 'findByEmail'])->name('customer.findByEmail');
});

require __DIR__.'/auth.php';