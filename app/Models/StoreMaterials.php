<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreMaterials extends Model
{
    protected $fillable = [
        'store_id',
        'material_id',
        'quantity',
    ];
}
