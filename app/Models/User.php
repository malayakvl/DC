<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
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
    protected $appends = ['clinic_id', 'filial_id'];

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

    public function clinicByFilial($clinicId)
    {
        if (!$clinicId) {
            return $this->clinic ?? null;
        } else {
            // Save current search_path
            $originalSearchPath = \Illuminate\Support\Facades\DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Switch to core schema to find the clinic
                \Illuminate\Support\Facades\DB::statement("SET search_path TO core");
                $clinic = Clinic::find($clinicId);
                return $clinic;
            } finally {
                // Restore original search_path
                \Illuminate\Support\Facades\DB::statement("SET search_path TO {$originalSearchPath}");
            }
        }
    }
}
