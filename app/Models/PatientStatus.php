<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientStatus extends Model
{
    //
    protected $fillable = [
        'name',
        'discount',
        'clinic_id',
    ];

}
