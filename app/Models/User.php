<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'first_name',
        'last_name'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // 🔹 Добавляем атрибуты для сериализации
    protected $appends = ['clinic_id', 'filial_id', 'current_clinic'];

    // 🔹 Возвращаем clinic_id из сессии
    public function getClinicIdAttribute()
    {
        return session('clinic_id');
    }

    // 🔹 Возвращаем filial_id из сессии
    public function getFilialIdAttribute()
    {
        return session('filial_id');
    }

    public function clinic(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Clinic::class);
    }

    public function getCurrentClinicAttribute()
    {
        $clinicId = session('clinic_id');

        if (!$clinicId) {
            return null;
        }

        // всегда дергаем клинику из core
        $original = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO core");
            return Clinic::find($clinicId);
        } finally {
            DB::statement("SET search_path TO {$original}");
        }
    }

    public function currentClinic()
    {
        $clinicId = session('clinic_id');

        if (!$clinicId) {
            return null;
        }

        // Клиники всегда лежат в схеме core — так что просто ищем там
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO core");
            return Clinic::find($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    public function clinicByFilial($clinicId)
    {
        if (!$clinicId) {
            return $this->clinic ?? null;
        } else {
            // Save current search_path
            $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Switch to core schema to find the clinic
                DB::statement("SET search_path TO core");
                $clinic = Clinic::find($clinicId);
                return $clinic;
            } finally {
                // Restore original search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
            }
        }
    }

    public function canClinic(string $permission): bool
    {
        if ($this->permissions instanceof \Illuminate\Support\Collection) {
            // Берём только имена прав
            $permissionsArray = $this->permissions->pluck('name')->toArray();
        } else {
            $permissionsArray = $this->permissions;
        }

        return in_array($permission, $permissionsArray, true);
    }
}
