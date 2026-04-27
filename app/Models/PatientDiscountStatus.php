<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientDiscountStatus extends Model
{
    //
    protected $fillable = [
        'name',
        'discount',
        'services_ids',
    ];

}
