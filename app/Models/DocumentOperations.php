<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentOperations extends Model
{
    protected $fillable = [
        'operation_date',
        'operation_number',
        'document_id',
        'document_type',
        'operation_dt',
        'subconto_dt',
        'operation_kt',
        'subconto_kt',
        'quantity',
        'amount',
        'comment'
    ];
}
