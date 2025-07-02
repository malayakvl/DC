<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActDocument extends Model
{
    //
    protected $fillable = [
        'doc_date',
        'clinic_id',
        'doctor_id',
        'patient_id',
        'schedule_id',
        'services',
        'currency_id',
        'discount',
        'total',
        'total_with_discount'
    ];
}
