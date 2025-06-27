<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchedulerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
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

class SchedulerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $filialId = $request->session()->get('filial_id');
        $customerSelectData = DB::select('
            SELECT users.id, users.file, users.color, (users.first_name || \' \' || users.last_name) AS name,
                   roles.name AS role_name
            FROM users
            LEFT JOIN clinic_user ON clinic_user.user_id = users.id
            LEFT JOIN roles ON roles.id = clinic_user.role_id
            WHERE clinic_user.clinic_id = ?
            ORDER BY name
        ', [$clinicData->id]);

        $customerData = DB::table('users')
            ->select([
                'users.id',
                'users.file',
                'users.color',
                'users.first_name',
                'users.last_name',
                'roles.name AS role_name'
            ])
            ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
            ->leftJoin('roles', 'roles.id', '=', 'clinic_user.role_id')
            ->where('clinic_user.clinic_id', $clinicData->id)
            ->orderBy('last_name')
            ->get();

        $categories = PriceCategory::where('parent_id', null)
            ->where('clinic_id', $clinicData->id)
            ->get();
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
//        foreach ($customerData as $customer) {
//            if ($customer->file) {
//                $customer->avatar = 'http://localhost:8000/storage/clinic/users/'.$customer->file;
//            }
//        }
        if ($request->session()->get('filial_id')) {
            $listCabinets = DB::table('cabinets')
                ->select('cabinets.*', "clinic_filials.name AS filial_name", 'cabinets.id AS resourceId', 'cabinets.name AS resourceTitle')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                ->where('cabinets.clinic_id', $clinicData->id)
                ->where('cabinets.filial_id', $request->session()->get('filial_id'))
                ->orderBy('name')->get();
        } else {
            $listCabinets = DB::table('cabinets')
                ->select('cabinets.*', "clinic_filials.name AS filial_name")
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
        $weekStart = date("Y-m-d", strtotime('monday this week'));
        $weekEnd = date("Y-m-d", strtotime('sunday this week'));
        $eventsData = DB::table('schedulers')
            ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from', 'cabinets.name AS cabinet_name',
                'schedulers.event_time_to', 'users.color', 'schedulers.status_color', 'schedulers.status_name', 'schedulers.cabinet_id AS resourceId',
                'schedulers.cabinet_id', 'schedulers.cabinet_id', 'patients.first_name AS p_name', 'patients.last_name AS pl_name',
                'users.first_name', 'users.last_name', 'schedulers.description', 'schedulers.services', 'patients.birthday', 'patients.dt_balance',
                'patients.kt_balance', 'patient_statuses.name AS status_name', 'patient_statuses.discount AS status_discount', 'schedulers.id AS event_id',
                DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
                DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
                DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
                DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
                DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
                DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
                DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
                DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
                DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to'),
                'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name'
            )
            ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
            ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
            ->leftJoin('patients', 'patients.id', '=', 'schedulers.patient_id')
            ->leftJoin('patient_statuses', 'patients.status_id', '=', 'patient_statuses.id')
            ->where('schedulers.clinic_id', $clinicData->id)
            ->whereBetween('event_date', [$weekStart, $weekEnd])
            ->get();
//dd($eventsData);exit;
//        $eventsData = DB::table('schedulers')
//            ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from',
//                'schedulers.event_time_to', 'users.color', 'schedulers.status_color', 'schedulers.status_name',
//                'schedulers.cabinet_id', 'schedulers.cabinet_id',
//                'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name'
//            )
//            ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
//            ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
//            ->where('schedulers.clinic_id', $clinicData->id)
//            ->whereBetween('event_date', [$weekStart, $weekEnd])
//            ->get();
//        $events = array();
//        foreach ($eventsData as $event) {
//            $event->startDate = date($event->event_date.' '.$event->event_time_from);
//            $event->endDate = date($event->event_date.' '.$event->event_time_to);
//            $event->cabinet = $event->cabinet_name;
//            $events[] = (object) $event;
//        }
        $formData = new Scheduler();
        return Inertia::render('Scheduler/Index', [
            'clinicData' => $clinicData,
            'customerData' => $customerSelectData,
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

    public function fetchPatients(Request $request) {
        $qData = $request->all();
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $patientsQueryResults = DB::select('
            SELECT patients.id, patients.first_name, patients.last_name 
            FROM patients
            LEFT JOIN clinic_patient ON clinic_patient.patient_id = patients.id
            WHERE clinic_patient.clinic_id = ? 
            AND (patients.first_name LIKE ? OR patients.last_name LIKE ?)
        ', [$clinicData->id, '%' .$qData['strFind']. '%', '%' .$qData['strFind']. '%']);

        return response()->json([
            'items' => $patientsQueryResults
        ]);
    }

    public function updatePeriod(Request $request) {
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $qData = $request->all();
//        $weekStart = $qData['newDate'];
        $decodedQueryData = (json_decode($qData['data']));
        $weekStart = $decodedQueryData->newDate;
        $date = new DateTime($weekStart);
        $weekEnd = $date->modify('next Sunday')->format('Y-m-d');
        $eventsData = DB::table('schedulers')
            ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from', 'schedulers.cabinet_id AS resourceId',
                'schedulers.event_time_to', 'users.color', 'schedulers.status_color', 'schedulers.status_name',
                'schedulers.cabinet_id', 'schedulers.cabinet_id', 'patients.first_name AS p_name', 'patients.last_name AS pl_name',
                'users.first_name', 'users.last_name', 'schedulers.description', 'schedulers.services',
                DB::raw('EXTRACT(YEAR FROM schedulers.event_date) AS year'),
                DB::raw('EXTRACT(MONTH FROM schedulers.event_date) AS month'),
                DB::raw('EXTRACT(DAY FROM schedulers.event_date) AS day'),
                DB::raw('EXTRACT(HOUR FROM schedulers.event_time_from) AS hour_from'),
                DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_from) AS minute_from'),
                DB::raw('EXTRACT(SECOND FROM schedulers.event_time_from) AS second_from'),
                DB::raw('EXTRACT(HOUR FROM schedulers.event_time_to) AS hour_to'),
                DB::raw('EXTRACT(MINUTE FROM schedulers.event_time_to) AS minute_to'),
                DB::raw('EXTRACT(SECOND FROM schedulers.event_time_to) AS second_to'),
                'schedulers.doctor_id AS id', 'cabinets.name AS cabinet_name'
            )
            ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
            ->leftJoin('cabinets', 'cabinets.id', '=', 'schedulers.cabinet_id')
            ->leftJoin('patients', 'patients.id', '=', 'schedulers.patient_id')
            ->where('schedulers.clinic_id', $clinicData->id)
            ->whereBetween('event_date', [$weekStart, $weekEnd])
            ->get();
        return response()->json([
            'items' => $eventsData
        ]);
    }


    public function fetchEvents(Request $request) {
        $qData = $request->all();
        $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
//        $eventsData = Scheduler::where('clinic_id', '=', $clinicData->id)->get();
//        $eventsData = DB::table('schedulers')
//            ->select('schedulers.title', 'schedulers.event_date', 'schedulers.event_time_from',
//                'schedulers.event_time_to',
//                'schedulers.cabinet_id', 'schedulers.cabinet_id',
//                'schedulers.doctor_id AS id'
//            )
//            ->leftJoin('users', 'users.id', '=', 'schedulers.doctor_id')
//            ->whereBetween('event_date', [$qData['start'], $qData['end']])
//            ->get();
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
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $formData = new User();
        $rolesData = Role::all();
        return Inertia::render('Customer/CustomerCreate', [
            'clinicData' => $clinicData,
            'formData' => $formData,
            'roleData' => $rolesData
        ]);
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
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->user()->can('schedule-create')) {
            if ($request->id) {
//                $userId = $request->id;
//                if ($request->file) {
//                    $ext = $request->file->getClientOriginalExtension();
//                    $photo = 'customer-' .$userId. '.'.$ext;
//                    Storage::disk('public')->put('clinic/users/customer-' .$userId. '.'.$ext, file_get_contents($request->file));
//                }
//
//                $user = User::find($request->id);
//                $user->email = $request->email;
//                $user->name = $request->name;
//                $user->phone = $request->phone;
//                $user->inn = $request->inn;
//                if ($photo) {
//                    $user->photo = $photo;
//                }
//                $user->save();

                return Inertia::location(route('customer.index'));
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
                $scheduler->event_time_from = $request->event_time_to;
                $scheduler->event_time_to = $request->event_time_to;
                $scheduler->clinic_id = $clinic->id;
                $scheduler->cabinet_id = $request->cabinet_id;
                $scheduler->doctor_id = $request->doctor_id;
                $scheduler->patient_id = $patientId;
                $scheduler->description = $request->comment;
                $scheduler->status_name = $request->status_id["name"];
                $scheduler->status_color = $request->status_id["color"];
                $scheduler->services = json_encode($request->services);
                $scheduler->save();

//                $userId = $user->id;
//                if ($request->file) {
//                    $ext = $request->file->getClientOriginalExtension();
//                    $photo = 'customer-' .$userId. '.'.$ext;
//                    $user->photo = $photo;
//                    $user->save();
//                    Storage::disk('public')->put('clinic/users/customer-' .$userId. '.'.$ext, file_get_contents($request->file));
//                }
//                $clinicUser = new ClinicUser();
//                $clinicUser->user_id = $userId;
//                $clinicUser->clinic_id = $request->clinic_id;
//                $clinicUser->clinic_token = Str::random(60);
//                $clinicUser->save();


                return Inertia::location(route('scheduler.index'));
            }
        }
    }

    public function assign(Request $request, $id) {
//        $clinic = $request->user()->clinic;
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
    public function destroy(Filial $filial) {
        //
    }
}
