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
        'size_id',
        'producer_id',
        'price',
        'retail_price'
    ];
}
