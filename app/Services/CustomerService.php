<?php

namespace App\Services;

use App\Models\User;
use App\Models\ClinicUser;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ClinicFilialUser;

class CustomerService
{
    public function createOrUpdateUser(array $data, ?int $userId = null): User
    {
        if ($userId) {
            $user = User::findOrFail($userId);
            $user->update($data);
        } else {
            $user = User::create(array_merge($data, [
                'password' => Hash::make(Str::random(12)),
                'remember_token' => Str::random(60),
            ]));
        }

        return $user;
    }

    public function updateAvatar(User $user, UploadedFile $file, int $clinicId): void
    {
        $fileName = "user-{$user->id}-{$clinicId}.".$file->extension();

        Storage::disk('public')->put(
            "users/{$fileName}",
            $file->getContent()
        );

        ClinicUser::where([
            'user_id' => $user->id,
            'clinic_id' => $clinicId,
        ])->update([
            'avatar' => $fileName
        ]);
    }

    public function updateFilialData(
        int $userId,
        int $clinicId,
        int $filialId,
        array $data
    ): void {
        $table = \Illuminate\Support\Facades\DB::table("clinic_{$clinicId}.clinic_filial_user");
        
        $exists = clone $table;
        $recordExists = $exists->where([
            'user_id' => $userId,
            'clinic_id' => $clinicId,
            'filial_id' => $filialId,
        ])->exists();

        if ($recordExists) {
            $table->where([
                'user_id' => $userId,
                'clinic_id' => $clinicId,
                'filial_id' => $filialId,
            ])->update($data);
        } else {
            $roleId = \Illuminate\Support\Facades\DB::table("clinic_{$clinicId}.roles")
                        ->where('name', 'patient')
                        ->value('id') ?? 6;

            $table->insert(array_merge([
                'user_id' => $userId,
                'clinic_id' => $clinicId,
                'filial_id' => $filialId,
                'role_id' => $roleId,
            ], $data));
        }
    }

    public function getEmploeeClinicFilialData($clinicId, $filialId) {
        $customerData = DB::table('core.clinic_user as cu')
            ->join('core.users as u', 'cu.user_id', '=', 'u.id')
            ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
            ->leftJoin("clinic_{$clinicId}.clinic_filial_user as pfu", function ($join) use ($filialId) {
                $join->on('pfu.user_id', '=', 'u.id')
                    ->where('pfu.filial_id', $filialId);
            })
            ->leftJoin("clinic_{$clinicId}.roles as r", 'r.id', '=', 'pfu.role_id')
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
                'pfu.avatar',
                'r.name as role_name'
            )
            ->orderBy('u.last_name')
            ->get();

        return $customerData;
    }

    public function clinicStoresData($clinicId): \Illuminate\Support\Collection
    {
        $storeData = DB::table('stores')
            ->select('stores.*', 'users.first_name', 'users.last_name', 'clinic_filials.name AS filialName')
            ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
            ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
            ->where('stores.clinic_id', $clinicId)
            ->orderBy('name')->get();

        return $storeData;
    }


}
