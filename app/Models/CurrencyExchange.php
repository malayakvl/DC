<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class CurrencyExchange extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'clinic_id',
        'currency_id',
        'rate_date',
        'rate_value',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

//    protected $with = ['clinic_id'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function clinic(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Clinic::class);
    }

    public function clinicByFilial($clinicId)
    {
        if (!$clinicId) {
            // Save current search_path
            $originalSearchPath = \Illuminate\Support\Facades\DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Switch to core schema to find the clinic
                \Illuminate\Support\Facades\DB::statement("SET search_path TO core");
                $clinic = Clinic::where('id', $this->clinic->id)->get();
                return $clinic[0];
            } finally {
                // Restore original search_path
                \Illuminate\Support\Facades\DB::statement("SET search_path TO {$originalSearchPath}");
            }
        } else {
            // Save current search_path
            $originalSearchPath = \Illuminate\Support\Facades\DB::select("SHOW search_path")[0]->search_path;
            
            try {
                // Switch to core schema to find the clinic
                \Illuminate\Support\Facades\DB::statement("SET search_path TO core");
                $clinic = Clinic::where('id', $clinicId)->get();
                return $clinic[0];
            } finally {
                // Restore original search_path
                \Illuminate\Support\Facades\DB::statement("SET search_path TO {$originalSearchPath}");
            }
        }
    }
}
