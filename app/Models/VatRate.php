<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VatRate extends Model
{
    //
    protected $fillable = [
        'country',
        'standard_rate',
        'currency',
    ];
}
