<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Displacement extends Model
{
    protected $fillable = [
        'number',
        'status',
        'clinic_id',
        'storefrom_id',
        'storeto_id',
        'customer_id',
    ];

}
