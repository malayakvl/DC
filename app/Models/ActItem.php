<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActItem extends Model
{
    protected $fillable = [
        'act_id',
        'service_id',
        'qty',
        'price',
        'total',
        'components'
    ];

    protected $casts = [
        'components' => 'array',
    ];
}
