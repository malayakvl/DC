<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\ClinicUser;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Rap2hpoutre\FastExcel\FastExcel;
use File;
use Carbon\Carbon;
class ImportController extends Controller
{
    //
    function __construct()
    {
    }


    public function index(Request $request) {
        if ($request->user()->can('import')) {
            return Inertia::render('Import/Index', [
            ]);
        } else {
            return Inertia::render('Layout/NoPermission', []);
        }
    }

    public function update(Request $request) {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        if ($request->user()->can('import')) {
            if ($request->file) {
                $extension = $request->file->extension();
                $fileName = 'Clinic'.$clinicData->id.'.'.$request->file->extension();
                $request->file->move(public_path('clinic-import/patients'), $fileName);
            }
            if ($extension === 'xlsx') {
                $collection = (new FastExcel)->import(public_path('clinic-import/patients/'.$fileName));
//                dd($collection);exit;
                $collection->map(function ($item, int $key) {
                    $patient = new Patient();
                    $patient->first_name = $item['Пацієнт'];
                    if ($item['Дата народження']){
                        $dateB = Carbon::createFromFormat('d.m.Y', $item['Дата народження'])->format('Y-m-d');
                        $patient->birthday = $dateB;
                    }
                    if ($item['Дата реєстрації']){
                        $dateB = Carbon::createFromFormat('d.m.Y', $item['Дата реєстрації'])->format('Y-m-d');
                        $patient->register_date = $dateB;
                    }
                    if ($item['Стать'] === 'Чоловік') {
                        $patient->gender = 'male';
                    } else if ($item['Стать'] === 'Жінка') {
                        $patient->gender = 'female';
                    }
                    $patient->phone = $item['Телефон'];
                    $user = User::where('name', '=', $item['Куратор'])->get();
                    if (count($user)) {
                        $patient->curator_id = $user[0]->id;
//                        dd($user[0]->id);exit;
                    }
                    if ($item['Виконано на суму'] === $item['Оплачено']) {

                    }
//
//                    if ($key === 50){
//                        dd($item);exit;
//                    }


                });
            }
            if ($extension === 'json') {
                $contents = File::get((public_path('clinic-import/patients/'.$fileName)));
                $jsonData = json_decode(json: $contents, associative: true);
                foreach ($jsonData as $doctor) {
//                    dd($doctor['role'].$doctor['lastname']);exit;
                    $user = new User();
                    $user->name = $doctor['lastname'].' '.$doctor['firstname'];
                    $user->email = $doctor['phone'];
                    $user->password = Hash::make($doctor['phone']);
                    $user->first_name = $doctor['firstname'];
                    $user->last_name = $doctor['lastname'];
                    $user->phone = $doctor['phone'];
                    $user->save();

                    $clinicUser = new ClinicUser();
                    $clinicUser->clinic_id = $clinicData->id;
                    $clinicUser->user_id = $user->id;
                    if ($doctor['role'] === 'MANAGER') {
                        $clinicUser->role_id = 9;
                    } else if ($doctor['role'] === 'DOCTOR') {
                        $clinicUser->role_id = 15;
                    } else if ($doctor['role'] === 'ADMINISTRATOR') {
                        $clinicUser->role_id = 10;
                    }
                    $clinicUser->save();

                    DB::table('clinic_filial_user')->insert(
                        [
                            'user_id' => $user->id,
                            'filial_id' => 1,
                            'role_id' => $clinicUser->role_id,
                            'clinic_id' => $clinicData->id
                        ]
                    );
                }

            }
            dd ('Done');
            exit;
        }
    }
}
