<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'number',
        'status',
        'clinic_id',
        'store_id',
        'customer_id',
        'supplier_id',
        'currency_id',
        'tax_id',
        'type_id',
        'total_amount'
    ];

}
