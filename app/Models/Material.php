<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'name',
        'clinic_id',
        'category_id',
        'unit_id',
        'weight',
        'weightunit_id',
        'retail_price',
        'producer_id',
        'price',
        'price_per_unit'
    ];
}
