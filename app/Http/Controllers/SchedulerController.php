<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchedulerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Patient;
use App\Models\PriceCategory;
use App\Models\Pricing;
use App\Models\Scheduler;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use DateTime; // Import the DateTime class from the global namespace
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class SchedulerController extends Controller
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
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial($clinicId);
            $filialId = $request->session()->get('filial_id');
            return Inertia::render('Scheduler/Index', [
                'clinicData' => $clinicData,
            ]);
        });
    }

    public function indexOld(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial($clinicId);
            $filialId = $request->session()->get('filial_id');

            $customerSelectData = DB::table('core.clinic_user as cu')
                        ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                        // ->leftJoin("clinic_{$clinicId}.clinic_filial_user as pfu", 'pfu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.clinic_filial_user as pfu", function ($join) use ($filialId) {
                            $join->on('pfu.user_id', '=', 'u.id')
                                ->where('pfu.filial_id', $filialId);
                        })
                        ->where('cu.clinic_id', $clinicId)
                        ->whereNull('pt.id') // 💥 вот ключевая строка
                        ->select(
                            'u.id',
                            DB::raw("CONCAT(u.last_name, ' ', u.first_name) as name"),
                            'u.first_name',
                            'u.last_name',
                            'u.email',
                            'cu.avatar',
                            'pfu.color',
                            'pfu.avatar'
            )
            ->orderBy('u.last_name')
            ->get();
            // dd($customerSelectData);exit;
            
            // $customerSelectData = DB::select('
            //     SELECT core.users.id,  (core.users.first_name || \' \' || core.users.last_name) AS name,
            //         roles.name AS role_name
            //     FROM core.users
            //     LEFT JOIN clinic_filial_user ON clinic_filial_user.user_id = core.users.id
            //     LEFT JOIN roles ON roles.id = clinic_filial_user.role_id
            //     WHERE clinic_filial_user.role_id != 20 
            //     AND clinic_filial_user.clinic_id = ? AND clinic_filial_user.filial_id =?
            //     ORDER BY name
            // ', [$clinicData->id, $filialId]);
            // dd($customerSelectData);exit;

            // $assistantSelectData = DB::select('
            //     SELECT core.users.id, core.users.file, core.users.color, (core.users.first_name || \' \' || core.users.last_name) AS name,
            //         roles.name AS role_name
            //     FROM core.users
            //     LEFT JOIN clinic_filial_user ON clinic_filial_user.user_id = core.users.id
            //     LEFT JOIN roles ON roles.id = clinic_filial_user.role_id
            //     WHERE clinic_filial_user.role_id = 20 
            //     AND clinic_filial_user.clinic_id = ?
            //         AND clinic_filial_user.filial_id =?
            //     ORDER BY name
            // ', [$clinicData->id, $filialId]);
            $assistantSelectData = DB::table('core.clinic_user as cu')
                        ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                        ->where('cu.clinic_id', $clinicId)
                        ->whereNull('pt.id') // 💥 вот ключевая строка
                        ->select(
                            'u.id',
                    DB::raw("CONCAT(u.last_name, ' ', u.first_name) as name"),
                'u.first_name',
                'u.last_name',
                'u.email',
                'cu.avatar'
            )
            ->orderBy('u.last_name')
            ->get();
            // dd($assistantSelectData);exit;
            // $assistantSelectData = DB::table('core.clinic_user as cu')
            //             ->join('core.users as u', 'cu.user_id', '=', 'u.id')
            //             ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
            //             ->where('cu.clinic_id', $clinicId)
            //             ->whereNull('pt.id') // 💥 вот ключевая строка
            //             ->select(
            //                 'u.id',
            //     'u.first_name',
            //     'u.last_name',
            //     'u.email',
            //     'cu.avatar'
            // )
            // ->orderBy('u.last_name')
            // ->get();


            // $customerData = DB::table('users')
            //     ->select([
            //         'users.id',
            //         'users.color',
            //         'users.first_name',
            //     'users.last_name',
            //     'roles.name AS role_name'
            // ])
            // ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
            // ->leftJoin('roles', 'roles.id', '=', 'clinic_user.role_id')
            // ->where('clinic_user.clinic_id', $clinicData->id)
            // ->where('clinic_user.role_id', '!=', 20)
            // ->orderBy('last_name')
            // ->get();
            $customerData = DB::table('core.clinic_user as cu')
                        ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                        // ->leftJoin("clinic_{$clinicId}.clinic_filial_user as pfu", 'pfu.user_id', '=', 'u.id')
                        ->leftJoin("clinic_{$clinicId}.clinic_filial_user as pfu", function ($join) use ($filialId) {
                            $join->on('pfu.user_id', '=', 'u.id')
                                ->where('pfu.filial_id', $filialId);
                        })
                        ->where('cu.clinic_id', $clinicId)
                        ->whereNull('pt.id') // 💥 вот ключевая строка
                        ->select(
                            'u.id',
                            DB::raw("CONCAT(u.first_name, ' ', u.last_name) as name"),
                'u.first_name',
                'u.last_name',
                'u.email',
                'cu.avatar',
                'pfu.color',
                'pfu.avatar'
            )
            ->orderBy('u.last_name')
            ->get();
            // $customerData = DB::table('core.clinic_user as cu')
            //             ->join('core.users as u', 'cu.user_id', '=', 'u.id')
            //             ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
            //             ->where('cu.clinic_id', $clinicId)
            //             ->whereNull('pt.id') // 💥 вот ключевая строка
            //             ->select(
            //                 'u.id',
            //     'u.first_name',
            //     'u.last_name',
            //     'u.email',
            //     'cu.avatar'
            // )
            // ->orderBy('u.last_name')
            // ->get();
            
            // dd($customerData);exit;

            $categories = PriceCategory::get();
            $arrServices = [];
            foreach ($categories as $category) {
                $arrServices[$category->id] = Pricing::where('category_id', '=', $category->id)->orderBy('name')->get();
            }
            $arrCat = array();
            $tree = $this->generateCategories($categories, $arrCat, 0);

            // Group users by role_name and format into groupedOptions
            App::setLocale($request->user()->locale);
            
            $groupedOptions = $customerData->groupBy('role_name')->map(function ($group, $roleName) {
                return [
                    'label' => __('roles.'.$roleName),
                    'options' => $group->map(function ($user) {
                        return [
                            'value' => $user->id,
                            'label' => $user->first_name . ' ' . $user->last_name,
                            'color' => $user->color
                        ];
                    })->values()->toArray()
                ];
            })->values()->toArray();
            $resources = DB::table('schedulers')
                ->join('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
                ->join('core.users as doctor_user', 'doctor_user.id', '=', 'schedulers.doctor_id')
                ->selectRaw("
        DISTINCT
        schedulers.cabinet_id,
        schedulers.doctor_id,
        CONCAT(schedulers.cabinet_id, '_', schedulers.doctor_id) as id,
        CONCAT(cabinets.name, ' • ', doctor_user.first_name, ' ', doctor_user.last_name) as name
    ")
                ->get();
//            dd($resources);exit;


        if ($request->session()->get('filial_id')) {
//             dd(1);exit;
//            $listCabinets = [];
            $listCabinets = DB::table('cabinets')
                ->select(
                    'cabinets.id',
                    'cabinets.name AS cabinet_name'
                );
//            dd($listCabinets->get() );
//             $listCabinets = DB::table('cabinets')
//                 ->select('cabinets.*', "clinic_filials.name AS filial_name", 'cabinets.id AS resourceId', 'cabinets.name AS resourceTitle')
//                 ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
//                 ->where('cabinets.clinic_id', $clinicData->id)
//                 ->where('cabinets.filial_id', $request->session()->get('filial_id'))
//                 ->orderBy('name')->get();
        } else {
            $listCabinets = DB::table('cabinets')
                ->select('cabinets.*', "clinic_filials.name AS filial_name", 'cabinets.id AS resourceId', 'cabinets.name AS title')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                ->where('cabinets.clinic_id', $clinicData->id)
                ->orderBy('name')->get();
        }
        $groupedCabinets = $listCabinets->groupBy('filial_name')->map(function ($group, $roleName) {
            return [
                'label' => 'Кабінети',
                'options' => $group->map(function ($user) {
                    return [
                        'value' => $user->id,
                        'label' => $user->name,
                    ];
                })->values()->toArray()
            ];
        })->values()->toArray();
        
        $weekStart = date("Y-m-d");
        $weekEnd = date("Y-m-d", strtotime('+3 days'));
//        $eventsData = DB::table('schedulers')
//             ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from', 'cabinets.name AS cabinet_name',
//                 'schedulers.event_time_to', 'clinic_filial_user.color', 'schedulers.status_color', 'schedulers.status_name', 'schedulers.cabinet_id AS resourceId',
//                 'schedulers.event_time_to', 'schedulers.status_color', 'schedulers.status_name', 'schedulers.cabinet_id AS resourceId',
//                 'schedulers.cabinet_id', 'schedulers.cabinet_id', 'users.first_name AS p_name', 'users.last_name AS pl_name',
//                 'schedulers.patient_id', 'schedulers.status_name AS event_status',
//                 'users.first_name', 'users.last_name', 'schedulers.description', 'schedulers.services', 'patients.birthday', 'patients.balance', 'patients.discount', 'users.id AS doctor_id',
//                 'patient_discount_statuses.name AS status_name', 'patient_discount_statuses.discount AS status_discount', 'schedulers.id AS event_id',
//                 'patient_discount_statuses.discount', 'patient_discount_statuses.name AS patient_status_name', 'clinic_filial_user.avatar',
//                 'cabinets.id AS resourceId', 'cabinets.name AS resourceId', 'schedulers.id AS event_id',
//                 DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
//                 DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
//                 DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
//                 DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
//                 DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
//                 DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
//                 DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
//                 DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
//                 DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to'),
//                 'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name', 'schedulers.priority'
//             )
//             ->leftJoin('clinic_filial_user', 'clinic_filial_user.id', '=', 'schedulers.doctor_id')
//             ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
//             ->leftJoin('core.users', 'users.id', '=', 'schedulers.patient_id')
//             ->leftJoin('patients', 'patients.user_id', '=', 'core.users.id')
//             ->leftJoin('patient_discount_statuses', 'patients.status_id', '=', 'patient_discount_statuses.id')
//             ->where('schedulers.clinic_id', $clinicData->id)
//             ->whereBetween('event_date', [$weekStart, $weekEnd])
//             ->get();

            $eventsData = DB::table('schedulers')
                ->select(
                // Основные данные события
                    'schedulers.id AS event_id',
                    'schedulers.title',
                    'schedulers.description',
                    'schedulers.priority',
                    'schedulers.services',
                    'schedulers.event_date',
                    'schedulers.event_time_from',
                    'schedulers.event_time_to',
                    'schedulers.status_color',
                    'schedulers.status_name AS event_status',

                    // Кабинет (ресурс)
                    'schedulers.cabinet_id',
                    'schedulers.cabinet_id AS resourceId',
                    'cabinets.name AS cabinet_name',

                    // Данные ПАЦИЕНТА (schedulers.patient_id -> patients.id -> core.users)
                    'schedulers.patient_id',
                    'patient_user.first_name AS p_name',
                    'patient_user.last_name AS pl_name',
                    'patients.birthday',
                    'patients.balance',
                    'patients.discount',
                    'patient_discount_statuses.name AS status_name',
                    'patient_discount_statuses.discount AS status_discount',

                    // Данные ВРАЧА (doctor_id — это глобальный user_id)
                    'schedulers.doctor_id',
                    'doctor_user.first_name AS first_name',
                    'doctor_user.last_name AS last_name',
                    'core_clinic_user.avatar',          // Аватар теперь из core.clinic_user связи доктора с клиникой
                    'clinic_filial_user.color',         // Цвет из свернутого подзапроса прав по филиалам

                    // Компоненты даты и времени для фронтенда
                    DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
                    DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
                    DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to'),
                    DB::raw("CONCAT(schedulers.cabinet_id, '_', schedulers.doctor_id) AS resourceId"),
                    DB::raw("CONCAT(cabinets.name, ' • ', doctor_user.first_name, ' ', doctor_user.last_name) AS resource_label")
                )
                // 1. Привязываем кабинет
                ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')

                // 2. СВЯЗЬ ПАЦИЕНТА
                ->leftJoin('patients', 'patients.id', '=', 'schedulers.patient_id')
                ->leftJoin('core.users AS patient_user', 'patient_user.id', '=', 'patients.user_id')
                ->leftJoin('patient_discount_statuses', 'patients.status_id', '=', 'patient_discount_statuses.id')

                // 3. СВЯЗЬ ВРАЧА
                ->leftJoin('core.users AS doctor_user', 'doctor_user.id', '=', 'schedulers.doctor_id')

                // Подтягиваем аватар из связи доктора с клиникой core.clinic_user (связь 1-к-1 в рамках клиники, дубликатов нет)
                ->leftJoin('core.clinic_user AS core_clinic_user', function($join) use ($clinicData) {
                    $join->on('core_clinic_user.user_id', '=', 'doctor_user.id')
                        ->where('core_clinic_user.clinic_id', '=', $clinicData->id);
                })

                // Подтягиваем только цвет, сворачивая права в филиалах через DISTINCT ON (PostgreSQL)
                // чтобы событие не дублировалось, если у врача есть права в 2+ филиалах
                ->leftJoin(DB::raw('(
        SELECT DISTINCT ON (user_id) user_id, color 
        FROM clinic_filial_user 
        WHERE clinic_id = ' . (int)$clinicData->id . '
    ) AS clinic_filial_user'), 'clinic_filial_user.user_id', '=', 'doctor_user.id')

                // Фильтры
                ->where('schedulers.clinic_id', $clinicData->id)
                ->whereBetween('event_date', [$weekStart, $weekEnd])
                ->get();

//            $eventsData1 = DB::table('schedulers')
//                ->select('schedulers.*',
//                    DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
//                    DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
//                    DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
//                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
//                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
//                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
//                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
//                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
//                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to')
//                )
//                ->whereBetween('event_date', [$weekStart, $weekEnd])
//                ->get();
//            dd($eventsData1);
            $formData = new Scheduler();

            return Inertia::render('Scheduler/Index', [
                'clinicData' => $clinicData,
                'customerData' => $customerSelectData,
                'assistantData' => $assistantSelectData,
                'customerGroupped' => $groupedOptions,
                'cabinetGroupped' => $groupedCabinets,
                'cabinetData' => $listCabinets,
                'formData' => $formData,
                'eventsData' => $eventsData,
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
            $category->producerName = $category->producer();
            $arrCat[] = $category;
            // if (count($category->children) > 0) {
            //     $this->generateCategories($category->children, $arrCat, ($level+1));
            // }
        }

        return $arrCat;
    }

    public function fetchPatients(Request $request) {
        $qData = $request->all();
        return $this->withClinicSchema($request, function($clinicId) use ($qData) {
            $patientsQueryResults = DB::table('patients')
                ->select('patients.id', 'core.users.first_name', 'core.users.last_name')
                ->leftJoin('core.users', 'core.users.id', '=', 'patients.user_id')
                ->where(function($query) use ($qData) {
                    $query->where('core.users.first_name', 'LIKE', '%' . $qData['strFind'] . '%')
                          ->orWhere('core.users.last_name', 'LIKE', '%' . $qData['strFind'] . '%');
                })
                ->get();
            return response()->json([
                'items' => $patientsQueryResults
            ]);
        });
    }

    public function updatePeriod(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
            $qData = $request->all();
//        $weekStart = $qData['newDate'];
            $decodedQueryData = (json_decode($qData['data']));
            $weekStart = $decodedQueryData->newDate;
            $date = new DateTime($weekStart);
            $weekEnd = $date->modify('next Sunday')->format('Y-m-d');
            $eventsData = DB::table('schedulers')
                ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from', 'cabinets.name AS cabinet_name',
                    'schedulers.event_time_to', 'users.color', 'schedulers.status_color', 'schedulers.status_name', 'schedulers.cabinet_id AS resourceId',
                    'schedulers.cabinet_id', 'schedulers.cabinet_id', 'users.first_name AS p_name', 'users.last_name AS pl_name', 'users.patronomic_name',
                    'schedulers.patient_id', 'schedulers.status_name AS event_status',
                    'users.first_name', 'users.last_name', 'schedulers.description', 'schedulers.services', 'users.birthday', 'users.dt_balance', 'users.id AS doctor_id',
                    'users.kt_balance', 'patient_discount_statuses.name AS status_name', 'patient_discount_statuses.discount AS status_discount', 'schedulers.id AS event_id',
                    'patient_discount_statuses.discount', 'patient_discount_statuses.name AS patient_status_name',
                    DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
                    DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
                    DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
                    DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
                    DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
                    DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to'),
                    'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name', 'schedulers.priority'
                )
                ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
                ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
                ->leftJoin('patients', 'patients.id', '=', 'schedulers.patient_id')
                ->leftJoin('patient_discount_statuses', 'patients.status_id', '=', 'patient_discount_statuses.id')
                ->where('schedulers.clinic_id', $clinicData->id)
                ->whereBetween('event_date', [$weekStart, $weekEnd])
                ->get();
            return response()->json([
                'items' => $eventsData
            ]);
        });

    }


    public function fetchEvents(Request $request) {
        $qData = $request->all();
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $eventsData = DB::table('schedulers')
            ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from',
                'schedulers.event_time_to', 'users.color', 'schedulers.status_color', 'schedulers.status_name',
                'schedulers.cabinet_id', 'schedulers.cabinet_id',
                'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name',
                'patients.first_name', 'patients.last_name'
            )
            ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
            ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
            ->leftJoin('patients', 'patients.id', '=', 'schedulers.patient_id')
            ->where('schedulers.clinic_id', $clinicData->id)
            ->whereBetween('event_date', [$qData['start'], $qData['end']])
            ->get();

        $events = array();
        foreach ($eventsData as $event) {
            $event->startDate = date($event->event_date.' '.$event->event_time_from);
            $event->endDate = date($event->event_date.' '.$event->event_time_to);
            $events[] = (object) $event;
        }
        return response()->json([
            'items' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = new User();
            $rolesData = Role::all();
            return Inertia::render('Customer/CustomerCreate', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'roleData' => $rolesData
            ]);
        });
//        $formData = new User();
//        $rolesData = Role::all();
//        return Inertia::render('Customer/CustomerCreate', [
//            'clinicData' => $clinicData,
//            'formData' => $formData,
//            'roleData' => $rolesData
//        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        if ($request->user()->can('customer-view')) {
            $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));

            $serverFilePath = public_path('storage/clinic/users/customer-' .$id. '.png');
            $imagePath = '';
            if (file_exists($serverFilePath)) {
                $imagePath = asset('storage/clinic/users/customer-' .$id. '.png');
            }
            $formData = User::where('id', $id)->get();
            $assignedData = DB::table('clinic_filial_user')
                ->select('roles.name AS roleName', 'roles.special', 'clinic_filials.name AS filialName', 'roles.clinic_id AS clinicId')
                ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'clinic_filial_user.filial_id')
                ->where('clinic_filial_user.user_id', $id)
                ->where('clinic_filial_user.clinic_id', $clinic->id)
                ->get();
            return Inertia::render('Customer/CustomerShow', [
                'formData' => $formData[0],
                'rolesData' => $assignedData,
                'imagePath' => $imagePath
            ]);
        } else {
            return Inertia::render('Clinic/FilialView', [
            ]);
        }
    }

    public function findByEmail(Request $request) {
        $email = $request->searchEmail;
        $usersData = DB::table('users')->select('name', 'email', 'id')
            ->where('email', 'like', $email.'%')
            ->get();
        return response()->json([
            'name' => 'Abigail',
            'state' => 'CA',
            'items' => $usersData
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        $serverFilePath = public_path('storage/clinic/users/customer-' .$id. '.png');
        $imagePath = '';
        if (file_exists($serverFilePath)) {
            $imagePath = asset('storage/clinic/users/customer-' .$id. '.png');
        }
        if ($request->user()->can('customer-edit')) {
            $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));;
            $formData = User::where('id', $id)->get();
            $rolesData = Role::all();
            return Inertia::render('Customer/CustomerEdit', [
                'clinicData' => $clinicData,
                'formData' => $formData[0],
                'roleData' => $rolesData,
                'imagePath' => $imagePath
            ]);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(SchedulerUpdateRequest $request) {

        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            if (!$request->user()->canClinic('scheduler-edit')) {
                return Inertia::render('Scheduler/List', ['error' => 'Insufficient permissions']);
            }
            if ($request->id) {
                $scheduler = Scheduler::find($request->id);
                $scheduler->title = $request->title;
                $scheduler->event_date = $request->fotmatted_date;
                $scheduler->event_time_from = $request->event_time_from;
                $scheduler->event_time_to = $request->event_time_to;
                $scheduler->clinic_id = $clinic->id;
                $scheduler->cabinet_id = $request->cabinet_id;
                $scheduler->doctor_id = $request->doctor_id;
                $scheduler->patient_id = $request->patientId;
                $scheduler->description = $request->comment ?  $request->comment : '';
                $scheduler->status_name = $request->status["name"];
                $scheduler->status_color = $request->status["color"];
                $scheduler->services = json_encode($request->services);
                $scheduler->save();
                return Inertia::location(route('scheduler.index'));
            }
            else {
                if ($request->newPatientData) {
                    // create patient
                    $patient = new Patient();
                    $patient->first_name = $request->newPatientData['firstName'];
                    $patient->last_name = $request->newPatientData['lastName'];
                    $patient->phone = $request->newPatientData['phone'];
                    $patient->email = $request->newPatientData['email'] ? $request->newPatientData['email'] : $request->newPatientData['phone'];
                    $patient->password = Hash::make($request->newPatientData['phone']);
                    $patient->save();

                    $patientId = $patient->id;
                } else {
                    $patientId = $request->patientId;
                }
                $scheduler = new Scheduler();
                $scheduler->title = $request->title;
                $scheduler->event_date = $request->event_date;
                $scheduler->event_time_from = $request->event_time_from;
                $scheduler->event_time_to = $request->event_time_to;
                $scheduler->clinic_id = $clinic->id;
                $scheduler->cabinet_id = $request->cabinet_id;
                $scheduler->doctor_id = $request->doctor_id;
                $scheduler->patient_id = $patientId;
                $scheduler->description = $request->comment ?  $request->comment : '';
                $scheduler->status_name = $request->status_id["name"];
                $scheduler->status_color = $request->status_id["color"];
                $scheduler->services = json_encode($request->services);
                $scheduler->save();

                return Inertia::location(route('scheduler.index'));
            }
        });



    }

    public function updateEvent(Request $request) {
        $event = Scheduler::where('id', $request->event_id)->get();
        $event[0]->event_date = $request->date;
        $event[0]->event_time_from = $request->start;
        $event[0]->event_time_to = $request->end;
        $event[0]->cabinet_id = $request->resource_id;
        $event[0]->save();

        return response()->json(['success' => true]);
    }

    public function assign(Request $request, $id) {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));

        $customer = User::where('id', $id)->get();
        $rolesData = Role::where('clinic_id', null)->orWhere('clinic_id', $clinic->id)
            ->orderBy('name')->get();
        $filialData = ClinicFilial::where('clinic_id', $clinic->id)->get();
        $assignedData = DB::table('clinic_filial_user')->select()
            ->where('user_id', $id)
            ->where('clinic_id', $clinic->id)
            ->get();

        if (count($assignedData) > 0) {
            return Inertia::render('Customer/AssignFilialEdit', [
                'rolesData' => $rolesData,
                'clinicData' => $clinic,
                'filialData' => $filialData,
                'customer' => $customer[0],
                'assignedData' => $assignedData
            ]);
        } else {
            return Inertia::render('Customer/AssignFilial', [
                'rolesData' => $rolesData,
                'clinicData' => $clinic,
                'filialData' => $filialData,
                'customer' => $customer[0],
            ]);
        }
    }

    public function assignSubmit(Request $request) {
        DB::table('clinic_filial_user')
            ->where('user_id', $request->customerId)
            ->where('clinic_id', $request->clinicId)
            ->delete();

        foreach ($request->values as $values) {
            foreach ($values as $value) {
                if (intval($value['role_id']) > 0) {
                    DB::table('clinic_filial_user')->insert(
                        [
                            'user_id' => $request->customerId,
                            'filial_id' => $value['filial_id'],
                            'role_id' => $value['role_id'],
                            'clinic_id' => $request->clinicId
                        ]
                    );
                }
            }
        }

        return Inertia::location(route('customer.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicFilial $filial) {
        //
    }
}
