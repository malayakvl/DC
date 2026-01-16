<?php

namespace App\Services;

use App\Models\User;
use App\Models\ClinicUser;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ClinicFilialUser;

class UploadService
{
    public function uploadPhoto(UploadedFile $file, int $clinicId, $type, $id): string
    {
        $fileName = "{$type}-{$clinicId}.".$file->extension();

        Storage::disk('public')->put(
            "{$type}/{$id}/{$fileName}",
            $file->getContent()
        );

        return $fileName;
    }

    public function deletePhoto(int $clinicId, $type): void
    {
        Storage::disk('public')->delete("{$type}/{$clinicId}");
    }
}
