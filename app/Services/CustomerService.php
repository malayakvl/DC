<?php

namespace App\Services;

use App\Models\User;
use App\Models\ClinicUser;
use Illuminate\Http\UploadedFile;
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
        ClinicFilialUser::where([
            'user_id' => $userId,
            'clinic_id' => $clinicId,
            'filial_id' => $filialId,
        ])->update($data);
    }
}
