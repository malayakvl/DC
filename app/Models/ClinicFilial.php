<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ClinicFilial extends Model
{
    protected $fillable = [
        'name',
        'address',
        'uraddress',
        'inn',
        'edrpou',
        'phone',
        'user_id',
        'store_id'
    ];


    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function clinic(): HasOne
    {
        return $this->hasOne(Clinic::class,'id','clinic_id');
    }

    public function getClinic()
    {
        return $this->clinic;
    }

}
