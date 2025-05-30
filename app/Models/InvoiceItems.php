<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItems extends Model
{
    protected $fillable = [
        'invoice_id',
        'product_id',
        'material_id',
        'quantity',
        'price',
    ];
}
