<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{
    protected $fillable = [
        'title',
        'clinic_id',
        'doctor_id',
        'cabinet_id',
        'event_date',
        'event_time_from',
        'event_time_to',
    ];
}
