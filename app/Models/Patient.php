<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Patient extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'medical_card_no',
        'patient_status_id',
        'curator_user_id',
        'registered_at',
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

    public function discountStatus(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(PatientStatus::class,'id','status_id');
    }

    public static function createInCore($attributes, $additionalData = [])
    {
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            DB::statement("SET search_path TO core");
            $patient = static::create(array_merge($attributes, $additionalData));
            return $patient;
        } catch (\Exception $e) {
            Log::error('Error creating patient in core schema: ' . $e->getMessage(), [
                'attributes' => $attributes,
                'additional_data' => $additionalData,
                'error' => $e->getMessage()
            ]);
            throw $e;
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
}
