<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Customer;
use App\Models\Filial;
use App\Models\User;
use App\Models\ClinicUser;
use App\Notifications\CustomerInviteNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $filialData = ClinicFilial::where('clinic_id', '=', $clinic->id)->get();
        $customerData = DB::table('users')
            ->select('users.*')
            ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
            ->where('clinic_id', $clinic->id)->orderBy('name')->get();
        return Inertia::render('Customer/List', [
            'clinicData' => $clinic,
            'filialData' => $filialData,
            'customerData' => $customerData
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
//            $clinicData = $request->user()->clinic;
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
    public function update(CustomerUpdateRequest $request) {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->user()->can('customer-create')) {
            $photo = '';
            if ($request->id) {
                $userId = $request->id;

//                if ($request->file) {
//                    $ext = $request->file->getClientOriginalExtension();
//                    $photo = 'customer-' .$userId. '.'.$ext;
//                    Storage::disk('public')->put('clinic/users/customer-' .$userId. '.'.$ext, file_get_contents($request->file));
//                }

                $user = User::find($request->id);
                $user->email = $request->email;
                $user->name = $request->name;
                $user->phone = $request->phone;
                $user->inn = $request->inn;
                $user->color = $request->color;
                $user->save();
                if ($request->file) {
                    $fileName = 'Patient'.$request->id.'.'.$request->file->extension();
                    $user->file = $fileName;
//                    $patient->avatar = $fileName;
                    $user->save();
                    $request->file->move(public_path('uploads/users'), $fileName);
                }
                return Inertia::location(route('customer.index'));
            }
            else {
                $user = new User();
                $user->email = $request->email;
                $user->name = $request->name;
                $user->password = Hash::make('password_invite');
                $user->inn = $request->inn;
                $user->phone = $request->phone;
                $user->remember_token = Str::random(60);
                $user->save();

                $userId = $user->id;
                if ($request->file) {
                    $ext = $request->file->getClientOriginalExtension();
                    $photo = 'customer-' .$userId. '.'.$ext;
                    $user->photo = $photo;
                    $user->save();
                    Storage::disk('public')->put('clinic/users/customer-' .$userId. '.'.$ext, file_get_contents($request->file));
                }
                $clinicUser = new ClinicUser();
                $clinicUser->user_id = $userId;
                $clinicUser->clinic_id = $request->clinic_id;
                $clinicUser->clinic_token = Str::random(60);
                $clinicUser->save();

                // send invitation email
                $invitationLink = route('clinic.accept', ['access_token' => $clinicUser->clinic_token]);
                $user->notify(new CustomerInviteNotification($user, $invitationLink, $clinic->name, 'password_invite'));

                return Inertia::location(route('customer.assign', ['id' => $userId]));
            }
        }
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
    public function destroy(Filial $filial) {
        //
    }
}
