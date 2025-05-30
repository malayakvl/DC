<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicUser extends Model
{
    protected $fillable = [
        'clinic_id',
        'user_id',
        'role_id'
    ];
    protected $table = 'clinic_user';

    public function clinic(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Clinic::class);
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class);
    }
}
