<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Act extends Model
{
    protected $fillable = [
        'act_number',
        'act_date',
        'status',
        'clinic_id',
        'patient_id',
        'doctor_id',
        'total_amount'
    ];

}
